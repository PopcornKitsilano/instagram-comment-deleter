//How to Use
//Step 1 — Go to your comments page
//Navigate to:
//https://www.instagram.com/your_activity/interactions/comments
//Make sure the comments list has fully loaded before proceeding.
//Step 2 — Open the browser console

//Press F12 (or Ctrl+Shift+J on Windows / Cmd+Option+J on Mac)
//Click the Console tab

//Step 3 — Paste and run the script
//Copy the script from script.js and paste it into the console, then press Enter.
//Step 4 — Confirm each batch
//When the "Delete comments?" dialog appears, click Delete manually.
//The script handles everything else — selecting comments, clicking the delete bar, looping to the next batch — automatically.

//Why one manual click?
//Instagram's confirmation dialog ("Are you sure you want to delete these comments?") loads inside a cross-origin Facebook iframe. Browser security policy blocks any programmatic access to cross-origin iframes, so the confirm button cannot be clicked automatically from the console.
//Everything else is fully automated.
//


;(async function () {
  const DELAY = (ms) => new Promise((r) => setTimeout(r, ms))
  const BATCH_SIZE = 30 //Feel free to change the batch size accordingly to how many comments you wannna delete at one time , dont go above 30-35 tho - meta might rate limit you - i initially started at BATCH_SIZE = 10

  const clickProper = (el) => {
    el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    el.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    el.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  }

  const findSpanByText = (text) =>
    [...document.querySelectorAll('span')]
      .find(el => el.textContent.trim() === text && el.children.length === 0)

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
               !['Sort & filter','Cancel','Select','Delete','Messages'].includes(text) &&
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

    const deleteBtn = [...document.querySelectorAll('div[tabindex="0"]')]
      .find(el => el.textContent.trim() === 'Delete')
    if (!deleteBtn) { console.error('Delete bar not found'); break }
    clickProper(deleteBtn)
    await DELAY(1000)

    // Try auto-confirm, if not found wait for manual click
    const confirmBtn = [...document.querySelectorAll('div[tabindex="0"], button')]
      .find(el => el.textContent.trim() === 'Delete' && el !== deleteBtn)
    if (confirmBtn) {
      clickProper(confirmBtn)
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
