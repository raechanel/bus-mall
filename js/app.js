'use strict';


let allProducts = [];

let allowedAttempts = 25;

let clicks = 0;

let myContainer = document.getElementById('container');

let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');


let button = document.getElementById('button');

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

let productCollection = [];

function renderImages() {

  // collection of values - an array


  while (productCollection.length < 6) {
    let randomNum = getRandomIndex();
    while (!productCollection.includes(randomNum)) {
      productCollection.push(randomNum);
    }
  }

  let productOneIndex = productCollection.shift();
  let productTwoIndex = productCollection.shift();
  let productThreeIndex = productCollection.shift();

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

// FUNCTION TO RENDER CHART

function renderChart() {
  const ctx = document.getElementById('chart').getContext('2d');

  // labels for chart

  let products = [];
  let clicks = [];
  let views = [];


  for (let i = 0; i < allProducts.length; i++) {

    products.push(allProducts[i].name);
    clicks.push(allProducts[i].clicks);
    views.push(allProducts[i].views);
  }


  let myChartData = {
    type: 'bar',
    data: {
      labels: products,
      datasets: [{
        label: '# of Votes',
        data: clicks,
        backgroundColor: 'rgba(209, 216, 19, 0.95)',
        borderColor: 'rgba(209, 216, 19, 0.95)',
        borderWidth: 3
      },
      {
        label: '# of Views',
        data: views,
        backgroundColor: 'rgba(128, 11, 25, 0.95)',
        borderColor: 'rgba(128, 11, 25, 0.95)',
        borderWidth: 3
      }]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: 'black',
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          ticks: {
            color: 'black',
          }
        }
      }
    }
  };


  const myChart = new Chart(ctx, myChartData);

}






function handleImgClick(e) {
  clicks++;
  let imageClicked = e.target.alt;

  for (let i = 0; i < allProducts.length; i++) {
    if (imageClicked === allProducts[i].name) {
      allProducts[i].clicks++;
    }
  }
  renderImages();
  if (clicks === allowedAttempts) {
    myContainer.removeEventListener('click', handleImgClick);
  }
}


function handleShowResultsClick(e) {
  let displayResults = document.getElementById('results');
  if (clicks === allowedAttempts); {
    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement('li');
      li.textContent = `${allProducts[i].name} was viewed ${allProducts[i].views} times and clicked ${allProducts[i].clicks} times`;
      displayResults.appendChild(li);
    }
    renderChart();
  }

}


renderImages();

myContainer.addEventListener('click', handleImgClick);

button.addEventListener('click', handleShowResultsClick);





