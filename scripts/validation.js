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
function showInputError (inputElement, errorElement, validationMessage) {
  inputElement.classList.add('form__input_type_error');
  errorElement.textContent = validationMessage;
  errorElement.classList.add('form__input-error_active');
};

/**
 * This function hides errors of input's validation. It selects an element
 * of mistake and change it's properties
 * @param {string} formElement necessary argument which should reffer to form
 * where no longer aren't any mistakes
 * @param {string} inputElement necessary argument which should reffer to the
 * input where no longer aren't any mistakes
*/
function hideInputError (inputElement, errorElement) {
  inputElement.classList.remove('form__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('form__input-error_active');
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
function toggleButtonState (inputList, submitButton) {
  if (hasInvalidInput(inputList)) {
    submitButton.classList.add('form__btn-submit_disabled');
    submitButton.setAttribute('disabled', '');
  } else {
    submitButton.classList.remove('form__btn-submit_disabled');
    submitButton.removeAttribute('disabled', '');
  }
};

/**
 * This function disables a specific button if it's needed
 * @param {string} submitButton necessary argument which should reffer to the
 * button which should be disabled
*/
function disableButtonState (submitButton) {
  submitButton.classList.add('form__btn-submit_disabled');
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
function checkValidation (inputList, inputElement, errorElement, submitButton) {
    if (!inputElement.validity.valid) {
      showInputError (inputElement, errorElement, inputElement.validationMessage);
    } else {
      hideInputError (inputElement, errorElement)
    }
    toggleButtonState(inputList, submitButton);
};

/**
 * This function sets event listeners on forms's inputs
 * @param {string} formElement necessary argument which should reffer to form
 * where it's needed to set listeners
*/
function setInputValidation (formElement, inputList, submitButton) {
  inputList.forEach(inputElement => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.addEventListener('input', () => { checkValidation(inputList, inputElement, errorElement, submitButton) });
  });

  if (formElement == formAddCard) {
    formElement.addEventListener('submit', () => { disableButtonState(submitButton) });
  }

  toggleButtonState(inputList, submitButton);
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
function enableValidation () {
  const formList = Array.from(document.querySelectorAll('.form'));

  formList.forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const submitButton = formElement.querySelector('.form__btn-submit');
    setInputValidation(formElement, inputList, submitButton);
  });
};
