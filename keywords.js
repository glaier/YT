document.addEventListener('DOMContentLoaded', function () {
  var addTitleKeywordButton = document.getElementById('addTitleKeyword');
  addTitleKeywordButton.addEventListener('click', addTitleKeyword);

  var editTitleKeywordsButton = document.getElementById('editTitleKeywords');
  editTitleKeywordsButton.addEventListener('click', editTitleKeywords);

  var addDescriptionKeywordButton = document.getElementById('addDescriptionKeyword');
  addDescriptionKeywordButton.addEventListener('click', addDescriptionKeyword);

  var editDescriptionKeywordsButton = document.getElementById('editDescriptionKeywords');
  editDescriptionKeywordsButton.addEventListener('click', editDescriptionKeywords);

  loadKeywords();
});

function addTitleKeyword() {
  var newTitleKeyword = document.getElementById('titleKeyword').value.trim().toLowerCase();
  if (newTitleKeyword !== '') {
    titleKeywords.push(newTitleKeyword);
    saveKeywords();
    document.getElementById('titleKeyword').value = '';
  }
}

function addDescriptionKeyword() {
  var newDescriptionKeyword = document.getElementById('descriptionKeyword').value.trim().toLowerCase();
  if (newDescriptionKeyword !== '') {
    descriptionKeywords.push(newDescriptionKeyword);
    saveKeywords();
    document.getElementById('descriptionKeyword').value = '';
  }
}

function saveKeywords() {
  chrome.storage.sync.set({
    'titleKeywords': titleKeywords,
    'descriptionKeywords': descriptionKeywords
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
    displayKeywords();
  });
}

function displayKeywords() {
  var titleKeywordsElement = document.createElement('p');
  titleKeywordsElement.textContent = 'Title Keywords: ' + titleKeywords.join(', ');
  document.body.appendChild(titleKeywordsElement);

  var descriptionKeywordsElement = document.createElement('p');
  descriptionKeywordsElement.textContent = 'Description Keywords: ' + descriptionKeywords.join(', ');
  document.body.appendChild(descriptionKeywordsElement);
}

function editTitleKeywords() {
  var newTitleKeywords = prompt('Enter new title keywords (separated by commas):', titleKeywords.join(', '));
  if (newTitleKeywords !== null) {
    titleKeywords = newTitleKeywords.split(',').map(keyword => keyword.trim().toLowerCase());
    saveKeywords();
    displayKeywords();
  }
}

function editDescriptionKeywords() {
  var newDescriptionKeywords = prompt('Enter new description keywords (separated by commas):', descriptionKeywords.join(', '));
  if (newDescriptionKeywords !== null) {
    descriptionKeywords = newDescriptionKeywords.split(',').map(keyword => keyword.trim().toLowerCase());
    saveKeywords();
    displayKeywords();
  }
}

var titleKeywords = [];
var descriptionKeywords = [];
