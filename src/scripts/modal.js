//Функция открытия модального окна
function openModal(event){
    document.addEventListener('keydown', handleEscape,); 
    event.classList.add('popup_is-opened'); 
    closeModalOnOverlayClick(event);
};

//Функция закрытия модального окна при нажатии на крестик
function closeModal(event){
    document.removeEventListener('keydown', handleEscape); 
    event.classList.remove('popup_is-opened'); 
};

//Функция закрытия модального окна при нажатии на Esc
function handleEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      closeModal(openedPopup);
    }
};

//Функция закрытия модального окна при нажатии на оверлей
function closeModalOnOverlayClick(popup) {
    popup.addEventListener('click', function(event) {
        if (event.target === event.currentTarget) {
            closeModal(popup);
        }
    });
};

export {openModal, closeModal};