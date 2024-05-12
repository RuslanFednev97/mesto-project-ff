import './pages/index.css';
import {performActionLike, createCard, removeCardElement} from './scripts/cards';
import {openPopup, closePopup, closeModalOnOverlayClick} from './scripts/modal';
import {enableValidation, clearValidation} from './scripts/validation';
import {userInfo, card, editProfile, addingCard, patchAvatar, apiDeleteCard} from './scripts/api';

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
const confirmButton = document.querySelector('.popup__button-delete');
let globalUserData = null; // Глобальная переменная для хранения данных пользователя    
const cardState = {
    currentCardId: null,
    currentCardElement: null
  };

  // Объект настроек валидации
const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

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


    // Изменение текста кнопки на "Сохранение..." во время загрузки
    popupTypeEditSubmit.textContent = 'Сохранение...';

    editProfile(nameInput.value, jobInput.value)
    .then((data) => {
        // Установка новых сведений на странице, используя данные, полученные в ответе сервера
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closePopup(popupTypeEdit);
    })
    .catch((err) => {
        console.log(err); // выводим ошибку в консоль
    })
    .finally(() => {
        popupTypeEditSubmit.textContent = 'Сохранить'; // Возвращаем исходный текст кнопки
    });
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
            cardData, 
            performActionLike, 
            openCard, 
            handleCardDeleteRequest, 
            globalUserData._id
        );
        cardsContainer.prepend(cardObject);
        cardsFormNewPlace.reset();
        closePopup(popupTypeNewCard);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        popupTypeNewCardSubmit.textContent = 'Сохранить'; // Возвращаем исходный текст кнопки в случае ошибки
    })
};

//Вызов функции открытия модального окна "Редактировать профиль"
profileEditButton.addEventListener('click', function(){   
    clearValidation(profileForm, validationSettings);
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;                      
    openPopup(popupTypeEdit);
});

//Вызов функции закрытия модального окна "Редактировать профиль"
profileCloseButton.addEventListener('click', function(){
    closePopup(popupTypeEdit);
});

//Вызов функции открытия модального окна "Новое место"
profileAddButton.addEventListener('click', function(){
    clearValidation(cardsFormNewPlace, validationSettings);
    openPopup(popupTypeNewCard);
});

//Вызов функции закрытия модального окна "Новое место"
cardsCloseButton.addEventListener('click', function(){
    closePopup(popupTypeNewCard);
});

//Вызов функции открытия модального окна "Картинок"
imageCloseButton.addEventListener('click', function(){                            
    closePopup(popupTypeImage);
});

//Навышиваем на все попапы обработчик событий
popups.forEach(closeModalOnOverlayClick);

//Навешивание обработчика событий на "Редактирование профиля" (что бы при нажатии кнопки "Сохранить", значения сохранялись в поля ввода)
profileForm.addEventListener('submit', handleProfileFormSubmit);      

//Навешивание обработчика событий на "Новая карточка" (что бы при нажатии кнопки "Сохранить", значения сохранялись в поля ввода)
cardsFormNewPlace.addEventListener('submit', handleNewCardFormSubmit);

//Вызов функции закрытия модального окна "Удалить"
popupDeleteCloseButton.addEventListener('click', function(){
    closePopup(popupDelete);
});

//Вызов функции открытия модального окна "Аватар"
profileImage.addEventListener('click', function(){
    clearValidation(cardsAvatar, validationSettings);
    openPopup(popupAvatar);
});

//Вызов функции закрытия модального окна "Аватар"
popupAvatarCloseButton.addEventListener('click', function(){
    closePopup(popupAvatar);
});

// Обработчик события клика по кнопке подтверждения удаления в попапе
confirmButton.addEventListener('click', () => {
    if (cardState.currentCardId && cardState.currentCardElement) {
        apiDeleteCard(cardState.currentCardId)
          .then(() => {
            // Закрытие попапа
            closePopup(popupDelete);
            // Удаление элемента карточки из DOM
            removeCardElement(cardState.currentCardElement);
            // Очистка текущего состояния карточки
            cardState.currentCardId = null;
            cardState.currentCardElement = null;
          })
          .catch((err) => {
            console.error('Ошибка при удалении карточки:', err);
          });
      } else {
        console.error("Не заданы id или элемент карточки");
      }
  });
  

function handleCardDeleteRequest(cardId, cardElement) {
    cardState.currentCardId = cardId;
    cardState.currentCardElement = cardElement;
    openPopup(popupDelete);
  }



// Функция обновления аватара
function replaceAvatar(evt) {
    evt.preventDefault();
    const avatarUrl = popupAvatar.querySelector('.popup__input_type_url');
    // Изменение текста кнопки на "Сохранение..." во время загрузки
    popupAvatarSubmit.textContent = 'Сохранение...';

    patchAvatar({ avatar: avatarUrl.value })
    .then(data => {
        const avatarImg = data.avatar;
        // Добавляем timestamp к URL, чтобы избежать кэширования
        const newAvatarUrl = `${avatarImg}?${new Date().getTime()}`;
        profileImage.style.backgroundImage = `url(${newAvatarUrl})`; 
        popupAvatarSubmit.textContent = 'Сохранить';
        cardsAvatar.reset();
        closePopup(popupAvatar);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        popupAvatarSubmit.textContent = 'Сохранить'; // Возвращаем исходный текст кнопки в случае ошибки
    })
}

//Вызов функции обновления аватара
popupAvatarSubmit.addEventListener('click', replaceAvatar);

//Вызов функции валидации форм, добавляя обработчики событий для отправки формы и установки слушателей для каждого набора полей в форме
enableValidation(validationSettings);

//Promise загрузка информации о пользователе и загрузка первоначальных карточек
Promise.all([userInfo(), card()])
.then(([userData, cardsData]) => {
    globalUserData = userData; // Сохраняем данные пользователя глобально
    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`; 

    cardsData.forEach((card) => {
        const cardElement = createCard(
            card,
            performActionLike,
            openCard,
            handleCardDeleteRequest, 
            globalUserData._id,
        );
        addCard(cardElement);
    })
})
.catch((err) => {
    console.log(err);
})
  
