// vars
var notepad = document.getElementById("notepad");

var themeButton = document.getElementById("theme");
var fsUpButton = document.getElementById("fsup");
var fsDownButton = document.getElementById("fsdown");

var moon = document.getElementById("moon");
var sun = document.getElementById("sun");

var faviconElements = document.getElementsByClassName("favicon");

var root = document.documentElement;

// functions
function toggleTheme() {
	if (document.body.classList.contains("dark")) {
		setLight();
	} else {
		setDark();
	}
}

function setDark() {
	document.body.classList.add("dark");
	localStorage.setItem("theme", "dark");

	moon.classList.add("hidden");
	sun.classList.remove("hidden");

	for (var i = 0; i < faviconElements.length; i++) {
		faviconElements[i].href = faviconElements[i].href.replace("/l/", "/d/");
		faviconElements[i].href = faviconElements[i].href + "?v=" + Math.random();
	}
}

function setLight() {
	document.body.classList.remove("dark");
	localStorage.setItem("theme", "light");

	moon.classList.remove("hidden");
	sun.classList.add("hidden");

	for (var i = 0; i < faviconElements.length; i++) {
		faviconElements[i].href = faviconElements[i].href.replace("/d/", "/l/");
		faviconElements[i].href = faviconElements[i].href + "?v=" + Math.random();
	}
}

function fsUp() {
	var fs = getComputedStyle(root).getPropertyValue("--font-size");
	root.style.setProperty("--font-size", parseInt(fs) + 2 + "px");

	localStorage.setItem("font-size", parseInt(fs) + 2 + "px");
}

function fsDown() {
	var fs = getComputedStyle(root).getPropertyValue("--font-size");
	root.style.setProperty("--font-size", parseInt(fs) - 2 + "px");

	localStorage.setItem("font-size", parseInt(fs) - 2 + "px");
}

function save() {
	localStorage.setItem("notepad", notepad.value);
}

function load() {
	if (localStorage.getItem("notepad")) {
		notepad.value = localStorage.getItem("notepad");
	}
}

function init() {
	notepad.addEventListener("input", save);

	themeButton.addEventListener("click", toggleTheme);

	fsUpButton.addEventListener("click", fsUp);
	fsDownButton.addEventListener("click", fsDown);

	if (localStorage.getItem("theme") === "dark") {
		setDark();
	} else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
		setDark();
	} else {
		setLight();
	}

	if (localStorage.getItem("font-size")) {
		root.style.setProperty("--font-size", localStorage.getItem("font-size"));
	}

	load();
}

// etc
init();
