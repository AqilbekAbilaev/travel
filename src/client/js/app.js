import { generateData } from "./handler";

const addToListBtn = document.querySelector(".add");

// Inputs
const input = () => {
  const city = document.querySelector(".city");
  const startDate = document.querySelector(".start");
  const endDate = document.querySelector(".end");
  const note = document.querySelector(".textarea");

  return {
    city: city.value,
    startDate: startDate.value,
    endDate: endDate.value,
    note: note.value,
  };
};

// Sending data
addToListBtn.addEventListener("click", async () => {
  const inputs = input();
  const response = await generateData(inputs);
  updateUI(response)
  noteLimit()

  let cards = Array.from(document.querySelectorAll('.close-btn'))
    cards.forEach((item) => {
      item.addEventListener("click", () => {
        item.parentNode.parentNode.parentNode.remove()
      })
    })
});

// Limiting note length
const noteLimit = () => {
  const textarea = document.querySelectorAll(".main__travel-card-notes");

  textarea.forEach((item) => {
    let textContent = item.innerHTML.trim().split(' ');
    if (textContent.length > 9) {
      let content = "";
      for (let i = 0; i < 12; i++) {
        content += textContent[i] + " ";
      }
      item.innerHTML = content + "...";
    }
  })
};

// Updating UI elements
const updateUI = async (info) => {
  const main = document.querySelector('.main__travel');
  const card = document.createElement('DIV')
  card.setAttribute("class", "main__travel-card")

  let forecast = document.createElement('DIV');
  forecast.setAttribute('class', 'main__travel-card-forecast')

  for (let i = 2; i < info.data.length; i++) {
    let oneDay = document.createElement('DIV')
    oneDay.setAttribute("class", "one-day")
    oneDay.innerHTML = `
    <div class="first_part">
      <div class="city_image">
        <img src="https://www.weatherbit.io/static/img/icons/${info.data[i].weather.icon}.png" alt="weather-image">
      </div>
      <p class="description">${info.data[i].weather.description}</p>
    </div>
    <div class="second_part">
        <p class="date">${info.data[i].date}</p>
        <p class="temp">Temp:<br> ${info.data[i].max_temp}...${info.data[i].min_temp}C</p>
    </div>
    `
    forecast.appendChild(oneDay)
  }


  card.innerHTML = `
    <div class="main__travel-card-img">
      <img src="${info.data[1]}" alt="country-image">
    </div>

    <div class="main__travel-card-info">
      <div class="main__travel-card-location">
        <img class="plane" src="https://cdn-icons.flaticon.com/png/512/2200/premium/2200326.png?token=exp=1639670152~hmac=b91ee048725a555485b91c0d8965db1c" alt="airplane">
        <p class="main__travel-card-city"> ${input().city}
        <span class="main__travel-card-country">(${info.data[0]})</span></p>
        <img class="plane" src="https://cdn-icons.flaticon.com/png/512/2200/premium/2200326.png?token=exp=1639670152~hmac=b91ee048725a555485b91c0d8965db1c" alt="airplane">
      </div>
      <hr>
      <div class="main__travel-card-text">
        <div class="main__travel-card-note">
          <h2 style="text-align: center;">Note</h2>
            <span class="main__travel-card-notes">
                ${input().note}
            </span> <br>
            </div>
            <img class="close-btn" src="https://cdn-icons-png.flaticon.com/512/753/753345.png" alt="Close btn">
      </div>
      </div>
  `
  card.lastElementChild.lastElementChild.appendChild(forecast)
  main.appendChild(card)
}

export { noteLimit };
