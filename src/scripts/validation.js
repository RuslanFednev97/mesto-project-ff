const updateButtonState = (buttonElement, isActive, validationSettings) => {
    if (isActive) {
        buttonElement.classList.remove(validationSettings.inactiveButtonClass);
        buttonElement.disabled = false;
    } else {
        buttonElement.classList.add(validationSettings.inactiveButtonClass);
        buttonElement.disabled = true;
    }
};

//Добавляет класс и сообщение ошибки
const showInputError = (formElement, inputElement, validationSettings, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationSettings.errorClass);
};

//Удаляет класс и сообщение ошибки
  const hideInputError = (formElement, inputElement, validationSettings) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationSettings.inputErrorClass);
    errorElement.classList.remove(validationSettings.errorClass);
    errorElement.textContent = '';
};

//Проверяет валидность полей и вызывает showInputError или hideInputError
const checkInputValidity = (formElement, inputElement, validationSettings) => {
    if(inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    }else {
        inputElement.setCustomValidity("")
    }
  
    if(!inputElement.validity.valid) {
        showInputError(formElement, inputElement, validationSettings, inputElement.validationMessage);
    }else{
        hideInputError(formElement, inputElement, validationSettings);
    }
  };

//Активирует или деактивирует кнопку
const toggleButtonState = (inputList, buttonElement, validationSettings) => {
    const isButtonActive = !hasInvalidInput(inputList);
    updateButtonState(buttonElement, isButtonActive, validationSettings);
};



//Устанавливает обработчики событий для элементов формы, включая проверку валидности ввода и изменение состояния кнопки.
const setEventListeners = (formElement, validationSettings) => {
    const inputList = Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationSettings);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationSettings);
            toggleButtonState(inputList, buttonElement, validationSettings);
        });
    });
};

//Включает валидацию форм, добавляя обработчики событий для отправки формы и установки слушателей для каждого набора полей в форме.
const enableValidation = (validationSettings) => {
    const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt){
            evt.preventDefault();
        });
        setEventListeners(formElement, validationSettings);
    });
};

//Проверяет наличие невалидных вводов в списке элементов формы
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid
    });
};

//Очищает ошибки валидации формы и делает кнопку неактивной
function clearValidation(formElement, validationSettings) {
    const inputList = formElement.querySelectorAll(validationSettings.inputSelector);
    const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);

    inputList.forEach(input => {
        hideInputError(formElement, input, validationSettings);
    });

    updateButtonState(buttonElement, false, validationSettings);
};

export{enableValidation, clearValidation};

