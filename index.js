'use strict';

const domItems = (() => {
  const form = document.querySelector('.form');
  const email = document.getElementById('email');
  const country = document.getElementById('country');
  const zipCode = document.getElementById('zipCode');
  const password = document.getElementById('password');
  const passwordConfirmation = document.getElementById('passwordConfirmation');

  return {
    form,
    email,
    country,
    zipCode,
    password,
    passwordConfirmation,
  };
})();

const domEvents = (() => {
  const formSubmit = (e) => {
    if (domItems.password.value !== domItems.passwordConfirmation.value) {
      password.setCustomValidity(
        'Password and password confirmation should match.'
      );
      password.reportValidity();
      e.preventDefault();
    } else {
      password.setCustomValidity('');
      // Success
    }
  };

  const checkEmail = (e) => {
    const target = e.target;
    if (target.validity.valueMissing) {
      target.setCustomValidity('Please fill out this field.');
    } else if (target.validity.typeMismatch) {
      target.setCustomValidity('Please input an valid email address.');
    } else if (target.validity.tooShort) {
      target.setCustomValidity(
        `Email should be at least ${target.minLength} characters; you entered ${target.value.length}.`
      );
    } else if (target.validity.tooLong) {
      target.setCustomValidity(
        `Email maximum length is ${target.maxLength} characters; you entered ${target.value.length}.`
      );
    } else {
      target.setCustomValidity('');
    }
    target.reportValidity();
  };

  const checkZipCode = (e) => {
    const target = e.target;
    if (target.validity.valueMissing) {
      target.setCustomValidity('Please fill out this field.');
    } else if (target.validity.badInput) {
      target.setCustomValidity('Please input an valid zip code.');
    } else {
      target.setCustomValidity('');
    }
    target.reportValidity();
  };

  const checkPassword = (e) => {
    const target = e.target;
    if (target.validity.valueMissing) {
      target.setCustomValidity('Please fill out this field.');
    } else if (target.validity.tooShort) {
      target.setCustomValidity(
        `Password should be at least ${target.minLength} characters; you entered ${target.value.length}.`
      );
    } else if (target.validity.tooLong) {
      target.setCustomValidity(
        `Password maximum length is ${target.maxLength} characters; you entered ${target.value.length}.`
      );
    } else {
      target.setCustomValidity('');
    }
    target.reportValidity();
  };

  return {
    formSubmit,
    checkEmail,
    checkZipCode,
    checkPassword,
  };
})();

const helpers = (() => {
  const attachEvents = () => {
    domItems.form.addEventListener('submit', domEvents.formSubmit);
    domItems.email.addEventListener('focusout', domEvents.checkEmail);
    domItems.zipCode.addEventListener('focusout', domEvents.checkZipCode);
    domItems.password.addEventListener('focusout', domEvents.checkPassword);
    domItems.passwordConfirmation.addEventListener(
      'focusout',
      domEvents.checkPassword
    );
  };

  return {
    attachEvents,
  };
})();

const init = () => {
  helpers.attachEvents();
};

init();
