const amount = document.querySelector(["input-el"])
var requestURL = 'https://api.exchangerate.host/latest';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

request.onload = function() {
  var response = request.response;
  console.log(response.rates);
}
 
amount.addEventListener("change", () => {
  amount.value
})
