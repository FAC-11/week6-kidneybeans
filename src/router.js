const http = require("http");
const fs = require("fs");
const path = require("path");
const getData = require('./queries/get_data');
const postData = require('./queries/post_data');
const queryString = require('querystring');

const whitelist = {
  "index.html": "text/html",
  "main.css": "text/css",
  // "favicon.ico": "image/x-icon",
  "star.png": "image/png",
  "dom.js": "application/javascript"
};

const router = (request, response) => {
  let [nothing, endpoint, query] = request.url.split("/");
  ///we'll use .split('/')[1] later if query not used

  if (endpoint === "") {
    endpoint = "index.html";
  }
  if (endpoint === "dbrequest") {
    getData((err, dbResp) => {
      //later getData will need to take input
      if (err) return console.log('error from db query', err);
      let fromDb = JSON.stringify(dbResp);

      response.writeHead(200, {
        "content-type": "application/json"
      });
      response.end(fromDb);
    });

  } else {
  if (endpoint === 'create-place') {
    let body = '';
    request.on('data', (chunk) => {
      body += chunk;
    });
    request.on('end', () => {
      let userInput = queryString.parse(body);
      postData(userInput, (err, dbResp) => {
        if (err) {
          console.log(err);
        } else {
          console.log(dbResp);
        }
      });
    });
    endpoint = "index.html";
  }
  console.log(endpoint);
  if (whitelist[endpoint]) {
    const contentType = whitelist[endpoint];
    if (contentType) {
      const filePath = path.join(__dirname, "..", "public", endpoint);

      console.log("looking for local file:", filePath);

      fs.readFile(filePath, (error, file) => {
        // but if there's error handle that first
        if (error) {
          response.writeHead(500, {
            "Content-Type": "text/html"
          });
          response.end("Sorry! We've had a problem!");
        } else {
          // otherwise provide the correct file
          response.writeHead(200, {
            "Content-Type": contentType
          });
          response.end(file);
        }
      });
    }
  } else {
    console.log('this is 404', endpoint);
    response.writeHead(404, {
      "content-type": "text/html"
    });
    response.end("File not found. Gittoutta here!");
  }
}
};

module.exports = router; ///soo wrong!
