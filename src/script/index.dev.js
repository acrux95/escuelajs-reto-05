"use strict";

var $app = document.getElementById('app');
var $observe = document.getElementById('observe');
var API = 'https://rickandmortyapi.com/api/character/?page=24';

var getData = function getData(api) {
  fetch(api).then(function (response) {
    return response.json();
  }).then(function (response) {
    var characters = response.results;
    var output = characters.map(function (character) {
      return "\n      <article class=\"Card\">\n        <img src=\"".concat(character.image, "\" />\n        <h2>").concat(character.name, "<span>").concat(character.species, "</span></h2>\n      </article>\n    ");
    }).join('');
    var newItem = document.createElement('section');
    newItem.classList.add('Items');
    newItem.innerHTML = output;
    $app.appendChild(newItem);
  })["catch"](function (error) {
    return console.log(error);
  });
};

var loadData = function loadData() {
  getData(API);
};

var intersectionObserver = new IntersectionObserver(function (entries) {
  if (entries[0].isIntersecting <= 0) return;
  loadData(10);
  console.log('Loaded new Items');

  rootMargin: '0px 0px 100% 0px';
});
intersectionObserver.observe($observe);