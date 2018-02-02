'use strict';

var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

// показываем блок setup
document.querySelector('.setup').classList.remove('hidden');

// функция для тасования элементов массива
var shuffleArray = function (array) {
  var shuffledArray = array.slice();
  var currentIndex = shuffledArray.length;
  var temporaryValue;
  var randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffledArray[currentIndex];
    shuffledArray[currentIndex] = shuffledArray[randomIndex];
    shuffledArray[randomIndex] = temporaryValue;
  }
  return shuffledArray;
};

// генерация массива персонажей
var generateWizard = function () {
  var wizards = [];
  var resultNames = shuffleArray(WIZARD_NAMES);
  var resultSurnames = shuffleArray(WIZARD_SURNAMES);
  var resultCoatColors = shuffleArray(WIZARD_COAT_COLOR);
  var resultEyesColors = shuffleArray(WIZARD_EYES_COLOR);

  for (var i = 0; i < WIZARD_COUNT; i++) {
    wizards[i] = {name: resultNames[i] + ' ' + resultSurnames[i], coatColor: resultCoatColors[i], eyesColor: resultEyesColors[i]};
  }

  return wizards;
};

// создание DOM элементов случайно сгенерированных волшебников
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizards = generateWizard();

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};
// заполнение блока созданными волшебниками
var setupSimilarList = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

var buildBlocks = function () {
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  setupSimilarList.appendChild(fragment);
};
buildBlocks();

// показываем блок
document.querySelector('.setup-similar').classList.remove('hidden');
