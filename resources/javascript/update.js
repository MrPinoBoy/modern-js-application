(async () => {
  const updatedImage = document.getElementById("character-image-update");
  const preview = document.getElementById("character-image-preview");
  const updatedName = document.getElementById("update-character-name");
  const updatedSmallDescription = document.getElementById(
    "update-character-small-description"
  );
  const updatedLongDescription = document.getElementById(
    "update-character-long-description"
  );
  const saveUpdatedCharacter = document.getElementById("button-save");
  const deleteCurrentCharacter = document.getElementById("button-delete");
  const imageUploader = document.getElementById("image-input-container");
  const imageUploaderText = document.getElementById(
    "image-input-container-text"
  );
  const maxCharacterNameDisplay = document.getElementById("max-character-name");
  const maxCharacterSmallDescriptionDisplay = document.getElementById(
    "max-character-small-description"
  );
  const maxCharacterLongDescriptionDisplay = document.getElementById(
    "max-character-long-description"
  );
  const updatedCharacter = new Object();
  const currentId = window.location.hash.split("#");
  const textAreas = document.querySelectorAll("textarea");

  const fetcher = async () => {
    const rawData = await fetch(
      `https://character-database.becode.xyz/characters/${currentId[1]}`
    );
    return (currentCharacter = await rawData.json());
  };
  await fetcher();

  textAreas.forEach((textArea) => {
    textArea.addEventListener("input", autoResize, false);
  });

  function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  const retrievedInfoDisplayer = () => {
    updatedName.value = currentCharacter.name;
    updatedSmallDescription.value = currentCharacter.shortDescription;
    updatedLongDescription.children[0].textContent =
      currentCharacter.description;
    preview.src = `data:image/jpeg;base64,${currentCharacter.image}`;
    updatedCharacter.image = currentCharacter.image;
  };

  const postUpdatedData = async (characterId) => {
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

  const updatedCharInfoInputer = () => {
    updatedCharacter.name = updatedName.value;
    updatedCharacter.shortDescription = updatedSmallDescription.value;
    updatedCharacter.description =
      updatedLongDescription.children[0].textContent;
  };

  const readImage = async (file) => {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith("image/")) {
      console.log("File is not an image.", file.type, file);
      return;
    }
    const reader = new FileReader(); //lis le contenu d'un fichier
    reader.addEventListener("load", () => {
      //l'event se lance après la ligne 16
      const imageDataUrl = reader.result; //result donne le résultat de la ligne 16
      preview.src = imageDataUrl; //on remplace la source par l'url
      const imageUrlSeparator = imageDataUrl.split(",");
      updatedCharacter.image = imageUrlSeparator[1];
    }); //transforme le fichier en data url
    reader.readAsDataURL(file);
  };

  retrievedInfoDisplayer();

  imageUploader.addEventListener("click", () => {
    document.getElementById("character-image-update").click();
  });

  imageUploaderText.addEventListener("click", () => {
    document.getElementById("character-image-update").click();
  });

  updatedImage.addEventListener("change", async function (event) {
    let file = event.target.files; //on va chercher le fichier qu'on a input qui est enregistré comme une array
    await readImage(file[0]); //on utilise le fichier dans la fonction
  });

  maxCharacterNameDisplay.innerHTML = `${updatedName.value.length} on max ${updatedName.maxLength} char.`;

  updatedName.addEventListener("input", () => {
    maxCharacterNameDisplay.innerHTML = `${updatedName.value.length} on max ${updatedName.maxLength} char.`;
  });

  maxCharacterSmallDescriptionDisplay.innerHTML = `${updatedSmallDescription.value.length} on max ${updatedSmallDescription.maxLength} char.`;

  updatedSmallDescription.addEventListener("input", () => {
    maxCharacterSmallDescriptionDisplay.innerHTML = `${updatedSmallDescription.value.length} on max ${updatedSmallDescription.maxLength} char.`;
  });

  maxCharacterLongDescriptionDisplay.innerHTML = `${updatedLongDescription.children[0].textContent} on max ${updatedLongDescription.maxLength} char.`;

  updatedLongDescription.addEventListener("input", () => {
    maxCharacterLongDescriptionDisplay.innerHTML = `${updatedLongDescription.children[0].textContent} on max ${updatedLongDescription.maxLength} char.`;
  });

  saveUpdatedCharacter.addEventListener("click", async () => {
    if (
      updatedName.value != "" &&
      updatedSmallDescription.value != "" &&
      updatedLongDescription.value != ""
    ) {
      updatedCharInfoInputer();
      await postUpdatedData(currentId[1]);
      document.location.href = "/index.html";
    } else {
      alert("erreur");
    }
  });

  deleteCurrentCharacter.addEventListener("click", function () {
    document.location.href = "/index.html";
  });
})();
