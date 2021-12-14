'use strict';

// console.log('hi guise');

const allProducts = [];

let allowedAttempts = 5;

let clicks = 0;

let myContainer = document.getElementById('container')

let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');

let showResults = document.getElementById('results');


function BusMall(name, fileExtention = 'jpeg') {
  this.name = name;
  this.src = `img/${name}.${fileExtention}`;
  this.views = 0;
  this.clicks = 0;
  allProducts.push(this);
}

new BusMall('bag');
new BusMall('bottle');
new BusMall('pots');
new BusMall('tent');
new BusMall('weights');
new BusMall('broom');
new BusMall('desk');
new BusMall('lamp');
new BusMall('ornament');
new BusMall('sleeping-bag');
new BusMall('vaccum');
new BusMall('welcome-mat');
new BusMall('guitar');
new BusMall('drumset');
new BusMall('piano');
new BusMall('camera');
new BusMall('notebook');
new BusMall('pens');



function getRandomIndex() {
  return Math.floor(Math.random() * allProducts.length);
}

function renderImages() {
  let productOneIndex = getRandomIndex();
  let productTwoIndex = getRandomIndex();
  let productThreeIndex = getRandomIndex();

  // while (productOneIndex === productTwoIndex) {
  //   productTwoIndex =
  // }
  

  imageOne.src = allProducts[productOneIndex].src;
  imageOne.alt = allProducts[productOneIndex].name;
  allProducts[productOneIndex].views++;

  imageTwo.src = allProducts[productTwoIndex].src;
  imageTwo.alt = allProducts[productTwoIndex].name;
  allProducts[productTwoIndex].views++;

  imageThree.src = allProducts[productThreeIndex].src;
  imageThree.alt = allProducts[productThreeIndex].name;
  allProducts[productThreeIndex].views++;
}

function handleImageClick(e) {
  clicks++;
  let imageClicked = e.target.alt;

  // console.log(imageClicked);
  for (let i = 0; i < allProducts.length; i++) {
    if (imageClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }

  }

  renderImages();

  if (clicks === allowedAttempts) {
    myContainer.removeEventListener('click', handleImageClick);
  }


}


function handleShowResultsClick(e) {
  let displayResults = document.getElementById('results');
  if (clicks === allowedAttempts) {
    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${allProducts[i].name} was viewed ${allProducts[i].views} times and clicked ${allProducts[i].clicks} times`;
      displayResults.appendChild(li);

    }

  }

}

renderImages();

myContainer.addEventListener('click', handleImageClick);


showResults.addEventListener('click', handleShowResultsClick);

