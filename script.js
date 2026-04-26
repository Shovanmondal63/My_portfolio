// Get references to HTML elements
const slider = document.getElementById("slider"); // The container that holds all cards
const next = document.getElementById("next");     // "Next" button
const prev = document.getElementById("prev");     // "Previous" button

// Variable to track current slide position (index of visible card set)
let index = 0;

// Width of one card including gap (important for sliding calculation)
const cardWidth = 320; 

// When "Next" button is clicked
next.addEventListener("click", () => {

  // Maximum scrollable distance (total width - visible width)
  const maxScroll = slider.scrollWidth - slider.clientWidth;

  // Check if we can still scroll forward
  if (index * cardWidth < maxScroll) {
    index++; // Move to next position

    // Shift slider left using transform
    slider.style.transform = `translateX(-${index * cardWidth}px)`;
  }
});

// When "Previous" button is clicked
prev.addEventListener("click", () => {

  // Check if we are not already at the first position
  if (index > 0) {
    index--; // Move back

    // Shift slider right (reduce negative translation)
    slider.style.transform = `translateX(-${index * cardWidth}px)`;
  }
});

/* OPTIONAL FEATURE:
   If there are arrow buttons inside each card,
   clicking them will also trigger the "Next" slide
*/
document.querySelectorAll(".arrow-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    next.click(); // Simulate clicking the "Next" button
  });
});

// Disable right-click
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert("Right-click is disabled on this page.");
    });

    // Disable common copy shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl+C, Ctrl+X, Ctrl+S, Ctrl+U, Ctrl+Shift+I
        if ((e.ctrlKey && ['c', 'x', 's', 'u'].includes(e.key.toLowerCase())) ||
            (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i')) {
            e.preventDefault();
            alert("Copying and viewing source are disabled.");
        }
    });

function downloadAndRedirect(event) {
    event.preventDefault(); // stop normal link behavior

    // Trigger file download
    const link = document.createElement('a');
    link.href = 'Resume.pdf'; // your PDF file path
    link.download = 'Shovan.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Redirect after slight delay
    setTimeout(() => {
        window.location.href = "resume.html";
    }, 500);
}