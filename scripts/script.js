//console.log("Hola Mundo")

//
const cards = [
    {
        name: "Bob Millonario",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGSW1_MPTzfULxuQq12kOMOzkpLeMTNLs4Bw&s",
        
    },
    {
        name: "Kenny Pro",
        image: "https://ih1.redbubble.net/image.4988894177.8401/st,small,507x507-pad,600x600,f8f8f8.jpg",
        
    },
    {
        name: "Pepinillo Rick",
        image: "https://wallpapers.com/images/featured/pickle-rick-rh0wcfyj4u556stl.jpg",
        
    },
];


// DOM REFERENCES 
const travelerProfileAddPlaceBtn = document.querySelector(".traveler-profile__add-place-btn");
const modalProfile = document.querySelector("#modal-profile");
const ModalNewPlace = document.querySelector("#modal-new-place");
const modalImageView = document.querySelector("#modal-image-view");

const travelerProfileEditBtn = document.querySelector(".traveler-profile__edit-btn");

const travelerProfileDetails = document.querySelector(".traveler-profile__details");
console.dir(travelerProfileDetails);

const placesGalleryList = document.querySelector(".places-gallery__list");

const travelerProfileName = document.querySelector(".traveler-profile__name");
const travelerProfileBio = document.querySelector(".traveler-profile__bio");
const profileName = document.querySelector("#profile-name");
const profileDescription = document.querySelector("#profile-description");

const modalClose = Array.from(document.querySelectorAll(".modal__close"));
const buttonEdit = document.querySelector("#button-edit");

const createCard = (card) => {
    const templatePlaceCard = 
    document.querySelector("#template-place-card")
    .content.cloneNode(true);

    const placeCardImage = templatePlaceCard.querySelector(".place-card__image");
    const placeCardTitle = templatePlaceCard.querySelector(".place-card__title");


    //this function take all the inputs in a form an then validates the data using the required fields
 const validarBoton = (modalInputs) => {
  return modalInputs.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};
const modalForms = Array.from(document.querySelectorAll(".modal__form"));

modalForms.forEach((modalForm) => {
  const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
  const modalButton = modalForm.querySelector(".modal__button");
  modalButton.disabled = false;
  modalButton.disabled = validarBoton(modalInputs);

  modalInputs.forEach((modalInput) => {
    modalInput.addEventListener("input", () => {
      modalButton.disabled = validarBoton(modalInputs);
      //console.log("Se activa este evento");
      let modalError = modalForm.querySelector("#" + modalInput.id + "-error");
      if (!modalInput.validity.valid) {
        modalError.textContent = "Hay un error";
        modalError.classList.add("modal__error_visible");
      } else {
        modalError.textContent = "";
        modalError.classList.remove("modal__error_visible");
      }
    });
  });
});
   

    placeCardImage.src = card.image ;
    placeCardImage.alt = card.description;
    placeCardTitle.textContent = card.name;

    placeCardImage.addEventListener("click", () => {
        modalImageView.classList.toggle("modal_is-opened");
        const modalImage = modalImageView.querySelector(".modal__image");
        const modalCaption = modalImageView.querySelector(".modal__caption");
        modalImage.src = placeCardImage.src;
        modalImage.alt = placeCardImage.alt;
        modalCaption.textContent = placeCardTitle.textContent; 
    });

    const placeCardDeleteButton = templatePlaceCard.querySelector(
        ".place-card__delete-button"
    );

    placeCardDeleteButton.addEventListener("click", (evt) => {
        console.log(evt);
        evt.target.closest(".place-card").remove();
    });

    const placeCardLikeButton = templatePlaceCard.querySelector(
        ".place-card__like-button"
    );

    placeCardLikeButton.addEventListener("click", () =>{
        console.log("Me encorazona");
        placeCardLikeButton.classList.toggle("place-card__like-button_is-active");
    });

    placesGalleryList.appendChild(templatePlaceCard);
}

// Open modal Edit Profile
travelerProfileEditBtn.addEventListener("click", (evt) => {
    console.log("Click en el lapiz");
    profileName.value = travelerProfileName.textContent;
    profileDescription.value = travelerProfileBio.textContent;
    modalProfile.classList.toggle("modal_is-opened");
});

// Open modal New Card
travelerProfileAddPlaceBtn.addEventListener("click", () => {
    ModalNewPlace.classList.toggle("modal_is-opened");
});

modalProfile.addEventListener("submit", (evt) => {
    evt.preventDefault();
    travelerProfileName.textContent = profileName.value;
    travelerProfileBio.textContent = profileDescription.value;
    modalProfile.classList.toggle("modal_is-opened");
});

console.log("Arreglo de modals: ", modalClose);
modalClose.forEach((modalClose) => {
    modalClose.addEventListener("click", (evt) => {
        console.log("modal");
        let modal = evt.target.closest(".modal");
        modal.classList.toggle("modal_is-opened");
    });
});

ModalNewPlace.addEventListener("submit", (evt) => {
    const tempCard = {};
    evt.preventDefault();
    const modalForm = ModalNewPlace.querySelector(".modal__form");
    const modalInputs = Array.from(modalForm.querySelectorAll(".modal__input"));
    modalInputs.forEach((modalInput) => {
        console.log(modalInput.value);
        tempCard[modalInput.name] = modalInput.value;
    });
    console.log(tempCard);
    createCard(tempCard);
    ModalNewPlace.classList.remove("modal_is-opened"); // Close modal after create 
});
                                                         
cards.forEach((card) => {
    createCard(card);
});


