# Analytics QA (GTM + GA4 + Clarity)

## Events instrumented in frontend

- `generate_lead` (lead form submit success)
- `whatsapp_click` (header icon, floating bubble)
- `call_click` (mobile floating button, mobile drawer call)
- `quiz_gate_submit` (treatment finder phone gate)
- `cost_estimator_submit` (cost estimator phone gate)

## QA steps

1. Open GTM Preview and GA4 Realtime.
2. Trigger each event once from browser:
   - service form submit
   - contact/book form submit
   - click WhatsApp icon and bubble
   - click Call button
   - complete quiz phone gate
   - submit cost estimator
3. Confirm parameter payloads where available:
   - `source`
   - `pathname`
   - `procedure`, `grade`
4. Confirm Clarity session captures interactions.

## Optional extensions

- Add event hooks for hero CTA clicks and final CTA strip clicks.
- Route server-side lead API statuses into a monitoring dashboard.

