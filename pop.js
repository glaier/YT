document.addEventListener('DOMContentLoaded', function () {
    var filterButton = document.getElementById('filterButton');
    filterButton.addEventListener('click', filterVideos);

    var editTitleKeywordsButton = document.getElementById('editTitleKeywords');
    editTitleKeywordsButton.addEventListener('click', editTitleKeywords);

    var editDescriptionKeywordsButton = document.getElementById('editDescriptionKeywords');
    editDescriptionKeywordsButton.addEventListener('click', editDescriptionKeywords);

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

function editTitleKeywords() {
    var newTitleKeywords = prompt('Enter new title keywords (separated by commas):');
    if (newTitleKeywords !== null) {
        titleKeywords = newTitleKeywords.split(',').map(keyword => keyword.trim());
        chrome.storage.sync.set({ 'titleKeywords': titleKeywords });
    }
}

function editDescriptionKeywords() {
    var newDescriptionKeywords = prompt('Enter new description keywords (separated by commas):');
    if (newDescriptionKeywords !== null) {
        descriptionKeywords = newDescriptionKeywords.split(',').map(keyword => keyword.trim());
        chrome.storage.sync.set({ 'descriptionKeywords': descriptionKeywords });
    }
}
