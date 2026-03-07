document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("gallery-grid");

  if (!galleryContainer) return;

  const baseDir = "Photos UME Website/";
  const totalAvailable = 26;          
  const imagesToDisplay = 9;
  const selectedNumbers = [];

  // 1. Logic to get 9 unique random numbers
  while (selectedNumbers.length < Math.min(imagesToDisplay, totalAvailable)) {
    let r = Math.floor(Math.random() * totalAvailable) + 1;
    if (selectedNumbers.indexOf(r) === -1) {
      selectedNumbers.push(r);
    }
  }

  // 2. Loop through the selected numbers and build the HTML
  selectedNumbers.forEach((num) => {
    const item = document.createElement("div");
    // Updated class name for the new CSS
    item.classList.add("carousel-item");

    item.innerHTML = `
      <img src="${baseDir}Photo${num}.jpg"
         alt="Utah Mixed Epic Gallery"
         loading="lazy" />
      <div class="item-overlay"></div>
    `;

    galleryContainer.appendChild(item);
  });
});

// document.addEventListener("DOMContentLoaded", () => {
//   const galleryContainer = document.getElementById("gallery-grid");

//   // Guard clause in case the ID is missing on other pages
//   if (!galleryContainer) return;

//   const baseDir = "Photos UME Website-3-001/Photos UME Website/";
//   const totalAvailable = 17;          // as before
//   const imagesToDisplay = 9;
//   const selectedNumbers = [];

//   // 1. Logic to get 9 unique random numbers
//   while (selectedNumbers.length < Math.min(imagesToDisplay, totalAvailable)) {
//     let r = Math.floor(Math.random() * totalAvailable) + 1;
//     if (selectedNumbers.indexOf(r) === -1) {
//       selectedNumbers.push(r);
//     }
//   }

//   // 2. Loop through the selected numbers and build the HTML
//   selectedNumbers.forEach((num, index) => {
//     const item = document.createElement("div");
//     item.classList.add("masonry-item");

//     // Every 3rd image gets the 'tall' class for that cinematic masonry flow
//     if (index % 3 === 0) {
//       item.classList.add("tall");
//     }

//     // Creating the internal HTML structure
//     // Note: Ensure your extension (jpg vs JPG) matches your files exactly!
//     const ext = num <= 9 ? ".jpg" : ".JPG";     // simple hack for your set
//     item.innerHTML = `
//       <img src="${baseDir}Photo${num}${ext}"
//          alt="…"
//          loading="lazy" />
//     <div class="item-overlay"></div>
//   `;

//     galleryContainer.appendChild(item);
//   });
// });
