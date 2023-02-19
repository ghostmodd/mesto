import { formAddCard } from "./constants.js";

export class FormValidator {
  constructor(formElement, config) {
    this._config = config;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(this._config.submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
  }

  /**
   * This function shows errors of input's validation. It selects an element
   * of mistake and change it's params
   * @param {string} inputElement necessary argument which should reffer to the
   * input with a validation mistake
   * @param {string} errorElement necessary argument which should refer to the
   * error message container
  */
  _showErrorElement(inputElement, errorElement) {
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.activeInputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  /**
   * This function hides errors of input's validation. It selects an element
   * of mistake and change it's properties
   * @param {string} inputElement necessary argument which should reffer to the
   * input with a validation mistake
   * @param {string} errorElement necessary argument which should refer to the
   * error message container
  */
  _hideErrorElement(inputElement, errorElement) {
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.activeInputErrorClass);
    errorElement.textContent = '';
  }

  /**
   * This function checks if any input of form has problems with validation
  */
  _hasInvalidInput() {
    return this._inputList.some(inputElement => {
      return !inputElement.validity.valid;
    })
  }

  /**
   * This function hanges properties of submit button
  */
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._submitButton.classList.add(this._config.disableButtonClass);
      this._submitButton.setAttribute('disabled', '');
    } else {
      this._submitButton.classList.remove(this._config.disableButtonClass);
      this._submitButton.removeAttribute('disabled', '');
    }
  }

  /**
   * This function disables a specific button if it's needed
  */
  _disableButtonState() {
    this._submitButton.classList.add(this._config.disableButtonClass);
    this._submitButton.setAttribute('disabled', '');
  }

  /**
   * This function checks if any input of form has problems with validation
   * and decides what to do
   * @param {string} inputElement necessary argument which should reffer to the
   * input to check
  */
  _checkValidation(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showErrorElement(inputElement, errorElement);
    } else {
      this._hideErrorElement(inputElement, errorElement);
    }
    this._toggleButtonState();
  }

  /**
   * This function enable validation by starting the chain of functions
  */
  enableValidation() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => { this._checkValidation(inputElement) });
    });

    if (this._formElement == formAddCard) {
      this._formElement.addEventListener('submit', () => { this._disableButtonState() });
    }

    this._toggleButtonState();
  }
};
