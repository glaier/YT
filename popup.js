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
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {
      action: 'filterVideos',
      titleKeywords: titleKeywords,
      descriptionKeywords: descriptionKeywords
    });
  });
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
