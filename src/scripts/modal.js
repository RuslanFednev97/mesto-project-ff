//Функция открытия модального окна
function openPopup(popup) {
    document.addEventListener('keydown', handleEscape);
    popup.classList.add('popup_is-opened');
};

//Функция закрытия модального окна при нажатии на крестик
function closePopup(popup) {
    document.removeEventListener('keydown', handleEscape);
    popup.classList.remove('popup_is-opened');
};

//Функция закрытия модального окна при нажатии на Esc
function handleEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closePopup(openedPopup);
    }
};

//Функция закрытия модального окна при нажатии на оверлей
function closeModalOnOverlayClick(popup) {
    popup.addEventListener('click', function(event) {
        if (event.target === event.currentTarget) {
            closePopup(popup);
        }
    });
};

export {openPopup, closePopup, closeModalOnOverlayClick};