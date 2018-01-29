'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;

var FONT_SIZE = 16;
var lineHeight = FONT_SIZE * 1.4;
var headingHeight = 2 * lineHeight; // т.к. 2 строки в заголовке

var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_HEIGHT = 150;

var baseline = CLOUD_Y + GAP + headingHeight + BAR_HEIGHT;
var maxTime;
var columnColor;

// Функция отрисовки облака
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Функция отрисовки заголовка
var renderHeading = function (ctx, text, y) {
  ctx.font = FONT_SIZE + 'px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = '#000';
  ctx.fillText(text, CLOUD_X + GAP, y);
};

// Функция для выбора максимального времени
var findMaxTime = function (times) {
  maxTime = times[0];

  for (var i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
    }
  }
  return maxTime;
};

window.renderStatistics = function (ctx, players, times) {
  // Рисуем облако
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  // Рисуем заголовок
  renderHeading(ctx, 'Ура вы победили!', CLOUD_Y + 2 * GAP);
  renderHeading(ctx, 'Список результатов:', CLOUD_Y + 2 * GAP + lineHeight);
  // Ищем максимальное время прохождения
  findMaxTime(times);

  // Рисуем колонки гистограммы
  for (var i = 0; i < players.length; i++) {
    // Считаем координату начала колонки
    var time = Math.floor(times[i]);
    var columnHeight = time * 100 / maxTime;
    var columnStart = CLOUD_Y + GAP + headingHeight + BAR_HEIGHT - columnHeight;

    // Рисуем колонку нужного цвета
    if (players[i] === 'Вы') {
      columnColor = 'rgba(255, 0, 0, 1)';
    } else {
      columnColor = 'rgba(0, 0, 255, ' + Math.random() + ')';
    }
    ctx.fillStyle = columnColor;
    ctx.fillRect(CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i, columnStart, BAR_WIDTH, columnHeight);
    // Выводим время над колонкой и имя игрока под колонкой
    ctx.fillStyle = '#000';
    ctx.fillText(time, CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i, columnStart - lineHeight);
    ctx.fillText(players[i], CLOUD_X + 2 * GAP + (BAR_WIDTH + BAR_GAP) * i, baseline + lineHeight);
  }

};

