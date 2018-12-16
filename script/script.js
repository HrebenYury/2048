//количество ячеек 4
var size = 4;

var min = 0;
var max = size - 1;

var isMoved = false;
var score = 0;

var excludeIds = [];
function load() {
  //создаём таблицу игры
  var html = "<table >";
  //создаём 4 ряда с 4 ячейками
  for (var row = 0; row < size; row++) {
    html += "<tr>";
    for (var col = 0; col < size; col++) {
      var id = row + "" + col;
      html += '<td align="center" valign="center"  id="' + id + '"></td>';
    }
    html += "</tr>";
  }
  html += "</table>";
  //alert(html);
  document.getElementById("canvas").innerHTML = html;
  var id1 = getId();
  var id2 = "";
  //взятие id  чтоб не совпадали
  while (true) {
    id2 = getId();
    if (id1 != id2) break;
  }
  //Set initial 2 values
  document.getElementById(id1).innerHTML = "2";
  document.getElementById(id2).innerHTML = "2";
  document.getElementById(id1).style.backgroundColor = getColor(2);
  document.getElementById(id2).style.backgroundColor = getColor(2);

  score = 0;
  document.getElementById("score").innerHTML = score;
  clearСlock();
  return false;
}

// рандомные числа для id ячейки
function getRandom() {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//получение id рандомной ячейки
function getId() {
  var i = getRandom();
  var j = getRandom();
  return i + "" + j;
}

// проверка если ячейка не пустая
function up() {
  isMoved = false;
  excludeIds = [];
  for (var j = min; j <= max; j++) {
    for (var i = min; i <= max; i++) {
      var id = i + "" + j;
      if (document.getElementById(id).innerHTML != "") {
        moveUp(id);
      }
    }
  }
  if (isMoved == true) {
    update();
  }
  return false;
}
function moveUp(id) {
  //проверка не вверху ли элемент(выше уже просто нельзя двигать)
  if (!id.startsWith(min)) {
    //разбиваем id на массив разбивая по разделителю ""
    var arr = id.split("");
    //берём первый элемент разбитого массива
    var i = parseInt(arr[0]);
    //берём второй элемент разбитого массива
    var j = parseInt(arr[1]);
    for (var k = i - 1; k >= min; k--) {
      var nId = k + "" + j;
      if (document.getElementById(nId).innerHTML != "") {
        var val = parseInt(document.getElementById(k + 1 + "" + j).innerHTML);
        var nVal = parseInt(document.getElementById(nId).innerHTML);
        //если ячейка снизу и сверху равны по значению то складываем
        if (val == nVal) {
          if (excludeIds.indexOf(nId) == -1) {
            //пушим верхнюю ячейку в массив исключений
            excludeIds.push(nId);
            //присваиваем верхней ячейке сумму
            document.getElementById(nId).innerHTML = val + nVal;
            //ставим цвет сложенной ячейке
            document.getElementById(nId).style.backgroundColor = getColor(
              val + nVal
            );
            //ячейка снизу обнуляется
            document.getElementById(k + 1 + "" + j).innerHTML = "";
            //и ставится дефолтый цвет
            document.getElementById(k + 1 + "" + j).style.backgroundColor =
              "#CDC0B4";
            isMoved = true;
            //добавляем значение в рекорд
            score += val + nVal;
          }
          break;
        }
      } else {
        document.getElementById(nId).innerHTML = document.getElementById(
          k + 1 + "" + j
        ).innerHTML;
        document.getElementById(
          nId
        ).style.backgroundColor = document.getElementById(
          k + 1 + "" + j
        ).style.backgroundColor;
        document.getElementById(k + 1 + "" + j).innerHTML = "";
        document.getElementById(k + 1 + "" + j).style.backgroundColor =
          "#CDC0B4";
        isMoved = true;
      }
    }
  }
  return false;
}
function left() {
  isMoved = false;
  excludeIds = [];
  for (var i = min; i <= max; i++) {
    for (var j = min; j <= max; j++) {
      var id = i + "" + j;
      if (document.getElementById(id).innerHTML != "") {
        moveLeft(id);
      }
    }
  }
  if (isMoved == true) {
    update();
  }
  return false;
}
function moveLeft(id) {
  if (!id.endsWith(min)) {
    var arr = id.split("");
    var i = parseInt(arr[0]);
    var j = parseInt(arr[1]);
    for (var k = j - 1; k >= min; k--) {
      var nId = i + "" + k;
      if (document.getElementById(nId).innerHTML != "") {
        var val = parseInt(document.getElementById(i + "" + (k + 1)).innerHTML);
        var nVal = parseInt(document.getElementById(nId).innerHTML);
        if (val == nVal) {
          if (excludeIds.indexOf(nId) == -1) {
            excludeIds.push(nId);
            document.getElementById(nId).innerHTML = val + nVal;
            document.getElementById(nId).style.backgroundColor = getColor(
              val + nVal
            );
            document.getElementById(i + "" + (k + 1)).innerHTML = "";
            document.getElementById(i + "" + (k + 1)).style.backgroundColor =
              "#CDC0B4";
            isMoved = true;
            score += val + nVal;
          }
          break;
        }
      } else {
        document.getElementById(nId).innerHTML = document.getElementById(
          i + "" + (k + 1)
        ).innerHTML;
        document.getElementById(
          nId
        ).style.backgroundColor = document.getElementById(
          i + "" + (k + 1)
        ).style.backgroundColor;
        document.getElementById(i + "" + (k + 1)).innerHTML = "";
        document.getElementById(i + "" + (k + 1)).style.backgroundColor =
          "#CDC0B4";
        isMoved = true;
      }
    }
  }
  return false;
}
function down() {
  isMoved = false;
  excludeIds = [];
  for (var i = min; i <= max; i++) {
    for (var j = max; j >= min; j--) {
      var id = j + "" + i;
      if (document.getElementById(id).innerHTML != "") {
        moveDown(id);
      }
    }
  }
  if (isMoved == true) {
    update();
  }
  return false;
}
function moveDown(id) {
  if (!id.startsWith(max)) {
    var arr = id.split("");
    var i = parseInt(arr[0]);
    var j = parseInt(arr[1]);
    for (var k = i + 1; k <= max; k++) {
      var nId = k + "" + j;
      if (document.getElementById(nId).innerHTML != "") {
        var val = parseInt(document.getElementById(k - 1 + "" + j).innerHTML);
        var nVal = parseInt(document.getElementById(nId).innerHTML);
        if (val == nVal) {
          if (excludeIds.indexOf(nId) == -1) {
            excludeIds.push(nId);
            document.getElementById(nId).innerHTML = val + nVal;
            document.getElementById(nId).style.backgroundColor = getColor(
              val + nVal
            );
            document.getElementById(k - 1 + "" + j).innerHTML = "";
            document.getElementById(k - 1 + "" + j).style.backgroundColor =
              "#CDC0B4";
            isMoved = true;
            score += val + nVal;
          }
          break;
        }
      } else {
        document.getElementById(nId).innerHTML = document.getElementById(
          k - 1 + "" + j
        ).innerHTML;
        document.getElementById(
          nId
        ).style.backgroundColor = document.getElementById(
          k - 1 + "" + j
        ).style.backgroundColor;
        document.getElementById(k - 1 + "" + j).innerHTML = "";
        document.getElementById(k - 1 + "" + j).style.backgroundColor =
          "#CDC0B4";
        isMoved = true;
      }
    }
  }
  return false;
}
function right() {
  isMoved = false;
  excludeIds = [];
  for (var i = min; i <= max; i++) {
    for (var j = max; j >= min; j--) {
      var id = i + "" + j;
      if (document.getElementById(id).innerHTML != "") {
        moveRight(id);
      }
    }
  }
  if (isMoved == true) {
    update();
  }
  return false;
}
function moveRight(id) {
  if (!id.endsWith(max)) {
    var arr = id.split("");
    var i = parseInt(arr[0]);
    var j = parseInt(arr[1]);
    for (var k = j + 1; k <= max; k++) {
      var nId = i + "" + k;
      if (document.getElementById(nId).innerHTML != "") {
        var val = parseInt(document.getElementById(i + "" + (k - 1)).innerHTML);
        var nVal = parseInt(document.getElementById(nId).innerHTML);
        if (val == nVal) {
          if (excludeIds.indexOf(nId) == -1) {
            excludeIds.push(nId);
            document.getElementById(nId).innerHTML = val + nVal;
            document.getElementById(nId).style.backgroundColor = getColor(
              val + nVal
            );
            document.getElementById(i + "" + (k - 1)).innerHTML = "";
            document.getElementById(i + "" + (k - 1)).style.backgroundColor =
              "#CDC0B4";
            isMoved = true;
            score += val + nVal;
          }
          break;
        }
      } else {
        document.getElementById(nId).innerHTML = document.getElementById(
          i + "" + (k - 1)
        ).innerHTML;
        document.getElementById(
          nId
        ).style.backgroundColor = document.getElementById(
          i + "" + (k - 1)
        ).style.backgroundColor;
        document.getElementById(i + "" + (k - 1)).innerHTML = "";
        document.getElementById(i + "" + (k - 1)).style.backgroundColor =
          "#CDC0B4";
        isMoved = true;
      }
    }
  }
  return false;
}
function update() {
  //добавляем новое значение
  var ids = [];
  for (var i = min; i <= max; i++) {
    for (var j = min; j <= max; j++) {
      var id = i + "" + j;
      if (document.getElementById(id).innerHTML == "") {
        ids.push(id);
      }
    }
  }
  var id = ids[Math.floor(Math.random() * ids.length)];
  document.getElementById(id).innerHTML = "2";
  document.getElementById(id).style.backgroundColor = getColor(2);
  //проверяем нет ли места для перемещения
  var allFilled = true;
  for (var i = min; i <= max; i++) {
    for (var j = min; j <= max; j++) {
      var id = i + "" + j;
      if (document.getElementById(id).innerHTML == "") {
        allFilled = false;
        break;
      }
    }
  }

  document.getElementById("score").innerHTML = score;
  if (allFilled) {
    checkGameOver();
  }
}
function checkGameOver() {
  var isOver = true;
  for (var j = min; j <= max; j++) {
    for (var i = min; i <= max - 1; i++) {
      //alert(i+" "+j);
      var val = parseInt(document.getElementById(i + "" + j).innerHTML);
      var nVal = parseInt(document.getElementById(i + 1 + "" + j).innerHTML);
      if (val == nVal) {
        isOver = false;
        break;
      }
    }
  }
  if (isOver == true) {
    for (var i = min; i <= max; i++) {
      for (var j = min; j <= max - 1; j++) {
        //alert(i+" "+j);
        var val = parseInt(document.getElementById(i + "" + j).innerHTML);
        var nVal = parseInt(
          document.getElementById(i + "" + (j + 1)).innerHTML
        );
        if (val == nVal) {
          isOver = false;
          break;
        }
      }
    }
  }

  if (isOver) {
    alert("Game over!");
    pause();
  }
  return false;
}
function getColor(val) {
  var color = "#CDC0B4";
  switch (val) {
    case 2:
      color = "#EFE4D9";
      break;
    case 4:
      color = "#ECE0C8";
      break;
    case 8:
      color = "#F1B078";
      break;
    case 16:
      color = "#EB8C52";
      break;
    case 32:
      color = "#F57C5F";
      break;
    case 64:
      color = "#E95839";
      break;
    case 128:
      color = "#F1D045";
      break;
    case 256:
      color = "#F2D86A";
      break;
    case 512:
      color = "#E2B913";
      break;
    case 1024:
      color = "#E2B913";
      break;
    case 2048:
      color = "#FFCE00";
      break;
    default:
      color = "#CDC0B4";
  }
  return color;
}
if (typeof String.prototype.startsWith != "function") {
  String.prototype.startsWith = function(str) {
    return this.substring(0, str.length) === str;
  };
}
if (typeof String.prototype.endsWith != "function") {
  String.prototype.endsWith = function(str) {
    return this.substring(this.length - str.length, this.length) === str;
  };
}
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
      left();
      break;
    case 38:
      up();
      break;
    case 39:
      right();
      break;
    case 40:
      down();
      break;
  }
};

var base = 60;
var clocktimer, dateObj, dh, dm, ds, ms;
var readout = "";
var h = 1,
  m = 1,
  tm = 1,
  s = 0,
  ts = 0,
  ms = 0,
  show = true,
  init = 0,
  ii = 0;

function clearСlock() {
  clearTimeout(clocktimer);
  h = 1;
  m = 1;
  tm = 1;
  s = 0;
  ts = 0;
  ms = 0;
  init = 0;
  show = true;
  readout = "00:00:00.00";
  document.TestForm.stopwatch.value = readout;
  ii = 0;
  pause();
}

function startTIME() {
  var cdateObj = new Date();
  var t = cdateObj.getTime() - dateObj.getTime() - s * 1000;
  if (t > 999) {
    s++;
  }
  if (s >= m * base) {
    ts = 0;
    m++;
  } else {
    ts = parseInt(ms / 100 + s);
    if (ts >= base) {
      ts = ts - (m - 1) * base;
    }
  }
  if (m > h * base) {
    tm = 1;
    h++;
  } else {
    tm = parseInt(ms / 100 + m);
    if (tm >= base) {
      tm = tm - (h - 1) * base;
    }
  }
  ms = Math.round(t / 10);
  if (ms > 99) {
    ms = 0;
  }
  if (ms == 0) {
    ms = "00";
  }
  if (ms > 0 && ms <= 9) {
    ms = "0" + ms;
  }
  if (ts > 0) {
    ds = ts;
    if (ts < 10) {
      ds = "0" + ts;
    }
  } else {
    ds = "00";
  }
  dm = tm - 1;
  if (dm > 0) {
    if (dm < 10) {
      dm = "0" + dm;
    }
  } else {
    dm = "00";
  }
  dh = h - 1;
  if (dh > 0) {
    if (dh < 10) {
      dh = "0" + dh;
    }
  } else {
    dh = "00";
  }
  readout = dh + ":" + dm + ":" + ds + "." + ms;
  if (show == true) {
    document.TestForm.stopwatch.value = readout;
  }
  clocktimer = setTimeout("startTIME()", 1);
}

function pause() {
  if (init == 0) {
    dateObj = new Date();
    startTIME();
    init = 1;
  } else {
    if (show == true) {
      show = false;
    } else {
      show = true;
    }
  }
}

var startPoint = {};
var nowPoint;
var ldelay;
document.addEventListener(
  "touchstart",
  function(event) {
    event.preventDefault();
    event.stopPropagation();
    startPoint.x = event.changedTouches[0].pageX;
    startPoint.y = event.changedTouches[0].pageY;
    ldelay = new Date();
  },
  false
);


document.addEventListener(
  "touchend",
  function(event) {
    var pdelay = new Date();
    nowPoint = event.changedTouches[0];
    var xAbs = Math.abs(startPoint.x - nowPoint.pageX);
    var yAbs = Math.abs(startPoint.y - nowPoint.pageY);
    if ((xAbs > 20 || yAbs > 20) && pdelay.getTime() - ldelay.getTime() < 200) {
      if (xAbs > yAbs) {
        if (nowPoint.pageX < startPoint.x) {
          left();
        } else {
          right();
        }
      } else {
        if (nowPoint.pageY < startPoint.y) {
          up();
        } else {
          down();
        }
      }
    }
  },
  false
);

load();
