'use strict';
(function () {
  // генерация похожих персонажей
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var generateWizard = function () {
    var wizards = [];
    var resultNames = window.util.shuffleArray(window.const.WIZARD_NAMES);
    var resultSurnames = window.util.shuffleArray(window.const.WIZARD_SURNAMES);
    var resultCoatColors = window.util.shuffleArray(window.const.WIZARD_COAT_COLOR);
    var resultEyesColors = window.util.shuffleArray(window.const.WIZARD_EYES_COLOR);

    for (var i = 0; i < window.const.WIZARD_COUNT; i++) {
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
})();

