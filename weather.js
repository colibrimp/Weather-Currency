// weather

const apiKey = "d2b4d5c03b64477a903200609230204";

// получаем название города
const header = document.querySelector(".weather");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

// удаление предыдущей карточки
function removeCard() {
  const prevCard = document.querySelector(".card_form");
  if (prevCard) prevCard.remove();
}

//show error
function showError(errorMessage) {
  const html = `<div class="card card_form">${errorMessage}</div>`;

  header.insertAdjacentHTML("afterend", html);

}

function showCard({ imgIcon, name, country, temp, condition, wind, lastUpdated }) {
  //Разметка для карточки
  let newDate = new Date();
  const html = `<div class="card card_form mb-3" style="max-width: 540px;">

    <div class="row card_row">

      <div class="col-md-5 imgIcon">
        <img src="${imgIcon}" class="img-fluid rounded-start" alt="...">
      </div>

      <div class="col-md-7 card_text">
        <div class="card-body">
          <h4 class="card-title">${name} <span>${country}</span></h4>
          <h4 class="card-title">${temp}&deg;</h4>
          <p class="card-text">${condition}</p>
          <p class="card-text">Wind: ${wind}</p>
          <p class="card-text">Weather updated date: </br> ${newDate.toUTCString(lastUpdated)}</p>
        </div>
      </div>

    </div>
    </div>`;

  header.insertAdjacentHTML("afterend", html);
  //вставить разметку html после дива с классом weather
}

async function getWeather(city) {
  // делаем запрос на сервер для получ погоды
  const url = ` http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  //  console.log(data.location.name);
  //  console.log(data.location.country);
  //  console.log(data.current.temp_c);
  //  console.log(data.current.condition.text);

  return data;
}

form.onclick = async function (event) {
  event.preventDefault(); 
  //отменяет отправку формы

  let city = input.value.trim();
  // console.log(city);

   //получаем данные с сервера
  const data = await getWeather(city);

  //проверка на ошибку
  if (data.error) {

      removeCard();
      showError(data.error.message);

  } else {

      removeCard();

    const weatherData = {
      imgIcon: data.current.condition.icon,
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
      wind: data.current.wind_mph,
      lastUpdated: data.current.last_updated
    };

    showCard(weatherData);
    
  }
};

