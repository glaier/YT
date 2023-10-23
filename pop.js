document.addEventListener('DOMContentLoaded', function() {
  var filterButton = document.getElementById('filterButton');
  filterButton.addEventListener('click', filterVideos);
});

function filterVideos() {
  var titleKeywords = ['keyword1', 'keyword2', '...']; // Add your title keywords here
  var descriptionKeywords = ['keyword3', 'keyword4', '...']; // Add your description keywords here

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