'use strict';

// показываем блок setup
document.querySelector('.setup').classList.remove('hidden');


var setupSimilarList = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizardCoatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizardEyesColors = ['black', 'red', 'blue', 'yellow', 'green'];

//
var WIZARD_COUNT = 4;

var generateRandom = function (arr1, arr2) {
  var result = [];

  for (var i = 0; i < arr1.length; i++) {
    var randomIndex = Math.floor(Math.random() * arr1.length);

    if (arr2 !== undefined) {
      result[i] = arr1[randomIndex] + ' ' + arr2[randomIndex];
      arr1.splice(randomIndex, 1);
      arr2.splice(randomIndex, 1);
    } else {
      result[i] = arr1[i];
      arr1.splice(randomIndex, 1);
    }
  }

  return result;
};

// генерируем массив персонажей
var generateWizard = function () {

  var wizards = [];
  var resultNames = generateRandom(wizardNames, wizardSurnames);
  var resultCoatColors = generateRandom(wizardCoatColors);
  var resultEyesColors = generateRandom(wizardEyesColors);

  for (i = 0; i < WIZARD_COUNT; i++) {
    wizards[i] = {name: resultNames[i], coatColor: resultCoatColors[i], eyesColor: resultEyesColors[i]};
    console.log(wizards[i]);
  }

  return wizards;
};
// var generateWizard = function () {
//   var resultNames = [];

//   for (var i = 0; i < WIZARD_COUNT; i++) {
//     var randomIndex = Math.floor(Math.random() * WIZARD_COUNT);
//     console.log('randomIndex Name - ' + randomIndex);

//     resultNames[i] = wizardNames[randomIndex] + ' ' + wizardSurnames[randomIndex];
//     wizardNames.splice(randomIndex, 1);
//     wizardSurnames.splice(randomIndex, 1);
//   }

//   var resultCoatColors = [];

//   for (i = 0; i < WIZARD_COUNT; i++) {
//     randomIndex = Math.floor(Math.random() * WIZARD_COUNT);
//     console.log('randomIndex Coat - ' + randomIndex);

//     resultCoatColors[i] = wizardCoatColors[randomIndex];
//     wizardCoatColors.splice(randomIndex, 1);
//   }

//   var resultEyesColors = [];

//   for (i = 0; i < wizardEyesColors.length; i++) {
//     randomIndex = Math.floor(Math.random() * WIZARD_COUNT);
//     console.log('randomIndex Eyes - ' + randomIndex);
//     resultEyesColors[i] = wizardEyesColors[randomIndex];
//     wizardEyesColors.splice(randomIndex, 1);
//   }

//   var wizards = [];
//   for (i = 0; i < WIZARD_COUNT; i++) {
//     wizards[i] = {name: resultNames[i], coatColor: resultCoatColors[i], eyesColor: resultEyesColors[i]};
//     console.log(wizards[i]);
//   }

//   return wizards;
// };

var wizards = generateWizard();
// задаем цвета
var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};
// выводим фрагменты
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
setupSimilarList.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
