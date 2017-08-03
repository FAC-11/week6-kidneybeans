function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText)
    } else {
      cb('error', xhr.responseType);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

//start of rendering our data to the Dom;
var errorResult = document.getElementById('places-error');
var table = document.getElementById('places-table');

function renderError(message){
  var errorDiv = document.createElement('div');
  var errorMessage = document.createTextNode(message);
  errorDiv.appendChild(errorMessage);
  errorResult.appendChild(errorDiv);
}

function updateDom(err, data) {
  if (err) {
    renderError('We are really sorry, something seems to be wrong');
  } else {
    var places = JSON.parse(data);
    places.forEach(function(place) {
      var row = document.createElement('tr');
      //now we create the column for our name data;
      var name = document.createElement('td');
      name.innerHTML = place.name;
      row.appendChild(name);
      //now we create the column for our location data;
      var location = document.createElement('td');
      location.innerHTML = place.location;
      row.appendChild(location);
      //now we add both columns to our table by appending the row;
      table.appendChild(row);
    });
  }
}

request('/dbrequest', updateDom);
