# Instagram Comment Deleter

A browser console script to bulk-delete your Instagram comments from the **Your Activity** page.

Deletes comments in batches of 10 — fully automated except for **one manual confirm click per batch** (Instagram's confirm dialog runs in a cross-origin Facebook iframe and cannot be clicked programmatically).

---

## How to Use

**Step 1 — Go to your comments page**

Navigate to:
```
https://www.instagram.com/your_activity/interactions/comments
```
Wait for the comments list to fully load before proceeding.

**Step 2 — Open the browser console**

- Press `F12` (or `Ctrl+Shift+J` on Windows / `Cmd+Option+J` on Mac)
- Click the **Console** tab

**Step 3 — Paste and run the script**

Copy the script from [`code.js`](./code.js) and paste it into the console, then press `Enter`.

**Step 4 — Confirm each batch**

When the **"Delete comments?"** dialog appears, click **Delete** manually once.

The script handles everything else automatically — selecting 10 comments, clicking the delete bar, waiting, then looping to the next batch.

---

## Why one manual click?

Instagram's confirmation dialog loads inside a **cross-origin Facebook iframe**. Browser security policy blocks programmatic access to cross-origin iframes, so the confirm button cannot be clicked automatically from the console.

Everything else is fully automated.

---

## Notes

- Tested on **Chrome** — works on any Chromium-based browser
- Do not switch tabs or close DevTools while the script is running
- Instagram may rate-limit aggressive deletions — if it slows down, pause and resume later
- Script logs progress to the console: `[X deleted] Waiting for Select...`

---

## Disclaimer

Use at your own risk. This script interacts with Instagram's UI via browser automation. It does not use any private APIs or credentials. Your account data is never accessed or transmitted anywhere.
