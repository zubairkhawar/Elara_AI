# Vapi Integration: Testing & Call Script

Use this to verify your Vapi setup and test the Apex Plumbing & Co. agent end-to-end.

---

## 1. Pre-flight: Make Sure Everything Is Reachable

### Backend must be running and reachable by Vapi

- **If your backend is deployed on Render (recommended – no ngrok needed):**  
  1. Your API base URL is something like `https://YOUR-RENDER-SERVICE.onrender.com` (from your Render dashboard).  
  2. **Django admin** is part of the same app – open:  
     **`https://YOUR-RENDER-SERVICE.onrender.com/admin/`**  
     (Same deployment as the API; no separate "admin deploy." Log in with your superuser email/password.)  
  3. In **Vapi** → Phone Number → **Server URL**, use:  
     `https://YOUR-RENDER-SERVICE.onrender.com/api/v1/vapi/webhook/zqyMY6t5i_L7PkapAf5aNxWZerBMm1V8nTquLwcmaFY/`  
     Replace `YOUR-RENDER-SERVICE.onrender.com` with your actual Render backend host.  
  You do **not** need ngrok when using Render; Vapi can reach your backend directly.

- **If you're testing locally only:** Vapi cannot reach `localhost`, so you must use a tunnel (e.g. ngrok). See "Option A – ngrok" in the next paragraph.  
  **Option A – ngrok (for local testing only)**  
  1. Start Django: `python manage.py runserver 0.0.0.0:8000`  
  2. In another terminal: `ngrok http 8000`  
  3. Copy the **HTTPS** URL (e.g. `https://abc123.ngrok-free.app`)  
  4. In **Vapi** → Phone Number → **Server URL**, use:  
     `https://YOUR-NGROK-URL/api/v1/vapi/webhook/zqyMY6t5i_L7PkapAf5aNxWZerBMm1V8nTquLwcmaFY/`

### Quick webhook check (optional)

You can confirm the webhook URL responds (without creating a real call summary) by sending a minimal POST:

```bash
# Replace BASE with your backend URL (Render or ngrok)
BASE="https://YOUR-RENDER-SERVICE.onrender.com"   # or https://abc123.ngrok-free.app for local
TOKEN="zqyMY6t5i_L7PkapAf5aNxWZerBMm1V8nTquLwcmaFY"

curl -X POST "$BASE/api/v1/vapi/webhook/$TOKEN/" \
  -H "Content-Type: application/json" \
  -d '{"message":{"type":"end-of-call-report"},"call":{},"transcript":"Test","summary":"Test call"}'
```

- If the token and URL are correct, you should get `{"ok": true, "action": "created"}` and a new row in Call Summary (in admin or API).  
- If you get `{"ok": false, "reason": "unknown_token"}`, the token in the URL does not match the user's `vapi_webhook_token` in Django admin.

---

## 2. How to Test the Full Flow

1. **Call the agent**  
   From your phone, dial: **+1 272 235 0282** (or +12722350282).

2. **Follow the call script below** so you go through: greeting → service type → your details → time → confirmation.

3. **Hang up** after the agent confirms the booking (or after you’ve said enough for a short call).

4. **Check that the call was recorded in your app**  
   - Log in to your **Next.js app** (e.g. http://localhost:3000) as **zubairkhawer@gmail.com**.  
   - Open **Dashboard → Call summaries**.  
   - You should see a new row for this call (transcript/summary may take a few seconds after the call ends).  
   - Optionally check **Django admin** (same backend: `https://YOUR-RENDER-SERVICE.onrender.com/admin/` – no separate deploy) → if CallSummary is registered, you’ll see it there too.

5. **Check Vapi and backend**  
   - In Vapi dashboard, confirm the call appears in call logs.  
   - In the terminal where Django is running, you should see a **POST** to `/api/v1/vapi/webhook/...` with status **200** when Vapi sends the end-of-call-report.

If the call appears in Vapi but **not** in your app’s Call summaries, the webhook likely isn’t being reached (wrong URL, ngrok down, or Server URL in Vapi missing/incorrect). Re-check the Server URL and token.

---

## 3. Call Script: What to Say When Testing

Use this as a loose script when you call **+1 272 235 0282**. You don’t have to follow it word-for-word; the agent should handle variations.

---

### Scene 1: New customer – book a routine visit

| Step | You say (example) | Agent should |
|------|--------------------|--------------|
| 1 | *(Answer when they greet you)* "Hi, I’d like to book a plumber." | Greet, ask what type of service. |
| 2 | "I have a blocked drain in the kitchen." | Ask if emergency or routine, or go to details. |
| 3 | "It’s not urgent, I can wait a few days." | Ask new or returning, then ask for name, phone, address. |
| 4 | "First time. My name is [Your name]. Phone is [Your number]. Address is [Your address]." | Repeat back, then offer times. |
| 5 | "Thursday at 2pm works." (or pick one of the options) | Confirm: service, day, time, your name/number. |
| 6 | "Yes, that’s correct." | Give arrival info (30 min call, 2-hour window), ask reminder, close. |
| 7 | "No, that’s all. Thanks." | Say goodbye. You can hang up. |

After the call, check **Call summaries** in the app; you should see this call with outcome like “Booking created” and the service type (e.g. blocked drain).

---

### Scene 2: Emergency / same-day

| Step | You say (example) | Agent should |
|------|--------------------|--------------|
| 1 | "Hi, I have a burst pipe, water everywhere." | Acknowledge emergency, ask for details. |
| 2 | "Yes, I need someone today. Name is [X], phone [Y], address [Z]." | Offer earliest slot or same-day; confirm. |
| 3 | "Yes, please." | Confirm and close. Hang up. |

Check Call summaries again; outcome should reflect an emergency/same-day booking.

---

### Scene 3: Reschedule (optional)

| Step | You say (example) | Agent should |
|------|--------------------|--------------|
| 1 | "I need to reschedule an appointment I made." | Ask for name and phone to find the booking. |
| 2 | "[Same name and number you used in Scene 1]." | Confirm current appointment, offer new times. |
| 3 | "Move it to Friday morning." (or pick an option) | Confirm old cancelled, new time set; mention 24-hour policy. |
| 4 | "Thanks, bye." | Close. Hang up. |

---

### Scene 4: Just an inquiry (no booking)

| Step | You say (example) | Agent should |
|------|--------------------|--------------|
| 1 | "What are your hours?" or "Do you do boiler repairs?" | Answer hours and/or services. |
| 2 | "OK, I’ll call back when I’m ready to book. Thanks." | Polite close. Hang up. |

You should still see a Call summary with outcome like “Inquiry” or “No booking”.

---

## 4. What to Verify After a Test Call

| Check | Where | What to look for |
|-------|--------|-------------------|
| Call summary created | App → Dashboard → Call summaries | New row: date, caller (you), service type, outcome, transcript/summary if Vapi sent them. |
| Webhook received | Django runserver terminal | `POST /api/v1/vapi/webhook/... 200` when the call ends. |
| Correct user | Call summary row | Owner/user should be zubairkhawer@gmail.com (the user whose token is in the URL). |
| Vapi call log | Vapi dashboard | Call to +12722350282 appears; Server URL used for end-of-call-report. |

---

## 5. Troubleshooting

| Symptom | Likely cause | Fix |
|--------|----------------|-----|
| No call summary in app after call | Webhook not reached | Ensure Server URL in Vapi is **full** URL (https + domain + path). If local, use ngrok and update Vapi. |
| `unknown_token` in response | Token in URL doesn’t match Django | In Django admin, open the user and compare **Vapi webhook token** with the token in the Vapi Server URL. |
| Call summary created but empty transcript/summary | Vapi didn’t send full end-of-call-report | In Vapi, ensure **end-of-call-report** (or equivalent) is enabled for the assistant or phone number. |
| Can’t reach agent on +12722350282 | Number or assistant not set | In Vapi, check Phone Number → Inbound → Assistant is “Apex Plumbing Co.” and number is active. |

---

## Summary

1. **Pre-flight:** Backend running; if local, use ngrok and set Vapi Server URL to `https://YOUR-NGROK-URL/api/v1/vapi/webhook/TOKEN/`.  
2. **Test:** Call +1 272 235 0282 and follow the call script (new booking, emergency, reschedule, or inquiry).  
3. **Verify:** Call summaries in the app, POST 200 in Django, and correct user/outcome.  
4. Use the **curl** command above only to double-check that the webhook URL and token work; the real test is a live call + Call summaries.
