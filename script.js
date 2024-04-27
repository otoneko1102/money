function convert() {
  var from = document.getElementById("from").value.toUpperCase();
  var to = document.getElementById("to").value.toUpperCase();
  var amount = parseFloat(document.getElementById("amount").value) || 1;

  fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
    .then(response => response.json())
    .then(data => {
      if (data.rates[to]) {
        var rate = data.rates[to];
        var convertedAmount = amount * rate;
        document.getElementById("result").innerText = `${amount} ${from} は ${convertedAmount.toFixed(2)} ${to} です。`;
      } else {
        document.getElementById("result").innerText = "無効な通貨コードです。";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById("result").innerText = "エラーが発生しました。";
    });
}
