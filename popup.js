document.addEventListener('DOMContentLoaded', function () {
  var filterButton = document.getElementById('filterButton');
  filterButton.addEventListener('click', filterVideos);

  var editKeywordsButton = document.getElementById('editKeywords');
  editKeywordsButton.addEventListener('click', function () {
    chrome.tabs.create({ 'url': chrome.runtime.getURL('keywords.html') });
  });

  loadKeywords();
});

var titleKeywords = [];
var descriptionKeywords = [];

function filterVideos() {
  loadKeywords();
  var videoContainers = document.querySelectorAll('ytd-grid-video-renderer');
  for (var i = 0; i < videoContainers.length; i++) {
    var titleElement = videoContainers[i].querySelector('a#video-title');
    var descriptionElement = videoContainers[i].querySelector('#description-text');
    if (titleElement && descriptionElement) {
      var title = titleElement.innerText.toLowerCase();
      var description = descriptionElement.innerText.toLowerCase();
      var titleMatch = checkKeywords(title, titleKeywords);
      var descriptionMatch = checkKeywords(description, descriptionKeywords);
      if (titleMatch || descriptionMatch) {
        videoContainers[i].style.display = 'none';
      }
    }
  }
}

function checkKeywords(text, keywords) {
  for (var j = 0; j < keywords.length; j++) {
    if (text.includes(keywords[j].toLowerCase())) {
      return true;
    }
  }
  return false;
}

function loadKeywords() {
  chrome.storage.sync.get(['titleKeywords', 'descriptionKeywords'], function (result) {
    if (result.titleKeywords) {
      titleKeywords = result.titleKeywords;
    }
    if (result.descriptionKeywords) {
      descriptionKeywords = result.descriptionKeywords;
    }
  });
}
