import {
  converterToJson,
  fetchChar,
  informationPlacer,
  deleteCharacter,
} from "./index.js";

(async () => {
  const img = document.getElementById("character-img");
  const name = document.getElementById("character-name");
  const smallDescription = document.getElementById(
    "character-small-description"
  );
  const longDescription = document.getElementById("character-long-description");
  const idSplitter = window.location.hash.split("#");
  const currentId = idSplitter[1]; // on va chercher une information dans l'url, à partir du #, et split sert à se débarasser du #
  const deleteButton = document.getElementById("button-character-delete");
  const updateButton = document.getElementById("button-character-update");
  const database = `https://character-database.becode.xyz/characters/${currentId}`;

  let rawChar = await fetchChar(database);
  let character = await converterToJson(rawChar);
  informationPlacer(img, name, smallDescription, longDescription, character);

  deleteButton.addEventListener("click", async () => {
    if (
      confirm(`Are you sure you want to delete ${name.innerHTML} forever ?`)
    ) {
      await deleteCharacter(currentId, name.innerHTML);
      document.location.href = "../index.html";
    }
  });

  updateButton.addEventListener("click", () => {
    document.location.href = `update.html#${currentId}`;
  });
})();
