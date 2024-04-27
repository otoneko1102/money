function convert() {
  var from = document.getElementById("from").value.toUpperCase() || "JPY";
  var to = document.getElementById("to").value.toUpperCase() || "USD";
  var amount = parseFloat(document.getElementById("amount").value) || 1;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(response => response.json())
    .then(data => {
      if (data.rates[to]) {
        var rate = data.rates[to];
        var convertedAmount = amount * rate;
        document.getElementById("result").innerText = `${from}: ${amount} --> ${to}: ${convertedAmount}`;
      } else {
        document.getElementById("result").innerText = "Unknown.";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById("result").innerText = "Error.";
    });
}
