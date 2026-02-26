# Google Sheets Integration Setup

This guide will help you set up automatic registration submissions to Google Sheets.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Create New Spreadsheet"
3. Name it: `Utah Mixed Epic Registrations`
4. In the first row, add these column headers:
   - A1: `Timestamp`
   - B1: `First Name`
   - C1: `Last Name`
   - D1: `Email`
   - E1: `Phone`
   - F1: `Age`
   - G1: `Course`
   - H1: `Emergency Contact`
   - I1: `Emergency Phone`

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    // Get the data from the POST request
    const data = JSON.parse(e.postData.contents);

    // Get the active sheet
    const sheet = SpreadsheetApp.getActiveSheet();

    // Prepare the row data
    const row = [
      data.timestamp,
      data.firstName,
      data.lastName,
      data.email,
      data.phone,
      data.age,
      data.course,
      data.emergencyContact,
      data.emergencyPhone,
    ];

    // Append the row to the sheet
    sheet.appendRow(row);

    // Send confirmation email to the registrant (optional)
    if (data.email) {
      const subject = 'Utah Mixed Epic Registration Confirmation';
      const body = `Hi ${data.firstName},\n\n` +
        `Thanks for registering for the Utah Mixed Epic! Here are the details we received:\n\n` +
        `Name: ${data.firstName} ${data.lastName}\n` +
        `Route: ${data.course}\n` +
        `Age: ${data.age}\n` +
        `Emergency Contact: ${data.emergencyContact} (${data.emergencyPhone})\n\n` +
        `We look forward to seeing you at the event. If you have any questions, reply to this email or reach us at info@utahmixedepic.com.\n\n` +
        `Safe riding!\n` +
        `-- The Utah Mixed Epic Team`;
      MailApp.sendEmail(data.email, subject, body);
    }
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Registration saved successfully",
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString(),
      }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Step 3: Deploy the Script

1. Click the **Deploy** button in the top right
2. Select **New Deployment**
3. Click the **Select Type** dropdown and choose **Web app**
4. Configure deployment:
   - **Execute as:** (Your Google Account)
   - **Who has access:** `Anyone`
5. Click **Deploy**
6. Click **Authorize access** if prompted
7. **Copy the deployment URL** - It will look like:
   ```
   https://script.google.com/macros/d/SCRIPT_ID/useweb
   ```

## Step 4: Add URL to Your Website

1. Open `script.js` in your website files
2. Find this line at the top:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL = "";
   ```
3. Replace it with:
   ```javascript
   const GOOGLE_APPS_SCRIPT_URL =
     "https://script.google.com/macros/d/YOUR_SCRIPT_ID/useweb";
   ```
   _(Paste the URL you copied in Step 3)_

## Step 5: Test It

1. Go to your registration page
2. Fill out and submit a test registration
3. Go back to your Google Sheet - you should see the data in a new row!

## Troubleshooting

**No data appearing in Google Sheets?**

- Check the deployment URL is correct in `script.js`
- Make sure the Apps Script deployment has "Anyone" access
- Check browser console for error messages (F12 → Console tab)

**Getting CORS errors?**

- The `mode: "no-cors"` in the script should handle this
- If still having issues, make sure the Google Apps Script is set to execute as "Your Google Account"

## Backup

Your website also saves registrations locally to browser storage as a backup. See `registrations-admin.html` to view or export.

## Updating Column Mappings

If you change your Google Sheet structure, update the `doPost` function in Apps Script to match your new column order.
