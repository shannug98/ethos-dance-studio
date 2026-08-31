using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using DanceStudio.API.Models;
using Microsoft.Extensions.Options;

namespace DanceStudio.API.Services
{
    public class WhatsAppService : IWhatsAppService
    {
        private readonly HttpClient _httpClient;
        private readonly WhatsAppSettings _settings;

        public WhatsAppService(HttpClient httpClient, IOptions<WhatsAppSettings> settings)
        {
            _httpClient = httpClient;
            _settings = settings.Value;
        }

        public async Task<bool> SendMessageAsync(string recipientPhone, string message)
        {
            var res = await SendWhatsAppPayloadAsync(FormatPhoneNumber(recipientPhone), message, useTemplateFallback: true);
            return res.Success;
        }

        public async Task<(bool Success, string Message)> SendOtpAsync(string recipientPhone, string otpCode)
        {
            var formattedPhone = FormatPhoneNumber(recipientPhone);
            var messageBody = $"🔐 ETHOS DANCE STUDIO\n\nYour login/verification OTP code is: *{otpCode}*\n\nValid for 10 minutes. Please do not share this code with anyone.";

            return await SendWhatsAppPayloadAsync(formattedPhone, messageBody, useTemplateFallback: true);
        }

        public async Task<(bool Success, string Message)> SendPassConfirmationAsync(string recipientPhone, string customerName, string passId, string packageTitle)
        {
            var formattedPhone = FormatPhoneNumber(recipientPhone);
            var messageBody = $"🎉 ETHOS DANCE STUDIO — PASS CONFIRMATION\n\nHi *{customerName}*,\nYour booking for *{packageTitle}* is confirmed!\n\n🆔 Pass Reference ID: *{passId}*\n\nOfficial PDF entry pass with entrance gate scanner QR code has been dispatched to your email. See you at the studio! 💃🕺";

            return await SendWhatsAppPayloadAsync(formattedPhone, messageBody, useTemplateFallback: true);
        }

        private async Task<(bool Success, string Message)> SendWhatsAppPayloadAsync(string formattedPhone, string textBody, bool useTemplateFallback)
        {
            var token = _settings.AccessToken;
            var phoneId = _settings.PhoneNumberId;
            var apiVer = string.IsNullOrWhiteSpace(_settings.ApiVersion) ? "v25.0" : _settings.ApiVersion;

            if (string.IsNullOrWhiteSpace(token) || token.Contains("YOUR_"))
            {
                return (false, "Meta WhatsApp Access Token is missing. Click 'Generate Token' on Meta portal and paste token into appsettings.json or via dotnet user-secrets.");
            }

            var requestUrl = $"https://graph.facebook.com/{apiVer}/{phoneId}/messages";

            // 1. Primary Text Message Payload
            var textPayload = new
            {
                messaging_product = "whatsapp",
                recipient_type = "individual",
                to = formattedPhone,
                type = "text",
                text = new
                {
                    preview_url = false,
                    body = textBody
                }
            };

            var json = JsonSerializer.Serialize(textPayload);

            using var request = new HttpRequestMessage(HttpMethod.Post, requestUrl);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Trim());
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");

            using var response = await _httpClient.SendAsync(request);
            var responseBody = await response.Content.ReadAsStringAsync();

            if (response.IsSuccessStatusCode)
            {
                return (true, $"WhatsApp message dispatched successfully to +{formattedPhone} via Meta Cloud API.");
            }

            // 2. If Text payload fails due to 24-hour window, attempt Template Payload ('hello_world' fallback)
            if (useTemplateFallback)
            {
                var templatePayload = new
                {
                    messaging_product = "whatsapp",
                    to = formattedPhone,
                    type = "template",
                    template = new
                    {
                        name = "hello_world",
                        language = new { code = "en_US" }
                    }
                };

                var templateJson = JsonSerializer.Serialize(templatePayload);

                using var templateRequest = new HttpRequestMessage(HttpMethod.Post, requestUrl);
                templateRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token.Trim());
                templateRequest.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                templateRequest.Content = new StringContent(templateJson, Encoding.UTF8, "application/json");

                using var templateResponse = await _httpClient.SendAsync(templateRequest);
                var templateResponseBody = await templateResponse.Content.ReadAsStringAsync();

                if (templateResponse.IsSuccessStatusCode)
                {
                    return (true, $"WhatsApp template message ('hello_world') dispatched successfully to +{formattedPhone}.");
                }

                return (false, $"Meta WhatsApp API failed. Text Response: {responseBody} | Template Response: {templateResponseBody}");
            }

            return (false, $"Meta WhatsApp API failed. Status: {response.StatusCode}. Response: {responseBody}");
        }

        private static string FormatPhoneNumber(string phone)
        {
            if (string.IsNullOrWhiteSpace(phone)) return "918341701113";
            var clean = phone.Replace(" ", "").Replace("-", "").Replace("+", "").Replace("(", "").Replace(")", "");
            if (clean.Length == 10 && !clean.StartsWith("91"))
            {
                return "91" + clean;
            }
            return clean;
        }
    }
}
