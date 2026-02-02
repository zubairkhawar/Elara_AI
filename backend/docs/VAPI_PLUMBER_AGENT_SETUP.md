# Step-by-Step: Vapi Agent for a Plumber Business (One Client)

Use this when your **client** is your superuser (e.g. zubairkhawer@gmail.com) running a **plumber business**. You will create one Vapi assistant that answers calls for that business and sends call data to your app.

---

## Part A: Get Your Webhook URL (Django Admin)

1. **Open Django admin**  
   Go to: **http://localhost:8000/admin/** and log in (e.g. zubairkhawer@gmail.com / abcd1234).

2. **Open Users**  
   Click **ACCOUNTS** → **Users**.

3. **Generate webhook token for this client**  
   - Select the user that represents the plumber business (e.g. your superuser).  
   - In the **Action** dropdown, choose **Generate Vapi webhook token**.  
   - Click **Go**.  
   (If the user already has a token, skip this step.)

4. **Copy the Webhook URL**  
   - Click the user’s **email** to open their edit form.  
   - Scroll to **Vapi (per-client webhook)**.  
   - Copy the **Webhook URL for Vapi**. It looks like:
     - **Local (with ngrok):** `https://YOUR-NGROK-SUBDOMAIN.ngrok.io/api/v1/vapi/webhook/TOKEN/`
     - **Production:** `https://your-api-domain.com/api/v1/vapi/webhook/TOKEN/`  
   Keep this URL ready for Part B.

5. **Optional – local testing**  
   If your backend is on your machine (localhost), run **ngrok** so Vapi can reach it:
   ```bash
   ngrok http 8000
   ```
   Use the **HTTPS** URL ngrok gives you (e.g. `https://abc123.ngrok.io`) as the base. Your full webhook URL is:
   `https://abc123.ngrok.io/api/v1/vapi/webhook/TOKEN/`  
   Use this exact URL in Vapi.

---

## Part B: Create the Vapi Assistant (Vapi Dashboard)

1. **Log in to Vapi**  
   Go to [https://dashboard.vapi.ai](https://dashboard.vapi.ai) (or the current Vapi dashboard URL) and sign in.

2. **Create a new Assistant**  
   - In the dashboard, go to **Assistants** (or **Agents**).  
   - Click **Create Assistant** / **New Assistant**.

3. **Basic details**  
   - **Name:** e.g. `Plumber Business – [Your Business Name]`.  
   - **Model:** Choose a voice model (e.g. the default or one you prefer for phone).

4. **System prompt (service booking)**  
   Set the **System Prompt** (or **Instructions**) so the assistant behaves like a booking assistant for your business. Use the full prompt from **`VAPI_AGENT_PROMPT_SERVICE_BOOKING.md`** in this folder: copy the entire contents of that file into Vapi’s prompt field, then replace **[Business Name]** and any placeholders (e.g. service types, hours, policies) with your real plumber client details.

5. **Server URL (webhook)**  
   - Find **Server URL** / **Webhook URL** / **Server** (or similar) in the assistant settings.  
   - Paste the **full webhook URL** you copied from Django admin (e.g. `https://..../api/v1/vapi/webhook/TOKEN/`).  
   - Save.

6. **Ensure end-of-call report is sent**  
   - Look for **Server Messages** / **Message types** / **Events to send** (wording may vary).  
   - Make sure **end-of-call-report** (or equivalent) is **enabled** so your app receives the call summary when the call ends.  
   - If there is a list (e.g. `serverMessages`), include at least: `end-of-call-report`.  
   Save the assistant.

7. **Phone number**  
   - Go to **Phone Numbers** (or **Numbers**) in Vapi.  
   - **Buy** or **assign** a number to this assistant (e.g. attach it to the assistant you just created).  
   - Note the number (e.g. +1 555…) for your records and for Django admin.

8. **Test**  
   - Call the Vapi number from your phone.  
   - Have a short conversation (e.g. “I need a plumber for a leak,” give name and time).  
   - Hang up.  
   - In your app: **Dashboard → Call summaries** (and Django admin if CallSummary is registered). You should see a new call summary for that user with transcript/summary when Vapi sends the end-of-call-report.

---

## Part C: Optional – Store Vapi Details in Django Admin

1. **Assistant ID**  
   In Vapi, open the assistant and copy its **Assistant ID** (from the URL or an “ID” field).

2. **Back in Django admin**  
   - **Users** → open the same user (plumber client).  
   - **Vapi Assistant ID:** paste the ID (for Apex Plumbing & Co. it is `d52979ab-d24a-47d7-a817-094516346314`).  
   - **Vapi Phone Number:** paste the number you assigned (e.g. +1 555…).  
   - **Setup status:** set to **Vapi agent configured** or **Live**.  
   - Save.

**Apex Plumbing & Co. assistant ID (for reference):** `d52979ab-d24a-47d7-a817-094516346314`

---

## Checklist

| Step | Where | What to do |
|------|--------|------------|
| 1 | Django admin | Generate Vapi webhook token for the plumber user |
| 2 | Django admin | Copy “Webhook URL for Vapi” |
| 3 | Local only | Run `ngrok http 8000` and use ngrok HTTPS URL in the webhook |
| 4 | Vapi dashboard | Create new Assistant |
| 5 | Vapi dashboard | Set name + system prompt (plumber booking) |
| 6 | Vapi dashboard | Set Server URL = your webhook URL |
| 7 | Vapi dashboard | Enable end-of-call-report |
| 8 | Vapi dashboard | Assign phone number to assistant |
| 9 | Test | Call the number, then check Call summaries in your app |
| 10 | Django admin (optional) | Save Vapi Assistant ID + phone, set Setup status |

---

## Summary

- **One User in your app** = one client (here: your superuser as plumber).  
- **One webhook URL per user** = from Django admin (Generate Vapi webhook token → copy URL).  
- **One Vapi assistant per client** = one agent in Vapi, with that URL as Server URL and end-of-call-report enabled.  
- Calls to the Vapi number create **Call summaries** for that user and can be linked to **Clients** and **Bookings** by caller phone.

---

## Next: Testing & call script

See **`VAPI_TESTING_AND_CALL_SCRIPT.md`** in this folder for:

- Pre-flight checklist (backend, ngrok, webhook URL)
- How to test the full flow (call the number, check Call summaries)
- A **conversation script** to use when calling +1 272 235 0282 (new booking, emergency, reschedule, inquiry)
- What to verify after a test call and basic troubleshooting
