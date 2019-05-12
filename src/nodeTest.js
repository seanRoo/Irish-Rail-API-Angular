
var http = require("http");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
   response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
loadDoc();

function loadDoc() {
  console.log("Executing..");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
      }
      else{
        console.log("Nope");
      }
    };
    xhttp.open("GET", "http://api.irishrail.ie/realtime/realtime.asmx/getCurrentTrainsXML", true);
    xhttp.send();
  }
function myFunction(xml){
  console.log(xml);
}
 