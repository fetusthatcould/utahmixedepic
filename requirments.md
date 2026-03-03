# Project Specification: Utah Mixed Epic Website

## 1. Project Overview
A professional, "Ultra-Corporate Strategy Briefing" themed website for the Utah Mixed Epic Ultra Bike Race. The design features high-contrast typography, modular CSS, and a "dossier" aesthetic.

## 2. Core Data & Links
- **Race Date:** September 25th, 2026
- **Registration Window:** Opens June 25th, 2026 (3 months prior)
- **Live Tracking:** [TrackLeaders URL](https://trackleaders.com/utahmixedepic25) (Annual Update)
- **Google Apps Script (Form Submit):** `https://script.google.com/macros/s/AKfycbzvt6LJCbgu7ri-pvF8IJcVRopNhXn2Oz6RUv1wQ1D_HR138cXrppAmym3LteNURcQKQg/exec`
- **Google Photos Album:** [Photos URL](https://photos.app.goo.gl/kJEFg6ioxn8Ee8Vq7)
- **Social Media:** @utahmixedepic | [Facebook Group](https://www.facebook.com/groups/utahmixedepic/)

## 3. Registration Sheet Schema (Mandatory)
The HTML form `name` attributes must map exactly to these Google Sheet column headers:
1. `Timestamp` (Handled by script)
2. `First Name`
3. `Last Name`
4. `Email`
5. `Phone`
6. `Course`
7. `Emergency Contact`
8. `Emergency Phone`

## 4. Page Architecture

### Home Page (`index.html`)
- **Hero:** Cinematic background with "Live Tracker" CTA.
- **Logic:** Show "Registration Opens June 25" banner if current date < June 25, 2026.
- **Gallery:** Dynamically display images from the Google Photos album.

### Courses Page (`courses.html`)
- **Layout:** Premium split-panel cards.
- **Embeds:** Responsive RideWithGPS iframes for:
    - Jello Salad (165mi): `https://ridewithgps.com/routes/47894287`
    - Fry Sauce (320mi): `https://ridewithgps.com/routes/53793007`
    - Funeral Potatoes (560mi): `https://ridewithgps.com/routes/52269971`

### More Info Page (`more-info.html`)
- **Layout:** Centered Dossier style.
- **Side Headers:** 300px width labels (e.g., "Policy 01", "Protocol 01").
- **Content:** "Internal Memo" callout boxes for ethics/status.
- **Checklist:** Two-column grid for "Mandatory Kit."

### Registration Page (`registration.html`)
- **Functionality:** AJAX/Fetch submission to Google Apps Script.
- **UI:** Sticky sidebar for "Project Budget/Summary."

## 5. Technical Implementation Tasks

### CSS Modules
- `global.css`: Variables, Nav, Footer, and Stakeholder placeholders.
- `home.css`: Hero and Masonry Gallery logic.
- `courses.css`: Iframe responsiveness and card layouts.
- `registration.css`: Form validation and sticky sidebar.
- `info.css`: Side-header grid (300px/1fr) and dark `info-tag` styling.

### JavaScript Logic
- **Form Handling:** Ensure `JSON.stringify` keys match the Sheet Schema exactly.
- **Date Check:** Automated toggle for Registration button state based on race timeline.