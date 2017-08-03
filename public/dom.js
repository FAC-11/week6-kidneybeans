function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        cb(null, xhr.responseText);
console.log ('SUCCESS!');
      }
      else {
        // console.log  (xhr.readyState, xhr.status );
        cb(xhr.status, xhr.responseType);
      }
    }
  };

  xhr.open('GET', url, true);
  xhr.send();
}

//start of rendering our data to the Dom;
var errorResult = document.getElementById('places-error');
var table = document.getElementById('places-table');

function renderError(message) {
  var errorDiv = document.createElement('div');
  var errorMessage = document.createTextNode(message);
  errorDiv.appendChild(errorMessage);
  errorResult.appendChild(errorDiv);
}

function updateDom(err, data) {
  if (err) {
    renderError('We are really sorry, something seems to be wrong', err);
  } else {
    var places = JSON.parse(data);
    places.forEach(function(place) {
      var row = document.createElement('tr');
      var name = document.createElement('td');
      name.innerHTML = place.name;
      row.appendChild(name);

      var location = document.createElement('td');
      location.innerHTML = place.location;
      row.appendChild(location);

      var review = document.createElement('td');
      review.innerHTML = place.review || 'No reviews - why not add one! (in a future version)';
      row.appendChild(review);

      var stars = document.createElement('td');
      var i = place.stars;
      while (i--){
        var image = document.createElement ('img');
        image.src = "star.png";
        image.setAttribute ('class', "star");
        stars.appendChild(image);
      }
      row.appendChild(stars);
      //now we add the columns to our table by appending the row;
      table.appendChild(row);
    });
  }
}

request('/dbrequest', updateDom);
