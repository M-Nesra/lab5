function loadCurrencies() {
  console.log('Attempting to Load Currencies');
  const fromSelect = document.getElementById('fromCurrency');
  const toSelect = document.getElementById('toCurrency');

  fetch('https://api.frankfurter.app/currencies')
    .then((result) => result.json())
    .then((resultJson) => {
      console.log(resultJson);

      Object.keys(resultJson).forEach((currencyCode) => {
        console.log(`Object: ${JSON.stringify(resultJson[currencyCode])}`);

        const fromOption = document.createElement('option');
        fromOption.innerHTML = resultJson[currencyCode];
        fromOption.value = currencyCode;

        fromSelect.appendChild(fromOption);

        const toOption = document.createElement('option');
        toOption.innerHTML = resultJson[currencyCode];
        toOption.value = currencyCode;

        toSelect.appendChild(toOption);
      });
    });
}

function convertCurrency() {
  console.log('Attempting to Convert Currency');
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = document.getElementById('amount').value;

  if (fromCurrency === toCurrency) {
    alert('You cannot convert to and from the same currency!');
    return;
  }

  
  fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
    .then((result) => result.json())
    .then((resultJson) => {
      console.log(`Response: ${JSON.stringify(resultJson)}`);

      const resultHeading = document.getElementById('result');
      resultHeading.innerHTML = `${amount} ${fromCurrency} is equal to ${resultJson.rates[toCurrency]} ${toCurrency}`;
    });
}

window.onload = function () {
  loadCurrencies();
};
