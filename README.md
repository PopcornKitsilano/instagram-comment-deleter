# Instagram Comment Deleter

A browser console script to bulk-delete your Instagram comments from the **Your Activity** page.

Deletes comments in batches — **fully automated, no manual clicks required.**

Feel free to change `BATCH_SIZE` in the script. Don't go above 30-35 though — Meta may rate limit you. I initially started at 10.

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

That's it — the script runs fully automatically until all comments are deleted.

---

## Notes

- Tested on **Chrome** — works on any Chromium-based browser
- Do not switch tabs or close DevTools while the script is running
- Instagram may rate-limit aggressive deletions — if it slows down, pause and resume later
- Script logs progress to the console: `[X deleted] Waiting for Select...`

---

## Disclaimer

Use at your own risk. This script interacts with Instagram's UI via browser automation. It does not use any private APIs or credentials. Your account data is never accessed or transmitted anywhere.

## Disclaimer

Use at your own risk. This script interacts with Instagram's UI via browser automation. It does not use any private APIs or credentials. Your account data is never accessed or transmitted anywhere.
