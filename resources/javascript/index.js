import "regenerator-runtime/runtime";
const updatedName = document.getElementById("update-character-name");
const updatedSmallDescription = document.getElementById(
  "update-character-small-description"
);
const updatedLongDescription = document.getElementById(
  "update-character-long-description"
);
const template = document.getElementById("tpl-character");
const mainHtmlSection = document.getElementById("target");
const preview = document.getElementById("character-image-preview");
export const loadingAnimation = (loadingAnimationElement) => {
  if (document.readyState === "complete") {
    loadingAnimationElement.style.display = "none";
  }
};
export const bonjour = "bonjour";
export const fetchChar = async (databaseToFetch) => {
  //on crée une fonction async (pour pouvoir utiliser await)
  return await fetch(databaseToFetch); // on va chercher les données et on utilise await parce que fetch prend plus de temps pour télécharger qu'il n'en faut au code pour passer a la ligne suivante
};

export const converterToJson = async (rawChar) => {
  return await rawChar.json(); //on convertit les données en un objet json et encore une fois on utilise await car la conversion prend plus de temps
};

export const cardDisplayer = async (characters) => {
  await characters.forEach((character) => {
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
};
// export const templateCloner = (template) => {
//   return [
//     clone,
//     documentName,
//     documentShortDescription,
//     documentImage,
//     documentForm,
//   ];
// };

// export const informationIntoHtml = (character) => {
//   documentName.innerHTML = character.name;
//   documentShortDescription.innerHTML = character.shortDescription;
//   documentImage.setAttribute(
//     "src",
//     `data:image/jpeg;base64,${character.image}`
//   ); //on définit l'attribut "src" de l'image en ajoutant "data:image/jpeg;base64," (qui permet d'afficher l'url fourni dans l'objet) suivi de l'url fourni dans l'objet (data[0].image)
//   documentForm.setAttribute("action", `pages/single.html#${character.id}`); //l'url du lien contient l'id du personnage arpès un #, pour qu'on puisse aller le rechercer sur la page single
// };

// export const characterCardMaker = async (charactersObject, containingDiv) => {
//   await charactersObject.forEach((character) => {
//     let clone = template.content.cloneNode(true);
//     let documentName = clone.getElementById("character-name");
//     let documentShortDescription = clone.getElementById(
//       "character-small-description"
//     );
//     let documentImage = clone.getElementById("character-img");
//     let documentForm = clone.getElementById("formGet");
//     informationIntoHtml(character);
//     containingDiv.appendChild(clone);
//   });
// };

export const searchCard = (allCards, searchBar) => {
  //we hide a card if its name and id doesn't correspond to the search parameter
  for (let card of allCards) {
    let seeCharacterButton = card.children[1]; //whatever contains the id in the card
    let cardIdLong = seeCharacterButton.getAttribute("action").split("#");
    let cardId = cardIdLong[1]; //cardIdLong is an array, the id is at index = 1
    let characterName = card.children[0].children[1].innerHTML; //whatever contains the name in the card
    if (
      !characterName.toLowerCase().includes(searchBar.value.toLowerCase()) &&
      !cardId.toLowerCase().includes(searchBar.value.toLowerCase())
    ) {
      card.style.display = "none";
    } else {
      card.style.display = "flex";
    }
  }
};

export const informationPlacer = (
  targetImage,
  targetName,
  targetSmallDesc,
  targetLongDesc,
  characterInfos
) => {
  targetImage.setAttribute(
    "src",
    `data:image/jpeg;base64,${characterInfos.image}`
  ); // pour les img il faut changer la src d'où setAttribute, `data:image/jpeg;base64,${data.image}` convertir un url de données en images
  targetName.innerHTML = characterInfos.name;
  targetSmallDesc.innerHTML = characterInfos.shortDescription;
  targetLongDesc.innerHTML = characterInfos.description;
};

export const deleteCharacter = async (characterId, characterName) => {
  await fetch(
    `https://character-database.becode.xyz/characters/${characterId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  alert(`${characterName} has been deleted`);
};

export const readImage = async (file, character) => {
  // Check if the file is an image.
  if (file.type && !file.type.startsWith("image/")) {
    console.log("File is not an image.", file.type, file);
    return;
  }

  const preview = document.getElementById("character-image-preview");
  const previewText = document.getElementById("preview-text");
  const reader = new FileReader(); //lis le contenu d'un fichier
  reader.addEventListener("load", () => {
    const imageDataUrl = reader.result;
    preview.src = imageDataUrl;
    previewText.style.opacity = 0;
    const imageUrlSeparator = imageDataUrl.split(",");
    character.image = imageUrlSeparator[1];
  });
  reader.readAsDataURL(file);
};

export const newCharInfoInputer = (character) => {
  const newName = document.getElementById("input-character-name");
  const newSmallDescription = document.getElementById(
    "input-character-small-description"
  );
  const newLongDescription = document.getElementById(
    "input-character-long-description"
  );
  character.name = newName.value;
  character.shortDescription = newSmallDescription.value;
  character.description = newLongDescription.children[0].textContent;
};

export const postNewData = async (character) => {
  await fetch("https://character-database.becode.xyz/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: null,
      name: character.name,
      shortDescription: character.shortDescription,
      description: character.description,
      image: character.image,
    }),
  });
};

export function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

export const retrievedInfoDisplayer = (character, updatedCharacter) => {
  updatedName.value = character.name;
  updatedSmallDescription.value = character.shortDescription;
  updatedLongDescription.children[0].textContent = character.description;
  preview.src = `data:image/jpeg;base64,${character.image}`;
  updatedCharacter.image = character.image;
};

export const postUpdatedData = async (characterId, character) => {
  await fetch(
    `https://character-database.becode.xyz/characters/${characterId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: character.name,
        shortDescription: character.shortDescription,
        description: character.description,
        image: character.image,
      }),
    }
  );
};

export const updatedCharInfoInputer = (character) => {
  character.name = updatedName.value;
  character.shortDescription = updatedSmallDescription.value;
  character.description = updatedLongDescription.children[0].textContent;
};

export const letterCounter = (targetDisplayer, targetTextInput) => {
  targetDisplayer.innerHTML = `${targetTextInput.value.length} on max ${targetTextInput.maxLength} char.`;
};
