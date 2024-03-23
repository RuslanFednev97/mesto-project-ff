import './pages/index.css';
import { initialCards, deleteButton, like, handleFormSubmitNewCard, createCard} from './scripts/cards';
import {openModal, closeModal, closeModalOverlay} from './scripts/modal';

//Переменные
const profileEditButton = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupClose = document.querySelector('.popup__close');
const profileAddButton = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
let popupCloseTwo = popupTypeNewCard.querySelector('.popup__close');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
let popupCloseThree = popupTypeImage.querySelector('.popup__close');
const formElementNewCard = document.querySelector('form[name = "new-place"]');
const cardsContainer = document.querySelector('.places__list');
const formElement = document.querySelector('form[name = "edit-profile"]');
const nameInput = document.querySelector('form[name="edit-profile"] input[name="name"]');
const jobInput = document.querySelector('form[name="edit-profile"] input[name="description"]');


//Функции

function addCard (cardElement) {
    cardsContainer.append(cardElement); //Функция объявления карточки
};

function openCard(event) {                                                                       
    const imageUrl = event.target.src;
    popupImage.src = imageUrl;
    openModal(popupTypeImage);  //Функция открытия карточки
};

function renderCards() {
    initialCards.forEach(function(item) {
        const card = createCard(item.link, item.name, item.altText, deleteButton, like, openCard);
        addCard(card);//Функция выведения карточки на страницу
    });
};
  
function closeModalEsc(popupType) {
    window.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal(popupType);
        };
    });
};

document.addEventListener('DOMContentLoaded', renderCards); // Вызов функции renderCards при загрузке страницы    

//Закрытие и открытие модального окна "Редактировать профиль"

profileEditButton.addEventListener('click', function(event){                          
    openModal(popupTypeEdit);
});

popupClose.addEventListener('click', function(event){                                   
    closeModal(popupTypeEdit);
});

window.onclick = function(event) {                                                     //index.js
    if (event.target == popupTypeNewCard) {
        closeModal(popupTypeNewCard);
    } else if (event.target == popupTypeEdit) {
        closeModal(popupTypeEdit);
    } else if (event.target == popupTypeImage) {
        closeModal(popupTypeImage);
    }
};

window.addEventListener('keydown', closeModalEsc(popupTypeEdit));

//Закрытие и открытие модального окна "Новое место"

profileAddButton.addEventListener('click', function(){                                  
    openModal(popupTypeNewCard);
});

popupCloseTwo.addEventListener('click', function(){                                     
    closeModal(popupTypeNewCard);
});

window.addEventListener('keydown', closeModalEsc(popupTypeNewCard));

//Закрытие и открытие модального окна "Картинок"

popupCloseThree.addEventListener('click', function(event){                            
    closeModal(popupTypeImage);
});

window.addEventListener('keydown', closeModalEsc(popupTypeImage));

document.addEventListener('DOMContentLoaded', function() {                                     
    let profileTitle = document.querySelector('.profile__title').textContent;
    let profileDescription = document.querySelector('.profile__description').textContent;

    nameInput.value = profileTitle;
    jobInput.value = profileDescription;
});


function handleFormSubmit(evt) {
    evt.preventDefault(); 

    let nameValue = nameInput.value;
    let jobValue = jobInput.value;

    let profileTitle = document.querySelector('.profile__title');
    let profileDescription = document.querySelector('.profile__description');

    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;

    closeModal(popupTypeEdit);
}

formElement.addEventListener('submit', handleFormSubmit);                                       
formElementNewCard.addEventListener('submit', handleFormSubmitNewCard);                         

export {formElementNewCard, popupTypeNewCard, openCard};