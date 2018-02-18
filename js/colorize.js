'use strict';
(function () {
  var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var WIZARD_COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZARD_EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
  var player = document.querySelector('.setup-player');

  var selectorToColor = [
    {
      selectorName: 'wizard-coat',
      arrayName: WIZARD_COAT_COLOR,
      inputSelector: 'input[name="coat-color"]'
    },
    {
      selectorName: 'wizard-eyes',
      arrayName: WIZARD_EYES_COLOR,
      inputSelector: 'input[name="eyes-color"]'
    },
    {
      selectorName: 'setup-fireball',
      arrayName: WIZARD_FIREBALL_COLOR,
      inputSelector: 'input[name="fireball-color"]'
    }
  ];

  window.colorize = function (selector) {
    selector.addEventListener('click', function (evt) {
      var selectorClass = evt.target.getAttribute('class');
      for (var i = 0; i < selectorToColor.length; i++) {
        var arrayName = selectorToColor[i].arrayName;
        if (selectorClass === selectorToColor[i].selectorName) {
          var newColorProperty = arrayName[window.util.getRandomNumber(0, (arrayName.length - 1))];
          player.querySelector(selectorToColor[i].inputSelector).value = newColorProperty;
        }
      }

      if (selector.tagName === 'use') {
        selector.style.fill = newColorProperty;
      } else {
        selector.style.background = newColorProperty;
      }

    });
  };
})();
