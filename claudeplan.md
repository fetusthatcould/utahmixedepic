Here is Claude's plan:
╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌
 Utah Mixed Epic Website - Implementation Plan

 Context

 The Utah Mixed Epic website is a professional "Ultra-Corporate     
 Strategy Briefing" themed website for a bike race event. The       
 exploration revealed that while the overall structure and styling  
 are largely complete, there are several critical issues preventing 
  the website from functioning correctly according to the project   
 specification:

 1. Form-to-JavaScript Mismatch: The registration form is missing   
 an "age" field in HTML, but the JavaScript code expects it and     
 performs validation on it (must be 16+), causing the form
 submission to fail
 2. Incomplete Form Data Capture: Waiver and newsletter checkboxes  
 exist in HTML but aren't being captured in the form data object    
 3. Missing Registration Timeline Logic: No date-based checks for   
 showing registration status (should show "Registration Opens June  
 25" banner when date < June 25, 2026)
 4. Incomplete Course Data: Fry Sauce course shows placeholder text 
  instead of the RideWithGPS iframe
 5. Missing Live Tracker CTA: Hero section doesn't have a dedicated 
  live tracker call-to-action
 6. Minor HTML Issues: Navigation typo in more-info.html has a      
 double closing tag

 Implementation Plan

 Phase 1: Fix Critical Form Issues

 Priority: HIGHEST - Form submission is currently broken

 Files to Modify:
 - registration.html - No changes needed (age field not required)   
 - script.js - Remove age validation logic and age field reference; 
  fix form data capture to include waiver and newsletter checkboxes 

 Tasks:
 1. Remove age input field reference from script.js formData object 
  (line 53)
 2. Remove age validation check from validateFormData() function    
 (line 101)
 3. Update script.js formData object to capture waiver and
 newsletter checkbox values
 4. Test form submission with corrected mapping

 Acceptance Criteria:
 - Form submits without JavaScript errors
 - Age field is no longer referenced in JavaScript
 - Waiver and newsletter checkbox values are captured
 - Data reaches Google Sheets with correct field names
 - No age validation errors in console

 ---
 Phase 2: Implement Registration Timeline Logic

 Priority: HIGH - Core feature per specification

 Files to Modify:
 - index.html - Add conditional banner showing registration status  
 - script.js - Add date checking logic

 Tasks:
 1. Add JavaScript function checkRegistrationStatus() that:
   - Gets current date
   - Compares to June 25, 2026 (registration opens)
   - Compares to September 25, 2026 (race date)
   - Returns status string
 2. Add conditional display logic for registration banner in        
 index.html
 3. Add registration button state toggle (disable/enable based on   
 date)
 4. Format banner with appropriate messaging for pre-registration   
 and registration-open periods

 Acceptance Criteria:
 - Banner displays "Registration Opens June 25, 2026" when current  
 date < June 25, 2026
 - Banner updates when registration window opens
 - Register Now button reflects availability based on date

 ---
 Phase 3: Complete Course Page

 Priority: MEDIUM - Improves user experience

 Files to Modify:
 - courses.html - Add Fry Sauce course iframe (Route ID: 53793007)  
 - courses.html - Update CTA button links to point to correct       
 RideWithGPS routes

 Tasks:
 1. Replace Fry Sauce placeholder content with working RideWithGPS  
 iframe
 2. Update "Acquire Full Intel" buttons with proper links:
   - Jello Salad: https://ridewithgps.com/routes/47894287
   - Fry Sauce: https://ridewithgps.com/routes/53793007
   - Funeral Potatoes: https://ridewithgps.com/routes/52269971      
 3. Verify responsive iframe behavior in courses.css

 Acceptance Criteria:
 - All three course iframes display correctly
 - CTA buttons link to correct RideWithGPS routes
 - Iframes are responsive on mobile devices

 ---
 Phase 4: Fix Minor Issues

 Priority: LOW - Polish and cleanup

 Files to Modify:
 - more-info.html - Fix double closing tag on courses.html link     
 - global.css - Add Live Tracker link to navigation
 - All HTML files - Link to Live Tracker

 Tasks:
 1. Fix HTML typo in more-info.html: <a
 href="courses.html">Courses</a></a> → <a
 href="courses.html">Courses</a>
 2. Add "Live Tracker" link to main navigation that points to       
 https://trackleaders.com/utahmixedepic25
 3. Test all navigation links function correctly
 4. Verify Live Tracker link opens correctly in new tab (use        
 target="_blank")

 Acceptance Criteria:
 - All HTML validates without errors
 - Navigation links work correctly
 - Live Tracker link appears in nav and functions correctly
 - No console errors from typos

 ---
 Critical Files Reference

 ┌───────────────────┬─────────────────────┬───────────────────┐    
 │       File        │       Purpose       │      Status       │    
 ├───────────────────┼─────────────────────┼───────────────────┤    
 │ registration.html │ Registration form   │ ⚠️ Age field      │    
 │                   │                     │ mismatch          │    
 ├───────────────────┼─────────────────────┼───────────────────┤    
 │                   │ Form handling &     │ ⚠️ Form data      │    
 │ script.js         │ validation          │ mapping           │    
 │                   │                     │ incomplete        │    
 ├───────────────────┼─────────────────────┼───────────────────┤    
 │ index.html        │ Home page with      │ ❌ Timeline logic │    
 │                   │ registration banner │  missing          │    
 ├───────────────────┼─────────────────────┼───────────────────┤    
 │ courses.html      │ Course details with │ ⚠️ Fry Sauce      │    
 │                   │  iframes            │ placeholder       │    
 ├───────────────────┼─────────────────────┼───────────────────┤    
 │ more-info.html    │ Info page           │ ⚠️ HTML typo      │    
 ├───────────────────┼─────────────────────┼───────────────────┤    
 │ global.css        │ Variables & shared  │ ✅ Complete       │    
 │                   │ styles              │                   │    
 ├───────────────────┼─────────────────────┼───────────────────┤    
 │ home.css          │ Home page styles    │ ✅ Complete       │    
 ├───────────────────┼─────────────────────┼───────────────────┤    
 │ courses.css       │ Course page styles  │ ✅ Complete       │    
 ├───────────────────┼─────────────────────┼───────────────────┤    
 │ registration.css  │ Form styles         │ ✅ Complete       │    
 ├───────────────────┼─────────────────────┼───────────────────┤    
 │ info.css          │ Info page styles    │ ✅ Complete       │    
 └───────────────────┴─────────────────────┴───────────────────┘    

 ---
 Verification & Testing

 Form Submission Test

 1. Open registration.html
 2. Fill out all fields including age
 3. Submit form
 4. Verify data appears in Google Sheets without errors
 5. Verify no JavaScript console errors

 Registration Timeline Test

 1. Test on date < June 25, 2026: Banner should show "Registration  
 Opens June 25"
 2. Test on date >= June 25, 2026: Banner should show registration  
 is open
 3. Test Register button state changes appropriately

 Course Page Test

 1. Load courses.html
 2. Verify all three course iframes load correctly
 3. Click all "Acquire Full Intel" buttons and verify links work    
 4. Test on mobile device for responsive behavior

 Navigation Test

 1. Check all nav links work correctly
 2. Open browser console and verify no errors
 3. Verify no HTML parsing errors

 ---
 Implementation Order

 1. First: Fix form data mapping (Phase 1) - unblocks form
 functionality
 2. Second: Add hidden age field if needed (Phase 1) - completes    
 form fix
 3. Third: Add registration timeline logic (Phase 2) - implements   
 core feature
 4. Fourth: Complete course page with Fry Sauce iframe (Phase 3) -  
 improves UX
 5. Fifth: Fix HTML typos and minor issues (Phase 4) - polish   