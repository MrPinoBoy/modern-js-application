import {
  readImage,
  letterCounter,
  postNewData,
  newCharInfoInputer,
} from "./index.js";
import moment from "moment";

(async () => {
  const allInputs = document.querySelectorAll("input");
  const newImage = document.getElementById("character-image-upload");
  const newName = document.getElementById("input-character-name");
  const newSmallDescription = document.getElementById(
    "input-character-small-description"
  );
  const newLongDescription = document.getElementById(
    "input-character-long-description"
  );

  const saveNewCharacter = document.getElementById("button-save");
  const cancelNewCharacter = document.getElementById("button-delete");
  const maxCharacterNameDisplay = document.getElementById("max-character-name");
  const maxCharacterSmallDescriptionDisplay = document.getElementById(
    "max-character-small-description"
  );
  const maxCharacterLongDescriptionDisplay = document.getElementById(
    "max-character-long-description"
  );
  const imageUploader = document.getElementById("image-input-container");
  const imageUploaderText = document.getElementById(
    "image-input-container-text"
  );
  const newCharacter = new Object();

  allInputs.forEach((element) => (element.value = "")); //on vide tous les inputs

  // const letterCounter = (targetDisplayer, targetTextInput) => {
  //   targetDisplayer.innerHTML = `${targetTextInput.value.length} on max ${targetTextInput.maxLength} char.`;
  // };

  // const readImage = async (file) => {
  //   // Check if the file is an image.
  //   if (file.type && !file.type.startsWith("image/")) {
  //     console.log("File is not an image.", file.type, file);
  //     return;
  //   }

  //   const reader = new FileReader(); //lis le contenu d'un fichier
  //   reader.addEventListener("load", () => {
  //     const imageDataUrl = reader.result;
  //     preview.src = imageDataUrl;
  //     previewText.style.opacity = 0;
  //     const imageUrlSeparator = imageDataUrl.split(",");
  //     newCharacter.image = imageUrlSeparator[1];
  //   });
  //   reader.readAsDataURL(file);
  // };

  // const newCharInfoInputer = () => {
  //   newCharacter.name = newName.value;
  //   newCharacter.shortDescription = newSmallDescription.value;
  //   newCharacter.description = newLongDescription.children[0].textContent;
  // };

  // const postNewData = async () => {
  //   await fetch("https://character-database.becode.xyz/characters", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       id: null,
  //       name: newCharacter.name,
  //       shortDescription: newCharacter.shortDescription,
  //       description: newCharacter.description,
  //       image: newCharacter.image,
  //     }),
  //   });
  // };

  imageUploader.addEventListener("click", () => {
    document.getElementById("character-image-upload").click();
  });

  imageUploaderText.addEventListener("click", () => {
    document.getElementById("character-image-upload").click();
  });

  newImage.addEventListener("change", async function (event) {
    let file = event.target.files; //on va chercher le fichier qu'on a input qui est enregistré comme une array
    await readImage(file[0], newCharacter); //on utilise le fichier dans la fonction
  });

  letterCounter(maxCharacterNameDisplay, newName);

  newName.addEventListener("input", () => {
    letterCounter(maxCharacterNameDisplay, newName);
  });

  letterCounter(maxCharacterSmallDescriptionDisplay, newSmallDescription);

  newSmallDescription.addEventListener("input", () => {
    letterCounter(maxCharacterSmallDescriptionDisplay, newSmallDescription);
  });

  maxCharacterLongDescriptionDisplay.innerHTML = `0 on max 350 char.`;

  newLongDescription.addEventListener("input", () => {
    maxCharacterLongDescriptionDisplay.innerHTML = `${newLongDescription.children[0].textContent.length} on max 350 char.`;
  });

  saveNewCharacter.addEventListener("click", async () => {
    if (
      newName.value != "" &&
      newSmallDescription.value != "" &&
      newLongDescription.value != "" &&
      newImage.value != ""
    ) {
      localStorage.clear();
      localStorage.date = moment();
      newCharInfoInputer(newCharacter);
      await postNewData(newCharacter);
      document.location.href = "../index.html";
    } else {
      alert("erreur");
    }
  });

  cancelNewCharacter.addEventListener("click", function () {
    document.location.href = "../index.html";
  });
})();
