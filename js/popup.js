'use strict';
(function () {
  // действия с окном персонажа
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESCAPE = 27;

  var setup = document.querySelector('.setup');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupInput = setup.querySelector('.setup-user-name');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === KEYCODE_ESCAPE) {
      closePopup();
    }
  };

  var openPopup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      openPopup();
    }
  });

  setupClose.addEventListener('click', function () {
    closePopup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      closePopup();
    }
  });

  setupInput.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ESCAPE) {
      evt.stopPropagation();
    }
  });

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), closePopup, window.errorAlert);
    evt.preventDefault();
  });

})();
