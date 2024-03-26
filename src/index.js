import './pages/index.css';
import {deleteCard, like, createCard} from './scripts/cards';
import {popupOpen, popupClose} from './scripts/modal';
import { initialCards } from './scripts/initialCards';

//Переменные
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileCloseButton = document.querySelector('.popup__close');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const cardsCloseButton = popupTypeNewCard.querySelector('.popup__close');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const imageCloseButton = popupTypeImage.querySelector('.popup__close');
const cardsForm = document.forms["new-place"];
const cardsContainer = document.querySelector('.places__list');
const profileForm = document.forms["edit-profile"];
const nameInput = document.forms['edit-profile'].elements.name;
const jobInput = document.forms['edit-profile'].elements.description;
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupCaption = document.querySelector('.popup__caption');

//Функция объявления карточки
function addCard (cardElement) {
    cardsContainer.append(cardElement);
};

//Функция открытия карточки
function openCard(event) { 
    const imageUrl = event.target.src;
    const altText = event.target.alt;
    const card = event.target.closest('.card');
    const cardTitle = card.querySelector('.card__title').textContent;

    popupImage.src = imageUrl;
    popupImage.alt = altText;

    popupCaption.textContent = cardTitle;

    popupOpen(popupTypeImage);  
};

//Функция выведения карточек на страницу
function renderCards() {
    initialCards.forEach(function(item) {
        const card = createCard(item.link, item.name, item.altText, deleteCard, like, openCard);
        addCard(card);
    });
};

//Функция редоктирования профиля с полями заполнения
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    popupClose(popupTypeEdit);
};

//Функция создания новой карточки с полями заполнения
function handleNewCardFormSubmit(evt) {
    evt.preventDefault(); 
    
    const placeNameInput = cardsForm.elements['place-name'];
    const linkInput = cardsForm.elements.link;
    const placeNameValue = placeNameInput.value;
    const linkValue = linkInput.value;
  
    const newCard = createCard(linkValue, placeNameValue, placeNameValue, deleteCard, like, openCard);
  
    placesList.prepend(newCard);
    popupClose(popupTypeNewCard);
    cardsForm.reset();
  };

// Вызов функции renderCards при загрузке страницы      
document.addEventListener('DOMContentLoaded', renderCards); 

//Вызов функции открытия модального окна "Редактировать профиль"
profileEditButton.addEventListener('click', function(event){    
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;                      
    popupOpen(popupTypeEdit);
});

//Вызов функции закрытия модального окна "Редактировать профиль"
profileCloseButton.addEventListener('click', function(event){
    popupClose(popupTypeEdit);
});

//Вызов функции открытия модального окна "Новое место"
profileAddButton.addEventListener('click', function(){
    popupOpen(popupTypeNewCard);
});

//Вызов функции закрытия модального окна "Новое место"
cardsCloseButton.addEventListener('click', function(){
    popupClose(popupTypeNewCard);
});

//Вызов функции открытия модального окна "Картинок"
imageCloseButton.addEventListener('click', function(event){                            
    popupClose(popupTypeImage);
});

//Навешивание обработчика событий на "Редактирование профиля" (что бы при нажатии кнопки "Сохранить", значения сохранялись в поля ввода)
profileForm.addEventListener('submit', handleProfileFormSubmit);

//Навешивание обработчика событий на "Новая карточка" (что бы при нажатии кнопки "Сохранить", значения сохранялись в поля ввода)
cardsForm.addEventListener('submit', handleNewCardFormSubmit);