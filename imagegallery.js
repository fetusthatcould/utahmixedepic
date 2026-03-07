// document.addEventListener("DOMContentLoaded", () => {
//   const galleryContainer = document.getElementById("gallery-grid");

//   if (!galleryContainer) return;
  
//   // 1. Fetch the list of images from your PHP script
//   fetch("get-images.php")
//     .then((response) => response.json())
//     .then((allImages) => {
//       // 2. Shuffle and pick 12 unique images
//       const selected = allImages.sort(() => 0.5 - Math.random()).slice(0, 12);
//       console.log("Images found by PHP:", allImages);
//       // 3. Loop through and inject the HTML
//       selected.forEach((imgSrc, index) => {
//         const item = document.createElement("div");
//         item.classList.add("masonry-item");

//         // Every 3rd image gets the 'tall' class for visual variety
//         if (index % 3 === 0) {
//           item.classList.add("tall");
//         }

//         // The HTML structure to match your CSS
//         item.innerHTML = `
//           <img src="${imgSrc}" alt="Utah Mixed Epic Gallery" loading="lazy" />
//           <div class="item-overlay"></div>
//         `;

//         galleryContainer.appendChild(item);
//       });
//     })
//     .catch((err) => console.error("Error loading gallery:", err));
// });

document.addEventListener("DOMContentLoaded", () => {
  const galleryContainer = document.getElementById("gallery-grid");

  // Guard clause in case the ID is missing on other pages
  if (!galleryContainer) return;

  const baseDir = "Photos UME Website-3-001/Photos UME Website/";
  const totalAvailable = 26;          // as before
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
  selectedNumbers.forEach((num, index) => {
    const item = document.createElement("div");
    item.classList.add("masonry-item");

    // Every 3rd image gets the 'tall' class for that cinematic masonry flow
    if (index % 3 === 0) {
      item.classList.add("tall");
    }

    // Creating the internal HTML structure
    // Note: Ensure your extension (jpg vs JPG) matches your files exactly!
    const ext = num <= 9 ? ".jpg" : ".JPG";     // simple hack for your set
    item.innerHTML = `
      <img src="${baseDir}Photo${num}${ext}"
         alt="…"
         loading="lazy" />
    <div class="item-overlay"></div>
  `;

    galleryContainer.appendChild(item);
  });
});
