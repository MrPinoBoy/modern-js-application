import {
  loadingAnimation,
  fetchChar,
  converterToJson,
  searchCard,
  cardDisplayer,
} from "./index.js";

(async () => {
  const loadingElement = document.getElementById("loading");
  const addButton = document.getElementById("btn-character-add");
  const searchBar = document.getElementById("search-bar");
  const cards = document.getElementsByClassName("character-card");
  const characterDatabase = "https://character-database.becode.xyz/characters"; //global

  //const lastmodif = moment();

  loadingAnimation(loadingElement);
  let rawChar = await fetchChar(characterDatabase);
  let jsonChar = await converterToJson(rawChar);
  // characterCardMaker(jsonChar, template, mainHtmlSection);
  loadingAnimation(loadingElement);

  cardDisplayer(jsonChar);

  document.getElementById(
    "displayDate"
  ).innerHTML = `Last updated on : ${localStorage.date}`;

  addButton.addEventListener("click", function () {
    document.location.href = "pages/create.html";
  });

  searchBar.addEventListener("input", () => {
    searchCard(cards, searchBar);
  });
})();
