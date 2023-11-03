//currency
const rates = {}; 

const exchangeUAH = document.querySelector('[data-value="UAH"]');
const exchangeUSD = document.querySelector('[data-value="USD"]');
const exchangeEUR = document.querySelector('[data-value="EUR"]');
const exchangeGBP = document.querySelector('[data-value="GBP"]');

const selectCarrency = document.querySelector('#selectCarrency');
const inputRub = document.querySelector('#inputRub');
const resultConvert = document.querySelector('#resultConvert');



async function getCurrencies(){
    const responce = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
     //распаковываем json
    const data = await responce.json(); 
      //достаем js обьект из промиса
    const result = await data;
    console.log(result.Valute.GBP);


    //записываем валюту в обьект из json 
    rates.UAH = result.Valute.UAH;
    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;
    
    exchangeUAH.textContent = "₴ " + rates.UAH.Value.toFixed(2);
    exchangeUSD.textContent = "$ " + rates.USD.Value.toFixed(2);
    exchangeEUR.textContent = "€ " + rates.EUR.Value.toFixed(2);
    exchangeGBP.textContent = "£ " + rates.GBP.Value.toFixed(2);


}
getCurrencies();

inputRub.oninput = convertValue;
selectCarrency.oninput = convertValue;

// функция конвертации
function convertValue(){
  resultConvert.value  = (parseFloat(inputRub.value) / rates[selectCarrency.value].Value).toFixed(2);

}

