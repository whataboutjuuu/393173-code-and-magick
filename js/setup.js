'use strict';
(function () {

  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };
  // получение данных с сервера
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var successHandler = function (wizards) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    setupSimilarList.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };
  window.backend.load(successHandler, window.errorAlert);

  // перетягивание артефакта
  var artifactCell = document.querySelector('.setup-artifacts-shop');
  var targetArea = document.querySelector('.setup-artifacts');
  var draggedItem = null;

  artifactCell.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
      targetArea.style.pointerEvents = 'all';
      targetArea.style.outline = '2px dashed red';
    }
  });

  targetArea.addEventListener('dragenter', function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  });

  targetArea.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    targetArea.style.outline = '2px dashed red';
    return false;
  });

  targetArea.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    targetArea.style.outline = '';
    evt.preventDefault();
  });

  targetArea.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    targetArea.style.outline = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();
  });

  document.addEventListener('dragend', function (evt) {
    targetArea.style.outline = '';
    evt.preventDefault();
  });

})();
