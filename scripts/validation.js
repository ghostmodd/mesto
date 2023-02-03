// Data for validation
const validationConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn-submit',
  inputErrorClass: 'form__input_type_error',
  activeInputErrorClass: 'form__input-error_active',
  disableButtonClass: 'form__btn-submit_disabled',
}

/**
 * This function shows errors of input's validation. It selects an element
 * of mistake and change it's params
 * @param {string} formElement necessary argument which should reffer to form
 * where input error is supposed to be shown
 * @param {string} inputElement necessary argument which should reffer to the
 * input with a validation mistake
 * @param {string} validationMessage necessary argument which should contain
 * text which is to be shown to user
*/
function showInputError (inputElement, errorElement, validationMessage, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = validationMessage;
  errorElement.classList.add(config.activeInputErrorClass);
};

/**
 * This function hides errors of input's validation. It selects an element
 * of mistake and change it's properties
 * @param {string} formElement necessary argument which should reffer to form
 * where no longer aren't any mistakes
 * @param {string} inputElement necessary argument which should reffer to the
 * input where no longer aren't any mistakes
*/
function hideInputError (inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.activeInputErrorClass);
};

/**
 * This function checks if any input of form has problems with validation
 * @param {array} inputList necessary argument which should contain array
 * of form's input list
*/
function hasInvalidInput (inputList) {
  return inputList.some(input => {
    return !input.validity.valid;
  });
};

/**
 * This function checks if any input of form has problems with validation
 * and changes properties of submit button
 * @param {string} formElement necessary argument which should reffer to form
 * where the functions works. It is often an opened form
 * @param {array} inputList necessary argument which should contain array
 * of form's input list
*/
function toggleButtonState (inputList, submitButton, config) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add(config.disableButtonClass);
    submitButton.setAttribute('disabled', '');
  } else {
    submitButton.classList.remove(config.disableButtonClass);
    submitButton.removeAttribute('disabled', '');
  }
};

/**
 * This function disables a specific button if it's needed
 * @param {string} submitButton necessary argument which should reffer to the
 * button which should be disabled
*/
function disableButtonState (submitButton, config) {
  submitButton.classList.add(config.disableButtonClass);
  submitButton.setAttribute('disabled', '');
};

/**
 * This function checks if any input of form has problems with validation
 * and decides what action to do
 * @param {string} inputElement necessary argument which should reffer to the
 * input to check
 * @param {array} inputList necessary argument which should contain array
 * of form's input list
*/
function checkValidation (inputList, inputElement, errorElement, submitButton, config) {
    if (!inputElement.validity.valid) {
      showInputError (inputElement, errorElement, inputElement.validationMessage, config);
    } else {
      hideInputError (inputElement, errorElement, config)
    }
    toggleButtonState(inputList, submitButton, config);
};

/**
 * This function sets event listeners on forms's inputs
 * @param {string} formElement necessary argument which should reffer to form
 * where it's needed to set listeners
*/
function setInputValidation (formElement, inputList, submitButton, config) {
  inputList.forEach(inputElement => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.addEventListener('input', () => { checkValidation(inputList, inputElement, errorElement, submitButton, config) });
  });

  if (formElement == formAddCard) {
    formElement.addEventListener('submit', () => { disableButtonState(submitButton, config) });
  }

  toggleButtonState(inputList, submitButton, config);
};

/**
 * This function enable validation by starting the chain of functions
 * @see {@link setInputValidation}
 * @see {@link checkValidation}
 * @see {@link showInputError}
 * @see {@link hideInputError}
 * @see {@link toggleButtonState}
 * @see {@link hasInvalidInput}
*/
function enableValidation (config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const submitButton = formElement.querySelector(config.submitButtonSelector);
    setInputValidation(formElement, inputList, submitButton, config);
  });
};
