import { apiDeleteCard, putLike, removeLike } from "./api.js";
import { openPopup } from "./modal";
import { cardState } from "../index.js";

//Функция удаления карточки
function deleteCard(cardId) {
  // Находим карточку по cardId или другому уникальному идентификатору
  const cardElement = document.querySelector(`.places__item[data-card-id="${cardId}"]`);
  if (cardElement) {
    apiDeleteCard(cardId)
      .then(() => {
        cardElement.remove(); // Удаление элемента карточки
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.error("Card element not found");
  }
}

//Функция лайка карточки
const performActionLike = (like, cardId) => {
  const cardLikeCount = like.closest('.places__item').querySelector('.card__like-count'); 
  const likeMethod = like.classList.contains('card__like-button_is-active') ? removeLike : putLike
  likeMethod(cardId)
  .then(res => {
    cardLikeCount.textContent = res.likes.length
    like.classList.toggle('card__like-button_is-active')
  })
  .catch((err) => {
    console.log(err);
  })
}

//Функция проверки карточки (моя или нет)
function checkDeleteCard(deleteButton, ownerId, userId, popupDelete, cardId) {
  if (ownerId === userId) {
    deleteButton.addEventListener('click', () => {
      openPopup(popupDelete);
      cardState.currentCardId = cardId; // Обновляем ID карточки при каждом вызове попапа
          });
  } else {
    deleteButton.classList.add('card__delete-button-unactive');
  }
}

//Функция добавления карточек из сервера
function createCard(link, name, altText, likes, performActionLike, openCard, ownerId, userId, cardId, cardLikes) {        
  const templateCards = document.querySelector('#card-template').content;
  const cardElement = templateCards.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeCount = cardElement.querySelector('.card__like-count');
  const popupDelete = document.querySelector('.popup__delete');

  cardImage.src = link;
  cardElement.querySelector('.card__title').textContent = name;
  cardImage.alt = altText;
  cardLikeCount.textContent = likes;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const isLiked = cardLikes.some(likes => likes._id === userId); 
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
   
  cardElement.setAttribute('data-card-id', cardId);
  likeButton.addEventListener('click', () => performActionLike(likeButton, cardId));
  cardImage.addEventListener('click', openCard);
  checkDeleteCard(cardDeleteButton, ownerId, userId, popupDelete, cardId);
  
  return cardElement;
};

export {deleteCard, performActionLike, createCard};