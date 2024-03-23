import { formElementNewCard, popupTypeNewCard, openCard} from "../index.js";
import { closeModal } from "./modal.js";

const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
      altText: "Архыз",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
      altText: "Челябинская область",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
      altText: "Иваново",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
      altText: "Камчатка",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
      altText: "Холмогорский район",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
      altText: "Байкал",
    }
];


function deleteButton(event) {
  event.target.closest('.places__item').remove();//Функция удаления карточки                     //card.js
};

function like(event){
  event.target.classList.toggle('card__like-button_is-active');//Функция лайка карточки          //card.js
};

function handleFormSubmitNewCard(evt) {
  evt.preventDefault(); 
  const placesList = document.querySelector('.places__list');
  const placeNameInput = document.querySelector('form[name="new-place"] input[name="place-name"]');
  const linkInput = document.querySelector('form[name="new-place"] input[name="link"]');

  let placeNameValue = placeNameInput.value;
  let linkValue = linkInput.value;

  const newCard = createCard(linkValue, placeNameValue, placeNameValue, deleteButton, like, openCard);

  placesList.prepend(newCard);

  closeModal(popupTypeNewCard);

  formElementNewCard.reset();
};

function createCard(link, name, altText, deleteButton, like, openCard) {        
  const templateCards = document.querySelector('#card-template').content;                    //card.js
  const cardElement = templateCards.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = link;
  cardElement.querySelector('.card__title').textContent = name;
  cardElement.querySelector('.card__image').alt = altText;

  const cardDelete = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');

  likeButton.addEventListener('click', like);
  cardDelete.addEventListener('click', deleteButton);
  cardImage.addEventListener('click', openCard);
  
  return cardElement;
};


export {initialCards, deleteButton, like, handleFormSubmitNewCard, createCard};