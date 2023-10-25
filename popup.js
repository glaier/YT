document.addEventListener('DOMContentLoaded', function () {
  var editKeywordsButton = document.getElementById('editKeywords');
  editKeywordsButton.addEventListener('click', function () {
    chrome.tabs.create({ 'url': chrome.runtime.getURL('keywords.html') });
  });
});
