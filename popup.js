document.addEventListener('DOMContentLoaded', function () {
  var filterButton = document.getElementById('filterButton');
  filterButton.addEventListener('click', filterVideos);

  var addTitleKeywordButton = document.getElementById('addTitleKeyword');
  addTitleKeywordButton.addEventListener('click', addTitleKeyword);

  var editTitleKeywordsButton = document.getElementById('editTitleKeywords');
  editTitleKeywordsButton.addEventListener('click', editTitleKeywords);

  var addDescriptionKeywordButton = document.getElementById('addDescriptionKeyword');
  addDescriptionKeywordButton.addEventListener('click', addDescriptionKeyword);

  var editDescriptionKeywordsButton = document.getElementById('editDescriptionKeywords');
  editDescriptionKeywordsButton.addEventListener('click', editDescriptionKeywords);

  applyFilters();
});

var titleKeywords = [];
var descriptionKeywords = [];

function applyFilters() {
  loadKeywords();
  filterVideos();
}

function filterVideos() {
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

function addTitleKeyword() {
  var newTitleKeyword = document.getElementById('titleKeyword').value.trim().toLowerCase();
  if (newTitleKeyword !== '') {
    titleKeywords.push(newTitleKeyword);
    chrome.storage.sync.set({ 'titleKeywords': titleKeywords }, applyFilters);
    document.getElementById('titleKeyword').value = '';
  }
}

function editTitleKeywords() {
  var newTitleKeywords = prompt('Enter new title keywords (separated by commas):', titleKeywords.join(', '));
  if (newTitleKeywords !== null) {
    titleKeywords = newTitleKeywords.split(',').map(keyword => keyword.trim().toLowerCase());
    chrome.storage.sync.set({ 'titleKeywords': titleKeywords }, applyFilters);
  }
}

function addDescriptionKeyword() {
  var newDescriptionKeyword = document.getElementById('descriptionKeyword').value.trim().toLowerCase();
  if (newDescriptionKeyword !== '') {
    descriptionKeywords.push(newDescriptionKeyword);
    chrome.storage.sync.set({ 'descriptionKeywords': descriptionKeywords }, applyFilters);
    document.getElementById('descriptionKeyword').value = '';
  }
}

function editDescriptionKeywords() {
  var newDescriptionKeywords = prompt('Enter new description keywords (separated by commas):', descriptionKeywords.join(', '));
  if (newDescriptionKeywords !== null) {
    descriptionKeywords = newDescriptionKeywords.split(',').map(keyword => keyword.trim().toLowerCase());
    chrome.storage.sync.set({ 'descriptionKeywords': descriptionKeywords }, applyFilters);
  }
}
