function convert() {
  const from = document.getElementById("from").value.toUpperCase() || "JPY";
  const to = document.getElementById("to").value.toUpperCase() || "USD";
  const amount = parseFloat(document.getElementById("amount").value) || 1;

  axios.get(`https://www.google.com/finance/quote/${from}-${to}`)
    .then(response => {
      const html = response.data;
      const startIndex = html.indexOf(`data-source="${from}" data-target="${to}" data-last-price="`) + `data-source="${from}" data-target="${to}" data-last-price="`.length;
      const endIndex = html.indexOf('"', startIndex);
      const rate = parseFloat(html.substring(startIndex, endIndex));
      if (!isNaN(rate)) {
        const convertedAmount = (amount * rate).toFixed(5);
        document.getElementById("result").innerText = `${from}: ${amount} --> ${to}: ${convertedAmount}`;
      } else {
        document.getElementById("result").innerText = "Error: Unable to retrieve exchange rate.";
      }
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById("result").innerText = "Error: Unable to fetch data.";
    });
}
