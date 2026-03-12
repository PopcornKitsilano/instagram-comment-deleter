//How to Use
//Step 1 — Go to your comments page
//Navigate to:
//https://www.instagram.com/your_activity/interactions/comments
//Step 2 — Open the browser console
//Press F12 (or Ctrl+Shift+J on Windows / Cmd+Option+J on Mac)
//Click the Console tab
//Step 3 — Paste and run the script
//Copy the script from script.js and paste it into the console, then press Enter.
//The script handles everything automatically.
// Change BATCH_SIZE below to select how many comments you wanna delete at one time, but don't exceed 30-35 or Meta may rate limit you

;(async function () {
  const DELAY = (ms) => new Promise((r) => setTimeout(r, ms))
  const BATCH_SIZE = 30 // Keep the comment deletion batch size within 30-35 - i initially started at BATCH_SIZE=10

  const clickProper = (el) => {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    el.click()
  }

  const findSpanByText = (text) =>
    [...document.querySelectorAll('span')]
      .find(el => el.textContent.trim() === text && el.children.length === 0)

  const waitForElement = async (selector, timeout = 5000) => {
    const start = Date.now()
    while (Date.now() - start < timeout) {
      const el = document.querySelector(selector)
      if (el) return el
      await DELAY(100)
    }
    return null
  }

  const waitForSelect = async (timeout = 30000) => {
    const start = Date.now()
    while (Date.now() - start < timeout) {
      const s = findSpanByText('Select')
      if (s) return s
      await DELAY(500)
    }
    return null
  }

  const waitForDialogToClose = async (timeout = 30000) => {
    const start = Date.now()
    while (Date.now() - start < timeout) {
      if (!document.body.innerText.includes('Are you sure')) return true
      await DELAY(300)
    }
    return false
  }

  const getCommentRows = () =>
    [...document.querySelectorAll('div[tabindex="0"]')]
      .filter(el => {
        const text = el.textContent.trim()
        return text.length > 3 &&
               !['Sort & filter', 'Cancel', 'Select', 'Delete', 'Messages'].includes(text) &&
               el.closest('a') === null
      })

  let totalDeleted = 0

  while (true) {
    console.log(`[${totalDeleted} deleted] Waiting for Select...`)
    const selectSpan = await waitForSelect(30000)
    if (!selectSpan) { console.log(`Done. Total: ${totalDeleted}`); break }

    clickProper(selectSpan)
    await DELAY(1500)

    const rows = getCommentRows()
    console.log('Rows found:', rows.length)
    if (rows.length === 0) { console.log(`No rows. Total: ${totalDeleted}`); break }

    for (const row of rows.slice(0, BATCH_SIZE)) {
      clickProper(row)
      await DELAY(150)
    }

    await DELAY(800)

    // Find Delete via span like stolen code does
    const deleteBtn = [...document.querySelectorAll('span')]
      .find(el => el.textContent.trim() === 'Delete' && el.children.length === 0)
    if (!deleteBtn) { console.error('Delete bar not found'); break }
    clickProper(deleteBtn)
    await DELAY(500)

    // Confirm via button[tabindex="0"] like stolen code
    const confirmBtn = await waitForElement('button[tabindex="0"]', 5000)
    if (confirmBtn) {
      confirmBtn.scrollIntoView({ behavior: 'smooth', block: 'center' })
      await DELAY(300)
      confirmBtn.click()
    } else {
      console.log('>>> click Delete in dialog <<<')
      await waitForDialogToClose(30000)
    }

    totalDeleted += BATCH_SIZE
    console.log(`Batch done. Total: ${totalDeleted}`)
    await DELAY(3000)
  }

  console.log(`ALL DONE. Total: ${totalDeleted}`)
})()
