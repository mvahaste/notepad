// vars
var notepad = document.getElementById("notepad");

var options = document.getElementById("options");

var expandButton = document.getElementById("expand");
var themeButton = document.getElementById("theme");
var fontButton = document.getElementById("font");
var widthButton = document.getElementById("width");
var fsUpButton = document.getElementById("fsup");
var fsDownButton = document.getElementById("fsdown");

var overlay = document.getElementById("overlay");

var oCancelButton = document.getElementById("cancel");
var oSaveButton = document.getElementById("save");

var oFontInput = document.getElementById("font-input");

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

function toggleWidth() {
	if (notepad.classList.contains("thinner")) {
		notepad.classList.remove("thinner");

		localStorage.setItem("width", "normal");
	} else {
		notepad.classList.add("thinner");

		localStorage.setItem("width", "thinner");
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

function toggleOptions() {
	if (options.classList.contains("expanded")) {
		options.classList.remove("expanded");
		expandButton.classList.remove("flipped");
	} else {
		options.classList.add("expanded");
		expandButton.classList.add("flipped");
	}
}

function showOverlay() {
	overlay.classList.remove("hidden");
}

function hideOverlay() {
	overlay.classList.add("hidden");
}

function saveCustomFont() {
	var font = oFontInput.value;

	if (font) {
		root.style.setProperty("--font", font);
		localStorage.setItem("font", font);
	} else {
		root.style.setProperty("--font", "JetBrains Mono");
		localStorage.removeItem("font");
	}

	hideOverlay();
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

	expandButton.addEventListener("click", toggleOptions);
	themeButton.addEventListener("click", toggleTheme);
	fontButton.addEventListener("click", showOverlay);
	widthButton.addEventListener("click", toggleWidth);
	fsUpButton.addEventListener("click", fsUp);
	fsDownButton.addEventListener("click", fsDown);

	oCancelButton.addEventListener("click", hideOverlay);
	oSaveButton.addEventListener("click", saveCustomFont);

	if (localStorage.getItem("font")) {
		root.style.setProperty("--font", localStorage.getItem("font"));
		oFontInput.value = localStorage.getItem("font");
	}

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

	if (localStorage.getItem("width") === "thinner") {
		notepad.classList.add("thinner");
	}

	load();
}

// etc
init();
