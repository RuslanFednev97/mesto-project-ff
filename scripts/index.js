// @todo: Темплейт карточки
const templateCards = document.querySelector('#card-template').content;
// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list');
// @todo: Функция создания карточки
function createCard(link, name, altText, deleteButton) {
    const cardElement = templateCards.querySelector('.places__item').cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__image').alt = altText;

    const cardDelete = cardElement.querySelector('.card__delete-button');

    cardDelete.addEventListener('click', deleteButton);

    return cardElement;
};

function addCard (cardElement) {
    cardsContainer.append(cardElement);
}


// @todo: Функция удаления карточки

function deleteButton(event) {
    event.target.closest('.places__item').remove();
}
// @todo: Вывести карточки на страницу

function renderCards() {
    initialCards.forEach(function(item) {
        const card = createCard(item.link, item.name, item.altText, deleteButton);
        addCard(card);
    });
  };
  
  // Вызов функции renderCards при загрузке страницы
  document.addEventListener('DOMContentLoaded', renderCards);

