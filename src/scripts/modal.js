function openModal(event){
    event.classList.add('popup_is-opened'); //Функция открытия модального окна                      //modal.js
};

function closeModal(event){
    event.classList.remove('popup_is-opened'); //Функция закрытия модального окна                   //modal.js
};



export {openModal, closeModal};