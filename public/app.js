var app = function(){
  var url = 'https://api.spotify.com/v1/search?q=christmas&type=album';
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.onload = callback;
  request.send();
}

var requestComplete = function() {
  if (this.status !== 200) return;
  var jsonString = this.responseText;
  var fullList = JSON.parse(jsonString);
  var albumList = document.querySelector('#albums');
  albumTitles = populateListOfTitles(albumList, fullList);
};

var populateListOfTitles = function(list, fullList) {
  for (var i = 0; i < fullList.albums.items.length; i++) {
    var listItem = document.createElement('li');
    var listLink = document.createElement( 'a' );
    var imageItem = document.createElement('img');
    imageItem.src = fullList.albums.items[i].images[2].url;
    listLink.innerText = fullList.albums.items[i].name + ' by ' + fullList.albums.items[i].artists[0].name;
    listLink.setAttribute('href', fullList.albums.items[i].external_urls.spotify);
    listItem.appendChild( listLink );
    list.append(listItem);
    list.append(imageItem);
}
}

window.onload = app;

// + ' by ' + fullList.albums.items.artists[i]
