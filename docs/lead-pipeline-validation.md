# Lead Pipeline Validation Matrix

Use this checklist after setting:

- `GOOGLE_SHEETS_WEBHOOK_URL`
- `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`, `SENDGRID_TO_EMAIL`
- `LEAD_WHATSAPP_WEBHOOK_URL`

## Expected payload keys

- `name`
- `mobile`
- `treatment`
- `pageUrl`
- `utmSource`, `utmMedium`, `utmCampaign`
- `source`
- `createdAt`

## Submission tests

1. Service page sticky/sidebar form
2. Blog article sidebar form
3. Contact page form
4. Book consultation page form
5. Exit-intent popup form
6. Quiz result gate (phone capture)
7. Cost estimator gate

For each test case verify:

- User redirected to `/thank-you`
- API response contains `statuses`
- Google Sheets row created
- SendGrid email received
- WhatsApp owner webhook receives payload

## UTM attribution tests

Test with URL:

`/services/hair-transplant?utm_source=google&utm_medium=cpc&utm_campaign=hair_launch`

Verify UTM values and `pageUrl` are recorded in all channels.

