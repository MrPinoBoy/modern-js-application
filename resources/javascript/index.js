export const loadingAnimation = (loadingAnimationElement) => {
  if (document.readyState === "complete") {
    loadingAnimationElement.style.display = "none";
  }
};

export const fetchChar = async (databaseToFetch) => {
  //on crée une fonction async (pour pouvoir utiliser await)
  return await fetch(databaseToFetch); // on va chercher les données et on utilise await parce que fetch prend plus de temps pour télécharger qu'il n'en faut au code pour passer a la ligne suivante
};

export const converterToJson = async (rawChar) => {
  return await rawChar.json(); //on convertit les données en un objet json et encore une fois on utilise await car la conversion prend plus de temps
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

export const readImage = async (file) => {
  // Check if the file is an image.
  if (file.type && !file.type.startsWith("image/")) {
    console.log("File is not an image.", file.type, file);
    return;
  }

  const reader = new FileReader(); //lis le contenu d'un fichier
  reader.addEventListener("load", () => {
    const imageDataUrl = reader.result;
    preview.src = imageDataUrl;
    previewText.style.opacity = 0;
    const imageUrlSeparator = imageDataUrl.split(",");
    newCharacter.image = imageUrlSeparator[1];
  });
  reader.readAsDataURL(file);
};

export const newCharInfoInputer = () => {
  newCharacter.name = newName.value;
  newCharacter.shortDescription = newSmallDescription.value;
  newCharacter.description = newLongDescription.children[0].textContent;
};

export const postNewData = async () => {
  await fetch("https://character-database.becode.xyz/characters", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: null,
      name: newCharacter.name,
      shortDescription: newCharacter.shortDescription,
      description: newCharacter.description,
      image: newCharacter.image,
    }),
  });
};

function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

export const retrievedInfoDisplayer = () => {
  updatedName.value = currentCharacter.name;
  updatedSmallDescription.value = currentCharacter.shortDescription;
  updatedLongDescription.children[0].textContent = currentCharacter.description;
  preview.src = `data:image/jpeg;base64,${currentCharacter.image}`;
  updatedCharacter.image = currentCharacter.image;
};

export const postUpdatedData = async (characterId) => {
  await fetch(
    `https://character-database.becode.xyz/characters/${characterId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: updatedCharacter.name,
        shortDescription: updatedCharacter.shortDescription,
        description: updatedCharacter.description,
        image: updatedCharacter.image,
      }),
    }
  );
};

export const updatedCharInfoInputer = () => {
  updatedCharacter.name = updatedName.value;
  updatedCharacter.shortDescription = updatedSmallDescription.value;
  updatedCharacter.description = updatedLongDescription.children[0].textContent;
};
