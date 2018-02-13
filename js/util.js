'use strict';
(function () {

  window.util = {
    // функция для тасования элементов массива
    shuffleArray: function (array) {
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
    },
    // функция получения случайного числа в диапазоне
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  };

})();
