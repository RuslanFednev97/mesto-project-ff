//Функция удаления карточки
function deleteCard(event) {
  event.target.closest('.places__item').remove();
};

//Функция лайка карточки
function like(event){
  event.target.classList.toggle('card__like-button_is-active');
};

//Функция добавления карточек из массива
function createCard(link, name, altText, deleteCard, like, openCard) {        
  const templateCards = document.querySelector('#card-template').content;
  const cardElement = templateCards.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');

  cardImage.src = link;
  cardElement.querySelector('.card__title').textContent = name;
  cardImage.alt = altText;

  const cardDelete = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  likeButton.addEventListener('click', like);
  cardDelete.addEventListener('click', deleteCard);
  cardImage.addEventListener('click', openCard);
  
  return cardElement;
};

export {deleteCard, like, createCard};