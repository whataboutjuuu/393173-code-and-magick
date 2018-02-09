'use strict';

var WIZARD_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var setup = document.querySelector('.setup');
// показываем блок setup
// setup.classList.remove('hidden');

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

// действия с окном персонажа
var KEYCODE_ENTER = 13;
var KEYCODE_ESCAPE = 27;

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

// настройка цветов персонажа
var player = document.querySelector('.setup-player');
var colorCoat = player.querySelector('.wizard-coat');
var colorEyes = player.querySelector('.wizard-eyes');
var colorFireball = player.querySelector('.setup-fireball-wrap');

// функция получения случайного числа в диапазоне
var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// меняем цвета и задаем их в инпуты
var colorCoatInput = player.querySelector('input[name="coat-color"]');
var colorEyesInput = player.querySelector('input[name="eyes-color"]');
var colorFireballInput = player.querySelector('input[name="fireball-color"]');

// функция смены цвета или фона в зависимости от того, svg это или нет
var changeColor = function (array, selector, inputSelector) {
  var newColorProperty = array[getRandomNumber(0, (array.length - 1))];
  if (selector.tagName === 'use') {
    selector.style.fill = newColorProperty;
  } else {
    selector.style.background = newColorProperty;
  }
  inputSelector.value = newColorProperty;
};

colorCoat.addEventListener('click', function () {
  changeColor(WIZARD_COAT_COLOR, colorCoat, colorCoatInput);
});

colorEyes.addEventListener('click', function () {
  changeColor(WIZARD_EYES_COLOR, colorEyes, colorEyesInput);
});

colorFireball.addEventListener('click', function () {
  changeColor(WIZARD_FIREBALL_COLOR, colorFireball, colorFireballInput);
});
