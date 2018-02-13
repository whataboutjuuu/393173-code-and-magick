'use strict';
(function () {
  // настройка цветов персонажа
  var player = document.querySelector('.setup-player');
  var colorCoat = player.querySelector('.wizard-coat');
  var colorEyes = player.querySelector('.wizard-eyes');
  var colorFireball = player.querySelector('.setup-fireball-wrap');

  window.colorize(colorCoat);
  window.colorize(colorEyes);
  window.colorize(colorFireball);

})();
