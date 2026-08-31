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
    public class BrevoEmailService : IEmailService
    {
        private readonly HttpClient _httpClient;
        private readonly BrevoSettings _settings;

        public BrevoEmailService(HttpClient httpClient, IOptions<BrevoSettings> settings)
        {
            _httpClient = httpClient;
            _settings = settings.Value;
        }

        public async Task SendEmailAsync(
            string toEmail,
            string toName,
            string subject,
            string htmlContent,
            string? attachmentName = null,
            byte[]? attachmentContent = null)
        {
            var apiKey = _settings.ApiKey;
            var senderEmail = _settings.SenderEmail;
            var senderName = _settings.SenderName;

            if (string.IsNullOrWhiteSpace(apiKey) || apiKey.Contains("YOUR_"))
            {
                throw new Exception("Brevo API key is missing. Please set your new Brevo API key (starts with 'xkeysib-') in appsettings.json or via dotnet user-secrets.");
            }

            if (string.IsNullOrWhiteSpace(senderEmail))
            {
                throw new Exception("Brevo sender email is missing in configuration.");
            }

            object requestBody;

            if (attachmentContent != null && attachmentContent.Length > 0 && !string.IsNullOrWhiteSpace(attachmentName))
            {
                requestBody = new
                {
                    sender = new { name = senderName, email = senderEmail },
                    to = new[] { new { email = toEmail, name = toName } },
                    subject = subject,
                    htmlContent = htmlContent,
                    attachment = new[]
                    {
                        new
                        {
                            name = attachmentName,
                            content = Convert.ToBase64String(attachmentContent)
                        }
                    }
                };
            }
            else
            {
                requestBody = new
                {
                    sender = new { name = senderName, email = senderEmail },
                    to = new[] { new { email = toEmail, name = toName } },
                    subject = subject,
                    htmlContent = htmlContent
                };
            }

            var json = JsonSerializer.Serialize(requestBody);

            using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.brevo.com/v3/smtp/email");
            request.Headers.Add("api-key", apiKey.Trim());
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            request.Content = new StringContent(json, Encoding.UTF8, "application/json");

            using var response = await _httpClient.SendAsync(request);
            var responseBody = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"Brevo API Email dispatch failed. Status: {response.StatusCode}. Response: {responseBody}");
            }
        }
    }
}
