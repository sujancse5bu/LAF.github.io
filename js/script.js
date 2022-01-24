const discColors = ['red', 'blue', 'green', 'yellow', 'violet', 'aqua']
let totalDiscLength = 3;
let discInfo1 = []
let discInfo2 = []
let discInfo3 = []

document.getElementById('tohBtn').addEventListener('click', () => showSection('toh'))

window.onload = () => {
  generateDiscs1(Array.from({ length: 3 }).map((item, index) => index + 1))
  document.getElementById('tohInput').addEventListener('change', (e) => {
    generateDiscs1(Array.from({length: parseInt(e.target.value)}).map((item, index) => index + 1))
  })
}

const generateDiscs1 = (discArray) => {
  const widthdiff = 9 - discArray.length;
  discInfo2 = []
  discInfo3 = []

  // discArray.reverse()
  discInfo1 = discArray.reverse().map((item, index) => ({
    id: item,
    color: discColors[item - 1],
    width: 20 - widthdiff * (index)
  }))
  discInfo1 = discInfo1.reverse()
  updateTOH_UI()
}

const updateTOH_UI = () => {
  const discContainer1 = document.querySelector('.disc-container.disc-container1')
  console.log('disc1: ', discInfo1)
  let data = ''
  discInfo1.forEach((item, index) => {
    data += `<div 
    class="disc-item disc-item${item.id}" 
    style="width: ${item.width}rem; 
    background-color: ${item.color}"></div>`
  })
  discContainer1.innerHTML = data
  console.log(data)
}

const showSection = (targetClass) => {
  const sections = document.getElementsByClassName('content')
  Array.from(sections, (element, index) => {
    if (element.classList.contains(targetClass)) {
      element.style.display = 'initial'
    } else {
      element.style.display = 'none'
    }
  })
}