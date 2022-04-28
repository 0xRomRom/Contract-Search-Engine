"use strict";

const addressInput = document.querySelector(".address-input");
const searchButton = document.querySelector(".search-button");
const resetButton = document.querySelector(".reset-button");
const blockchainOptions = document.querySelector(".blockchains");
const coinName = document.querySelector(".coin-name");
const coinImage = document.querySelector(".coin-image");
const coinRank = document.querySelector(".coin-rank");
const coinTicker = document.querySelector(".coin-ticker");
const questionMark = document.querySelector(".question-mark");
const questionText = document.querySelector(".question-text");
const outputTitle = document.querySelector(".output-title");

const result = (name, image, rank, ticker) => {
  coinName.insertAdjacentHTML("beforeend", name);
  coinRank.insertAdjacentHTML("beforeend", rank);
  coinTicker.insertAdjacentHTML("beforeend", ticker);
  coinImage.src = image;
  searchButton.disabled = true;
  coinName.classList.remove("hidden");
  coinRank.classList.remove("hidden");
  coinTicker.classList.remove("hidden");
  coinImage.classList.remove("hidden");
  questionMark.classList.add("hidden");
  questionText.classList.add("hidden");
  searchButton.style.cursor = "initial";
  outputTitle.classList.remove("hidden");
};

searchButton.addEventListener("click", () => {
  let value;

  const renderResult = function (blockchain, address) {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${blockchain}/contract/${address}`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        result(data.name, data.image.small, data.market_cap_rank, data.symbol);
      });
  };
  // console.log(blockchainOptions.value);
  value = addressInput.value;
  renderResult(blockchainOptions.value, value);
});

resetButton.addEventListener("click", () => {
  addressInput.value = "";
  blockchainOptions.value = "avalanche";
  coinName.classList.add("hidden");
  coinRank.classList.add("hidden");
  coinTicker.classList.add("hidden");
  coinImage.classList.add("hidden");
  outputTitle.classList.add("hidden");
  questionMark.classList.remove("hidden");
  searchButton.disabled = false;
  searchButton.style.cursor = "pointer";
  questionText.classList.remove("hidden");
});

(function () {
  setInterval(function () {
    const randomNum1 = Math.trunc(Math.random() * 255 + 1);
    const randomNum2 = Math.trunc(Math.random() * 255 + 1);
    const randomNum3 = Math.trunc(Math.random() * 255 + 1);
    questionMark.style.color = `rgb(${randomNum1}, ${randomNum2}, ${randomNum3})`;
    questionMark.style.color = `rgb(${randomNum1}, ${randomNum2}, ${randomNum3})`;
    questionMark.style.color = `rgb(${randomNum1}, ${randomNum2}, ${randomNum3})`;
  }, 1000);
})();
