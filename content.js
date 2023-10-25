// content.js

// Function to pause the active video
function pauseVideo() {
  let video = document.querySelector('video');
  if (video) {
    video.pause();
  }
}

// Function to filter the videos
function filterVideos(titleKeywords, descriptionKeywords) {
  let videoElements = document.querySelectorAll('#secondary ytd-compact-video-renderer');

  if (videoElements) {
    videoElements.forEach((element) => {
      let title = element.querySelector('#video-title').innerText.toLowerCase();
      let description = element.querySelector('#description').innerText.toLowerCase();

      if (checkKeywords(title, titleKeywords) || checkKeywords(description, descriptionKeywords)) {
        element.style.display = 'none';
      }
    });
  }
}

// Function to reload the page
function reloadPage() {
  location.reload();
}

// Function to resume the active video
function resumeVideo() {
  let video = document.querySelector('video');
  if (video) {
    video.play();
  }
}

// Helper function to check keywords
function checkKeywords(text, keywords) {
  for (let keyword of keywords) {
    if (text.includes(keyword.toLowerCase())) {
      return true;
    }
  }
  return false;
}

// Main function that orchestrates the filtering process
function main() {
  // You should load the keywords here
  let titleKeywords = []; // Replace with loaded title keywords
  let descriptionKeywords = []; // Replace with loaded description keywords

  pauseVideo();
  filterVideos(titleKeywords, descriptionKeywords);
  reloadPage();
  resumeVideo();
}

// Execute the main function
main();
