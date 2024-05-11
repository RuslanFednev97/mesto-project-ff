import './pages/index.css';
import {performActionLike, createCard, deleteCard} from './scripts/cards';
import {openPopup, closePopup, closeModalOnOverlayClick} from './scripts/modal';
import {enableValidation, clearValidation} from './scripts/validation';
import {userInfo, card, editProfile, addingCard, patchAvatar} from './scripts/api';

//Переменные
const popups = document.querySelectorAll('.popup');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const profileCloseButton = document.querySelector('.popup__close');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const cardsCloseButton = popupTypeNewCard.querySelector('.popup__close');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const imageCloseButton = popupTypeImage.querySelector('.popup__close');
const cardsFormNewPlace = document.forms["new-place"];
const cardsAvatar = document.forms["avatar"];
const cardsContainer = document.querySelector('.places__list');
const profileForm = document.forms["edit-profile"];
const nameInput = profileForm.elements.name;
const jobInput = profileForm.elements.description;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupCaption = document.querySelector('.popup__caption');
const profileImage = document.querySelector('.profile__image');
const popupDelete = document.querySelector('.popup__delete');
const popupDeleteCloseButton = popupDelete.querySelector('.popup__close');
const popupAvatar = document.querySelector('.popup-avatar');
const popupAvatarCloseButton = popupAvatar.querySelector('.popup__close');
const popupAvatarSubmit = popupAvatar.querySelector('.popup__button');
const popupTypeEditSubmit = popupTypeEdit.querySelector('.popup__button');
const popupTypeNewCardSubmit = popupTypeNewCard.querySelector('.popup__button');
export const cardState = {
    currentCardId: null
  }; // Глобальная переменная для хранения текущего ID карточки


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

    openPopup(popupTypeImage);  
};

//Функция редоктирования профиля с полями заполнения
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); 

    const nameValue = nameInput.value;
    const jobValue = jobInput.value;

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    // Изменение текста кнопки на "Сохранение..." во время загрузки
    popupTypeEditSubmit.textContent = 'Сохранение...';

    editProfile(nameValue, jobValue)
    .then((data) => {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        console.log(data); // Здесь будет содержаться тело ответа от сервера
        popupTypeEditSubmit.textContent = 'Сохранить'; // Возвращаем исходный текст кнопки
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
        popupTypeEditSubmit.textContent = 'Сохранить'; // Возвращаем исходный текст кнопки в случае ошибки
    });

    closePopup(popupTypeEdit);
};

//Функция создания новой карточки с полями заполнения
function handleNewCardFormSubmit(evt) {
    evt.preventDefault(); 
    
    const placeNameInput = cardsFormNewPlace.elements['place-name'];
    const linkInput = cardsFormNewPlace.elements.link;
    // Изменение текста кнопки на "Сохранение..." во время загрузки
    popupTypeNewCardSubmit.textContent = 'Сохранение...';
    addingCard({
        name: placeNameInput.value,
        link: linkInput.value
    })
    .then((cardData) => {
        const cardObject = createCard(
            cardData.link, 
            cardData.name, 
            cardData.altText, 
            cardData.likes.length, 
            performActionLike, 
            openCard, 
            cardData.ownerId, 
            cardData.userId, 
            cardData._id,
            cardData.likes
        );
        popupTypeNewCardSubmit.textContent = 'Сохранить';
        cardsContainer.prepend(cardObject);
        closePopup(popupTypeNewCard);
        cardsFormNewPlace.reset();
    })
    .catch((err) => {
        console.log(err);
        popupTypeNewCardSubmit.textContent = 'Сохранить'; // Возвращаем исходный текст кнопки в случае ошибки
    });
    
};

//Вызов функции открытия модального окна "Редактировать профиль"
profileEditButton.addEventListener('click', function(event){   
    clearValidation(cardsAvatar, {
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
        inactiveButtonClass: 'popup__button_disabled'
    });
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;                      
    openPopup(popupTypeEdit);
});

//Вызов функции закрытия модального окна "Редактировать профиль"
profileCloseButton.addEventListener('click', function(event){
    closePopup(popupTypeEdit);
});

//Вызов функции открытия модального окна "Новое место"
profileAddButton.addEventListener('click', function(){
    clearValidation(cardsFormNewPlace, {
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
        inactiveButtonClass: 'popup__button_disabled'
    });
    openPopup(popupTypeNewCard);
});

//Вызов функции закрытия модального окна "Новое место"
cardsCloseButton.addEventListener('click', function(){
    closePopup(popupTypeNewCard);
});

//Вызов функции открытия модального окна "Картинок"
imageCloseButton.addEventListener('click', function(event){                            
    closePopup(popupTypeImage);
});

//Навышиваем на все попапы обработчик событий
popups.forEach(closeModalOnOverlayClick);

//Навешивание обработчика событий на "Редактирование профиля" (что бы при нажатии кнопки "Сохранить", значения сохранялись в поля ввода)
profileForm.addEventListener('submit', handleProfileFormSubmit, function (evt){
    evt.preventDefault();
});      

//Навешивание обработчика событий на "Новая карточка" (что бы при нажатии кнопки "Сохранить", значения сохранялись в поля ввода)
cardsFormNewPlace.addEventListener('submit', handleNewCardFormSubmit);

//Вызов функции закрытия модального окна "Удалить"
popupDeleteCloseButton.addEventListener('click', function(){
    closePopup(popupDelete);
});

//Вызов функции открытия модального окна "Аватар"
profileImage.addEventListener('click', function(){
    clearValidation(cardsAvatar, {
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
        inactiveButtonClass: 'popup__button_disabled'
    });
    openPopup(popupAvatar);
});

//Вызов функции закрытия модального окна "Аватар"
popupAvatarCloseButton.addEventListener('click', function(){
    closePopup(popupAvatar);
});

// Функция обновления аватара
function replaceAvatar(evt) {
    evt.preventDefault();
    const avatarUrl = popupAvatar.querySelector('.popup__input_type_url');
    // Изменение текста кнопки на "Сохранение..." во время загрузки
    popupAvatarSubmit.textContent = 'Сохранение...';

    patchAvatar({ avatar: avatarUrl.value })
    .then(data => {
        const avatarImg = data.avatar;
        profileImage.style.backgroundImage = `url(${avatarImg})`; 
        popupAvatarSubmit.textContent = 'Сохранить'; // Возвращаем исходный текст кнопки
        cardsAvatar.reset();
    })
    .catch((err) => {
        console.log(err);
        popupAvatarSubmit.textContent = 'Сохранить'; // Возвращаем исходный текст кнопки в случае ошибки
    });
    closePopup(popupAvatar);
}

//Вызов функции обновления аватара
popupAvatarSubmit.addEventListener('click', replaceAvatar);

//Объект настроек валидации
enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
});

//Promise загрузка информации о пользователе и загрузка первоначальных карточек
Promise.all([userInfo(), card()])
.then(([userData, cardsData]) => {
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.src = userData.avatar;

    cardsData.forEach((card) => {
        const cardElement = createCard(
            card.link,
            card.name,
            card.name,
            card.likes.length,
            performActionLike,
            openCard,
            card.owner._id,
            userData._id,
            card._id,
            card.likes
        );
        addCard(cardElement);
    })
})
.catch((err) => {
    console.log(err);
})

//Навешивание обработчика событий на "Попап удаления карточки"
document.addEventListener('DOMContentLoaded', () => {
    const confirmButton = document.querySelector('.popup__button-delete');
    confirmButton.addEventListener('click', () => {
      if (cardState.currentCardId) {
        deleteCard(cardState.currentCardId); // Удалить карточку здесь
        closePopup(popupDelete);
      }
    });
  });
  
