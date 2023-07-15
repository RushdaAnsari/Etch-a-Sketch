const DEFAULT_COLOR = '#F37C1B';
const DEFAULT_MODE = 'color';
const DEFAULT_SIZE = 10;

let currentColor = DEFAULT_COLOR
let currentMode = DEFAULT_MODE
let currentSize = DEFAULT_SIZE

function setCurrentColor(newColor) {
  currentColor = newColor
}

function setCurrentMode(newMode) {
  currentMode = newMode
  activateButton(newMode)
}

function setCurrentSize(newSize) {
  currentSize = newSize;
  updateSizeValue(newSize);
  reloadGrid();
}

const colorPicker = document.getElementById('colorPicker');
const colorBtn = document.getElementById('colorBtn');
const rainbowBtn = document.getElementById('rainbowBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('range');
const grid = document.getElementById('grid');
const icon = document.querySelector('#icon');


let mouseDown = false
document.body.onmousedown = () => (mouseDown = true)
document.body.onmouseup = () => (mouseDown = false)

function changeSize(value) {
  setCurrentSize(value)
  updateSizeValue(value)
  reloadGrid()
}

function updateSizeValue(currentSize) {
  sizeValue.innerText = `${currentSize} x ${currentSize}`
}

function reloadGrid() {
  clearGrid()
  setupGrid(currentSize)
}

function clearGrid() {
  grid.innerHTML = ''
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div')
    gridElement.classList.add('grid-element')
    gridElement.addEventListener('mouseover', changeColor)
    gridElement.addEventListener('mousedown', changeColor)
    grid.appendChild(gridElement)
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) return

  if (currentMode === 'rainbow') {
    const randomColor = generateRandomColor();
    e.target.style.backgroundColor = randomColor;
  } else if (currentMode === 'color') {
    e.target.style.backgroundColor = currentColor
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#DCEDC8'
  }
}

function activateButton(newMode) {
  const buttons = [rainbowBtn, colorBtn, eraserBtn];

  buttons.forEach((button) => {
    if (button.id === `${newMode}Btn`) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

function generateRandomColor() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

icon.addEventListener('mouseover', function(e){
  icon.classList.add('fa-bounce')
})
icon.addEventListener('mouseout', function(e){
  icon.classList.remove('fa-bounce')
})


colorPicker.oninput = (e) => setCurrentColor(e.target.value)
colorBtn.onclick = () => setCurrentMode('color')
rainbowBtn.onclick = () => setCurrentMode('rainbow')
eraserBtn.onclick = () => setCurrentMode('eraser')
clearBtn.onclick = () => reloadGrid()
sizeSlider.onchange = (e) => changeSize(e.target.value)



window.onload = () => {
  setupGrid(DEFAULT_SIZE)
  activateButton(DEFAULT_MODE)
  
}
