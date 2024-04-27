function convert() {
  const from = document.getElementById("from").value.toUpperCase() || "JPY";
  const to = document.getElementById("to").value.toUpperCase() || "USD";
  const amount = parseFloat(document.getElementById("amount").value) || 1;

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        const html = xhr.responseText;
        const startIndex = html.indexOf(`data-source="${from}" data-target="${to}" data-last-price="`) + `data-source="${from}" data-target="${to}" data-last-price="`.length;
        const endIndex = html.indexOf('"', startIndex);
        const rate = parseFloat(html.substring(startIndex, endIndex));
        if (!isNaN(rate)) {
          const convertedAmount = (amount * rate).toFixed(5);
          document.getElementById("result").innerText = `${from}: ${amount} --> ${to}: ${convertedAmount}`;
        } else {
          document.getElementById("result").innerText = "Error: Unable to retrieve exchange rate.";
        }
      } else {
        console.error('Error:', xhr.status);
        document.getElementById("result").innerText = "Error: Unable to fetch data.";
      }
    }
  };

  xhr.open("GET", `https://www.google.com/finance/quote/${from}-${to}`, true);
  xhr.send();
}
