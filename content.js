// content.js

function pauseVideo() {
  let video = document.querySelector('video');
  if (video) {
    video.pause();
  }
}

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

function reloadPage() {
  location.reload();
}

function resumeVideo() {
  let video = document.querySelector('video');
  if (video) {
    video.play();
  }
}

function checkKeywords(text, keywords) {
  for (let keyword of keywords) {
    if (text.includes(keyword.toLowerCase())) {
      return true;
    }
  }
  return false;
}

function main() {
  let titleKeywords = [];
  let descriptionKeywords = [];

  chrome.storage.sync.get(['titleKeywords', 'descriptionKeywords'], function (result) {
    if (result.titleKeywords) {
      titleKeywords = result.titleKeywords;
    }
    if (result.descriptionKeywords) {
      descriptionKeywords = result.descriptionKeywords;
    }

    pauseVideo();
    filterVideos(titleKeywords, descriptionKeywords);
    resumeVideo();
  });
}

main();
