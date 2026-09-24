//  ПЕРЕКЛЮЧЕНИЕ ТЕМЫ 
(function () {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  btn.addEventListener("click", function () {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
})();


//  КАТЕГОРИИ 
var CATEGORIES = [
  { id: "soft",  label: "Софт-скилы",  color: "var(--skill-a)" },
  { id: "hard",  label: "Хард-скилы",  color: "var(--skill-b)" },
  { id: "tools", label: "Инструменты", color: "var(--skill-c)" },
  { id: "lang",  label: "Языки",       color: "#b9c255" }
];


//  НАВЫКИ 
var SKILLS = [
  { name: "Аналитическое мышление", cat: "soft" },
  { name: "Внимательность к деталям", cat: "soft" },
  { name: "Ответственность", cat: "soft" },
  { name: "Обучаемость", cat: "soft" },
  { name: "Умение работать в команде", cat: "soft" },
  { name: "Организованность", cat: "soft" },
  { name: "Усидчивость", cat: "soft" },
  { name: "Способность работать с большим объёмом информации", cat: "soft" },
  { name: "Анализ данных: Pandas, NumPy, Matplotlib", cat: "hard" },
  { name: "Машинное обучение", cat: "hard" },
  { name: "Excel / Таблицы", cat: "hard" },
  { name: "Анализ НПА и внутренних документов", cat: "hard" },
  { name: "Формирование частных технических заданий", cat: "hard" },
  { name: "Система ЭСРН", cat: "hard" },
  { name: "Python", cat: "tools" },
  { name: "JavaScript", cat: "tools" },
  { name: "C++", cat: "tools" },
  { name: "R", cat: "tools" },
  { name: "HTML", cat: "tools" },
  { name: "CSS", cat: "tools" },
  { name: "ParaView", cat: "tools" },
  { name: "Русский — родной", cat: "lang" },
  { name: "Английский — B2", cat: "lang" }
];


var list = document.getElementById("skill-list");
var status = document.getElementById("skills-status");
var chips = document.getElementById("skill-chips");
var input = document.getElementById("skill-search");
var clear = document.getElementById("skill-clear");

var query = "";
var activeCat = "all";

function getCategory(id) {
  for (var i = 0; i < CATEGORIES.length; i++) {
    if (CATEGORIES[i].id === id) return CATEGORIES[i];
  }
  return null;
}

//
function showSkills() {
  var result = [];

  for (var i = 0; i < SKILLS.length; i++) {
    var skill = SKILLS[i];
    var okCat = false;
    var okText = false;

    
    if (activeCat == "all") {
      okCat = true;
    } else if (skill.cat == activeCat) {
      okCat = true;
    }

    // проверка текста
    if (query == "") {
      okText = true;
    } else {
      var lowerName = skill.name.toLowerCase();
      var lowerQuery = query.toLowerCase();
      if (lowerName.indexOf(lowerQuery) != -1) {
        okText = true;
      }
    }

    if (okCat == true && okText == true) {
      result.push(skill);
    }
  }

  if (result.length == 0) {
    list.innerHTML = "<div class='skill-empty'>Ничего не найдено.</div>";
    clear.hidden = false;
    status.innerHTML = "Найдено: 0";
    return;
  }

  var html = "";
  for (var j = 0; j < result.length; j++) {
    var s = result[j];
    var cat = getCategory(s.cat);
    var color = "var(--skill-a)";
    if (cat != null) {
      color = cat.color;
    }

    html = html + "<div class='skill' style='background:" + color + "'>";
    html = html + "<span>" + s.name + "</span>";
    html = html + "<span class='mag'>⌕</span>";
    html = html + "</div>";
  }
  list.innerHTML = html;

  status.innerHTML = "Найдено: " + result.length;

  // показать/скрыть крестик
  if (query == "") {
    clear.hidden = true;
  } else {
    clear.hidden = false;
  }
}


// 
function showChips() {
  var html = "";

  //  "Все"
  var allClass = "chip";
  if (activeCat == "all") {
    allClass = "chip active";
  }
  html = html + "<button class='" + allClass + "' data-cat='all'>Все</button>";

  // остальные категории
  for (var i = 0; i < CATEGORIES.length; i++) {
    var c = CATEGORIES[i];
    var cls = "chip";
    if (activeCat == c.id) {
      cls = "chip active";
    }
    html = html + "<button class='" + cls + "' data-cat='" + c.id + "'>" + c.label + "</button>";
  }

  chips.innerHTML = html;
}


//  СОБЫТИЯ 

// ввод текста в поиск
input.oninput = function () {
  query = input.value;
  showSkills();
};

// нажатие на крестик
clear.onclick = function () {
  query = "";
  input.value = "";
  input.focus();
  showSkills();
};

//
chips.onclick = function (e) {
  var target = e.target;
  var cat = target.getAttribute("data-cat");
  if (cat != null) {
    activeCat = cat;
    showChips();
    showSkills();
  }
};

// 
showChips();
showSkills();
