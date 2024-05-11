//Добавляет класс и сообщение ошибки
const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

//Удаляет класс и сообщение ошибки
  const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

//Проверяет валидность полей и вызывает showInputError или hideInputError
const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.value === '') { // Если поле пустое, используем стандартное сообщение об ошибке
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass);
        return;
    };
    // Используем функцию hasInvalidInput для проверки валидности
    if (hasInvalidInput([inputElement])) {
        showInputError(formElement, inputElement, inputElement.dataset.errorMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
};

//Активирует или деактивирует кнопку
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
};


//Устанавливает обработчики событий для элементов формы, включая проверку валидности ввода и изменение состояния кнопки.
const setEventListeners = (formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

//Включает валидацию форм, добавляя обработчики событий для отправки формы и установки слушателей для каждого набора полей в форме.
const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        setEventListeners(formElement, {inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass});
    });
};

//Проверяет наличие невалидных вводов в списке элементов формы
function hasInvalidInput(inputList) {
    return inputList.some(function(inputElement) {
        let regex;
        switch (inputElement.name) {
            case 'name':
                regex = /^[a-zA-Zа-яА-Я\s-]{2,40}$/;
                break;
            case 'description':
                regex = /^[a-zA-Zа-яА-Я\s-]{2,200}$/;
                break;
            case 'place-name':
                regex = /^[a-zA-Zа-яА-Я\s-]{2,30}$/;
                break;
            case 'link':
                regex = /^(ftp|http|https):\/\/[^ "]+$/;
                break;
            case 'url':
                regex = /^(ftp|http|https):\/\/[^ "]+$/;
                break;
            default:
                return false;
        }
        return !regex.test(inputElement.value);
    });
};

//Очищает ошибки валидации формы и делает кнопку неактивной
function clearValidation(formElement, {inputErrorClass, errorClass, inactiveButtonClass}) {
    const inputList = formElement.querySelectorAll('.popup__input');
    const buttonElement = formElement.querySelector('.popup__button');

    inputList.forEach(input => {
        const errorElement = formElement.querySelector(`.${input.id}-error`);
        input.classList.remove(inputErrorClass);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove(errorClass);
        }
    });

    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
};

export{enableValidation, clearValidation};