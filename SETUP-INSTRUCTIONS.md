# 🌿 Freya's Farmstand — Setup Instructions

Welcome! This guide will walk you through everything you need to get your website live.
It's written for complete beginners — no technical experience needed. Take it one step at a time!

---

## OVERVIEW OF STEPS

1. Create a GitHub account (free)
2. Create your Google Sheet (free)
3. Upload your website files to GitHub
4. Turn on free hosting with GitHub Pages
5. Update your config file with your Sheet ID and website URL
6. Done! Your site is live 🎉

---

## STEP 1 — Create a GitHub Account

GitHub is a free service that stores your website files and hosts them for free.

1. Go to **https://github.com** in your browser
2. Click the green **Sign up** button
3. Choose a username — we suggest something like **`freyasfarmstand`** or **`freyas-farm`**
   - This becomes part of your website address, so keep it simple!
   - Your website will be at: `https://YOUR-USERNAME.github.io/freyas-farmstand`
4. Enter your email address and create a password
5. Follow the prompts to verify your account (check your email for a confirmation link)
6. When asked about your plan, choose the **Free** option

---

## STEP 2 — Set Up Your Google Sheet

Your produce list and recipes will live in a Google Sheet. This is what you'll update every day.

### Create the Sheet

1. Go to **https://sheets.google.com** (sign in with your Google account)
2. Click the **+** button to create a new spreadsheet
3. Name it **Freya's Farmstand** (click "Untitled spreadsheet" at the top to rename)

### Set Up the Produce Tab

1. Click on the tab at the bottom (it says "Sheet1") — **double-click it** and rename it to **`Produce`**
2. In Row 1, type these column headers exactly (one per cell):

   | A | B | C | D |
   |---|---|---|---|
   | name | description | emoji | status |

3. Starting from Row 2, add your produce items. Example:

   | name | description | emoji | status |
   |------|-------------|-------|--------|
   | Strawberries | Sweet, sun-ripened and picked this morning | 🍓 | Available |
   | Heritage Carrots | Rainbow mix — purple, orange & yellow | 🥕 | Available |
   | Silverbeet | Lush green bunches, crisp and fresh | 🥬 | Limited |
   | Fresh Herbs | Basil, rosemary, thyme & parsley | 🌿 | Available |

   **Status options:** `Available` · `Limited` · `Unavailable`

### Set Up the Recipes Tab

1. Click the **+** button at the bottom of the screen to add a new tab
2. Rename it to **`Recipes`**
3. In Row 1, type these headers:

   | A | B | C | D | E | F | G |
   |---|---|---|---|---|---|---|
   | title | tag | description | time | serves | ingredients | steps |

4. Add your first recipe in Row 2. For ingredients and steps, separate each item with a **pipe character |**

   Example ingredients: `500g strawberries|1 cup sugar|8 basil leaves`
   Example steps: `Hull strawberries|Mix with sugar|Simmer 25 minutes`

### Publish the Sheet (IMPORTANT!)

This makes your sheet readable by your website — it does NOT make it editable by anyone.

1. Click **File** → **Share** → **Publish to web**
2. In the first dropdown, choose **Entire Document**
3. In the second dropdown, choose **Comma-separated values (.csv)**
4. Click **Publish**
5. Click **OK** on the confirmation popup

### Copy Your Sheet ID

Look at the URL in your browser — it looks like this:
`https://docs.google.com/spreadsheets/d/`**`1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms`**`/edit`

The long string of letters and numbers between `/d/` and `/edit` is your **Sheet ID**.
**Copy it and keep it handy** — you'll need it in Step 5.

---

## STEP 3 — Upload Your Website Files to GitHub

1. Go to **https://github.com** and sign in
2. Click the **+** icon in the top-right corner → **New repository**
3. Name it exactly: **`freyas-farmstand`** (lowercase, with hyphens)
4. Make sure it is set to **Public**
5. Click **Create repository**
6. On the next screen, click **uploading an existing file**
7. Open the `freyas-farmstand` folder on your computer
8. **Select ALL files and folders** inside it and drag them into the GitHub upload area
9. Scroll down and click **Commit changes**

---

## STEP 4 — Turn On Free Hosting (GitHub Pages)

1. On your repository page, click **Settings** (the gear icon in the tabs)
2. In the left menu, scroll down and click **Pages**
3. Under "Source", click the dropdown that says **None** and select **main**
4. Click **Save**
5. After about 2 minutes, your website will be live at:
   `https://YOUR-USERNAME.github.io/freyas-farmstand`

---

## STEP 5 — Update Your Config File

Now that you have your Sheet ID and website URL, you need to update your config file.

1. On GitHub, go to your repository
2. Click on the **js** folder, then click **config.js**
3. Click the **pencil icon** (Edit this file) in the top right
4. Replace `YOUR_SHEET_ID_HERE` with your actual Sheet ID from Step 2
5. Replace `https://YOUR-USERNAME.github.io/freyas-farmstand` with your actual URL
6. Update your farm address and hours if needed
7. **Change the admin password** from `freyas2024` to something only you know!
8. Scroll down and click **Commit changes**

Your website will update automatically within a minute or two.

---

## STEP 6 — Access Your Admin Panel

Your admin panel is at: `https://YOUR-USERNAME.github.io/freyas-farmstand/admin/`

Or scroll to the very bottom of your website and click the small "Admin" link.

Enter the password you set in config.js. From the admin panel you can:
- Get a direct link to open your Google Sheet for produce updates
- Get a direct link to open your Recipes sheet
- See your current configuration

---

## DAILY USE — Updating Your Produce

Every morning before opening:

1. Open the **Freya's Farmstand** Google Sheet (bookmark it on your phone!)
2. Go to the **Produce** tab
3. Change the **Status** column for each item:
   - `Available` — you have plenty
   - `Limited` — running low, first come first served
   - `Unavailable` — sold out or not ready yet
4. Save — your website updates automatically within about 60 seconds!

---

## PRINTING YOUR QR CODE

1. Visit `https://YOUR-USERNAME.github.io/freyas-farmstand/find-us.html`
2. Scroll down to the QR code section
3. Click **Print QR Code**
4. Print it and laminate it for your sign!

---

## NEED HELP?

If something isn't working, the most common issues are:

- **Website shows demo data instead of your produce** → Check that you've entered the correct Sheet ID in config.js
- **Sheet not loading** → Make sure you published the sheet (Step 2, "Publish the Sheet")
- **Page not found** → Make sure GitHub Pages is enabled (Step 4)

---

*Made with magic for Freya's Farmstand 🌿✦*
