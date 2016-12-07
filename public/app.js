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
    var li = document.createElement('li');
    var a = document.createElement( 'a' );
    var img = document.createElement('img');
    img.src = fullList.albums.items[i].images[0].url;
    a.innerText = fullList.albums.items[i].name + ' by ' + fullList.albums.items[i].artists[0].name;
    a.setAttribute('href', fullList.albums.items[i].external_urls.spotify);
    li.appendChild( a );
    list.append(img);
    list.append(li);
}
}

window.onload = app;

// + ' by ' + fullList.albums.items.artists[i]
