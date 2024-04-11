let height = document.documentElement.clientHeight;
let width = document.documentElement.clientWidth;
document.querySelector('.grid-container').style.height = height + "px";
let open = false;
const sidebar = document.querySelector('.sidebar');
const iconbutton = document.querySelector('.menu-icon');
const NestorIcon = document.querySelector('.Nestor-icon');
const NestorX = NestorIcon.offsetLeft;
document.querySelector('.menu-icon').onclick = function () {
	sidebar.classList.toggle('open-sidebar');
	iconbutton.classList.toggle('open-menu-icon');
	NestorIcon.classList.toggle('open-Nestor-icon')

}

document.querySelector('.Plugins').onclick = function () {
	window.location.href = "plugins/"

}