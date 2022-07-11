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
  rank === null
    ? coinRank.insertAdjacentHTML("beforeend", "Unranked")
    : coinRank.insertAdjacentHTML("beforeend", rank);
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
  try {
    const renderResult = async function (blockchain, address) {
      await fetch(
        `https://api.coingecko.com/api/v3/coins/${blockchain}/contract/${address}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Blockchain & coin address do not match");
          }
          return response.json();
        })
        .then((data) => {
          result(
            data.name,
            data.image?.small,
            data.market_cap_rank,
            data.symbol
          );
        });
    };
    renderResult(blockchainOptions.value, addressInput.value);
  } catch (err) {
    console.log(err);
  }
});

resetButton.addEventListener("click", () => {
  addressInput.value = "";
  blockchainOptions.value = "avalanche";
  coinName.classList.add("hidden");
  coinName.textContent = "Token:";
  coinRank.classList.add("hidden");
  coinRank.textContent = "Rank:";
  coinTicker.classList.add("hidden");
  coinTicker.textContent = "Ticker: $";
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
  }, 1000);
})();
