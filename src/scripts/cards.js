import { apiDeleteCard, putLike, removeLike } from "./api.js";

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

//Функция добавления карточек из сервера
function createCard(card, performActionLike, openCard, handleCardDeleteRequest, userId) {        
  const templateCards = document.querySelector('#card-template').content;
  const cardElement = templateCards.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardLikeCount = cardElement.querySelector('.card__like-count');

  cardImage.src = card.link;
  cardElement.querySelector('.card__title').textContent = card.name;
  cardImage.alt = card.name;
  cardLikeCount.textContent = card.likes.length;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const isLiked = card.likes.some(likes => likes._id === userId); 
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
   
  cardElement.setAttribute('data-card-id', card._id);
  likeButton.addEventListener('click', () => performActionLike(likeButton, card._id));
  cardImage.addEventListener('click', openCard);

  if(card.owner._id === userId)
    {
      cardDeleteButton.addEventListener('click', () => handleCardDeleteRequest(card._id, cardElement));
    } else {
      cardDeleteButton.classList.add('card__delete-button-unactive');
    }
  

  return cardElement;
};

export {deleteCard, performActionLike, createCard};