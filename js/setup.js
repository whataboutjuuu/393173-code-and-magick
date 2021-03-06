'use strict';
(function () {
  // генерация похожих персонажей
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var generateWizard = function () {
    var wizards = [];
    var resultNames = window.util.shuffleArray(window.wizardSettings.WIZARD_NAMES);
    var resultSurnames = window.util.shuffleArray(window.wizardSettings.WIZARD_SURNAMES);
    var resultCoatColors = window.util.shuffleArray(window.wizardSettings.WIZARD_COAT_COLOR);
    var resultEyesColors = window.util.shuffleArray(window.wizardSettings.WIZARD_EYES_COLOR);

    for (var i = 0; i < window.wizardSettings.WIZARD_COUNT; i++) {
      wizards[i] = {name: resultNames[i] + ' ' + resultSurnames[i], coatColor: resultCoatColors[i], eyesColor: resultEyesColors[i]};
    }

    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var wizards = generateWizard();
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var fragment = document.createDocumentFragment();

  var buildBlocks = function () {
    for (var i = 0; i < wizards.length; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    setupSimilarList.appendChild(fragment);
  };
  buildBlocks();

  document.querySelector('.setup-similar').classList.remove('hidden');

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
