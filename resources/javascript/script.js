import {
  loadingAnimation,
  fetchChar,
  converterToJson,
  searchCard,
} from "./index.js";

(async () => {
  const loadingElement = document.getElementById("loading");
  const addButton = document.getElementById("btn-character-add");
  const searchBar = document.getElementById("search-bar");
  const cards = document.getElementsByClassName("character-card");
  const template = document.getElementById("tpl-character");
  const mainHtmlSection = document.getElementById("target");
  const characterDatabase = "https://character-database.becode.xyz/characters"; //global

  loadingAnimation(loadingElement);
  let rawChar = await fetchChar(characterDatabase);
  let jsonChar = await converterToJson(rawChar);
  // characterCardMaker(jsonChar, template, mainHtmlSection);
  loadingAnimation(loadingElement);

  await jsonChar.forEach((character) => {
    const clone = template.content.cloneNode(true);
    const documentName = clone.getElementById("character-name");
    const documentShortDescription = clone.getElementById(
      "character-small-description"
    );
    const documentImage = clone.getElementById("character-img");
    const documentForm = clone.getElementById("formGet");
    documentName.innerHTML = character.name;
    documentShortDescription.innerHTML = character.shortDescription;
    documentImage.setAttribute(
      "src",
      `data:image/jpeg;base64,${character.image}`
    ); //on définit l'attribut "src" de l'image en ajoutant "data:image/jpeg;base64," (qui permet d'afficher l'url fourni dans l'objet) suivi de l'url fourni dans l'objet (data[0].image)
    documentForm.setAttribute("action", `pages/single.html#${character.id}`); //l'url du lien contient l'id du personnage arpès un #, pour qu'on puisse aller le rechercer sur la page single
    mainHtmlSection.appendChild(clone);
  });

  addButton.addEventListener("click", function () {
    document.location.href = "pages/create.html";
  });

  searchBar.addEventListener("input", () => {
    searchCard(cards, searchBar);
  });
})();
