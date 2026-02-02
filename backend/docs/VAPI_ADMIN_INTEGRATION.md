# Vapi ↔ App Integration: What You Need

## Data you need **from Vapi** (to store in admin)

When you build each client’s agent in Vapi, you only need to **give Vapi** one thing from this app. Optionally you can store a couple of things **from Vapi** in the admin for your own reference.

### Required (you give this TO Vapi)

| What | Where it comes from | Where you use it |
|------|----------------------|------------------|
| **Webhook URL** | Django admin: after you “Generate Vapi webhook token” for the client, copy the **Webhook URL for Vapi** (e.g. `https://yourapp.com/api/v1/vapi/webhook/<token>/`) | In Vapi: set this as the **Server URL** (or “Webhook URL” / “End of call report URL”) for that agent |

So: **no data is required FROM Vapi** for the integration to work. You only need to paste the webhook URL from the admin into Vapi.

### Optional (store in admin for your records)

| Field | What to put | Why |
|-------|-------------|-----|
| **Vapi Assistant ID** | The assistant/agent ID from Vapi (e.g. from the Vapi dashboard URL or API) | So you can quickly open the right agent in Vapi and debug which agent belongs to which client |
| **Vapi Phone Number** | The phone number you assign to this agent in Vapi (e.g. +1 555…) | So you know which number callers dial for this client; useful for support and docs |

You can fill these in the admin after you create the agent in Vapi; they are for your reference only, not used by the webhook.

---

## What to configure **in Vapi** per agent

1. **Server URL / Webhook URL**  
   Set to: `https://<your-app-domain>/api/v1/vapi/webhook/<this-client-token>/`  
   (Copy from Django admin “Webhook URL for Vapi”.)

2. **Webhook / End-of-call report**  
   Ensure the agent sends an **end-of-call report** (or equivalent) to that URL when a call ends. The app expects a JSON body compatible with the existing webhook (e.g. `end-of-call-report` with call details, transcript, summary, customer phone/name, etc.).

3. **Optional**  
   Any custom fields your Vapi setup sends (e.g. `outcome`, `serviceName`, `price`) will be stored on the call summary if your webhook code already reads them.

No other data from Vapi (e.g. API keys) needs to be stored in the Django admin for the integration to work.

---

## Admin panel: what it has

### User (client) list

- **List columns:** Email, Name, Business name, **Setup status**, Vapi token (✓/—), **Vapi phone**, Active, **Last login**, Date joined.
- **Filters:** Active, Staff, **Setup status**.
- **Search:** Email, name, business name, Vapi Assistant ID, Vapi phone.
- **Editable in list:** Setup status (change without opening the user).

### User edit form

- **Profile:** Name, business name, phone, business type, service hours.
- **Vapi (per-client webhook):**
  - **vapi_webhook_token** – unique token (or blank; use action to generate).
  - **Webhook URL for Vapi** – readonly; copy this into Vapi.
  - **Vapi Assistant ID** – optional; from Vapi after you create the agent.
  - **Vapi Phone Number** – optional; number assigned in Vapi for this client.
- **Onboarding:**
  - **Setup status** – Not started → Token generated → Vapi agent configured → Client notified → Live.
  - **Admin notes** – internal notes (not visible to client).
- **Settings:** Currency, email/SMS notifications.
- **Permissions:** Active, staff, superuser, groups.
- **Important dates:** Date joined, last login.

### Actions

- **Generate Vapi webhook token** – sets a unique token (and status “Token generated”) for selected users who don’t have one.
- **Mark setup status: Live** – set selected users’ setup status to “Live”.

### Suggested workflow per client

1. Create the User in admin (email, name, business name, set password).
2. Run **Generate Vapi webhook token** for that user.
3. Copy **Webhook URL for Vapi** from the user’s edit form.
4. In Vapi, create the agent and set that URL as the webhook.
5. Optionally fill **Vapi Assistant ID** and **Vapi Phone Number** in admin.
6. Update **Setup status** (e.g. Vapi agent configured → Client notified → Live).
7. Use **Admin notes** for anything you need to remember (e.g. “Go-live 2026-02-01”, “Prefers SMS”).

---

## Summary

- **Required from this app → to Vapi:** Webhook URL (from admin).
- **Required from Vapi → to this app:** Nothing; the webhook URL is enough.
- **Optional in admin (from Vapi):** Assistant ID, phone number, for your own reference and support.
