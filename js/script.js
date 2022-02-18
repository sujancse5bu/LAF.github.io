const discContainer1 = document.querySelector('.disc-container.disc-container1')
const discContainer2 = document.querySelector('.disc-container.disc-container2')
const discContainer3 = document.querySelector('.disc-container.disc-container3')
const playBtn = document.getElementById('playBtn')
const stopBtn = document.getElementById('stopBtn')
const speedUpBtn = document.getElementById('speedUpBtn')
const speedDownBtn = document.getElementById('speedDownBtn')
const discColors = ['crimson', 'violet', 'skyblue', 'darkgreen', 'pink', 'blue', 'darkgray', 'greenyellow', 'teal', 'tomato']
let totalDiscLength = 3
let discInfos = []
let speed = 1
let speedTime = 1000
let play = false
let uiInterval = null
let uiIndex = -1

window.onload = () => {
  generateDiscs1(Array.from({ length: totalDiscLength }).map((item, index) => index + 1))
  document.getElementById('tohInput').addEventListener('change', (e) => {
    play = false
    playBtn.innerHTML = 'Play'
    clearInterval(uiInterval)
    uiIndex = -1
    totalDiscLength = parseInt(e.target.value)
    discInfos = []
    generateDiscs1(Array.from({length: parseInt(e.target.value)}).map((item, index) => index + 1))
  })
  playBtn.addEventListener('click', () => {
    if (!play) {
      play = true
      playBtn.innerHTML = 'Pause'
      if (uiIndex === -1) {
        discInfos = []
        generateDiscs1(Array.from({ length: totalDiscLength }).map((item, index) => index + 1))
        Hanoi(totalDiscLength, 1, 3, 2)
      }
      updateTOH_interval()
    } else {
      clearInterval(uiInterval)
      play = false
      playBtn.innerHTML = 'Play'
    }
  })
  stopBtn.addEventListener('click', () => {
    play = false
    playBtn.innerHTML = 'Play'
    clearInterval(uiInterval)
    uiIndex = -1
    discInfos = []
    generateDiscs1(Array.from({ length: totalDiscLength }).map((item, index) => index + 1))
  })
  speedUpBtn.addEventListener('click', () => {
    if (speed === 0) return
    if (speed <= 0.9) {
      speed += 0.1
      speedSpan.innerHTML = `1 disc/${(speedTime / 1000).toFixed(2)} second`
    } else {
      ++speed
      speedSpan.innerHTML = `${speed.toFixed(2)} disc(s)/second`
    }
    

    speedTime = 1000 / speed
    if (play) updateTOH_interval()
  })
  speedDownBtn.addEventListener('click', () => {
    if (speed < 0.2) return
    if (speed > 1) {
      --speed
      speedSpan.innerHTML = `${speed.toFixed(2)} disc(s)/second`
    }
    else {
      speed -= 0.1
      speedSpan.innerHTML = `1 disc/${(speedTime / 1000).toFixed(2)} second`
    }
    speedTime = 1000 / speed
    if (play) updateTOH_interval()
  })
}

const Hanoi = (n, from, to, via) => {
  if (n == 0) return
  Hanoi(n - 1, from, via , to)
  moveDisk(from,to, via)
  Hanoi(n-1, via, to , from)
}
const moveDisk = (from, to, via) => {
  // console.log('info: ', from, via, to)
  let lastIndex = discInfos.length - 1
  let lastItem = discInfos[lastIndex]
  let lastItemFrom = discInfos[lastIndex][`d${from}`]
  let lastItemFromFirst = discInfos[lastIndex][`d${from}`][0]
  let lastItemTo = discInfos[lastIndex][`d${to}`]
  
  discInfos = [
    ...discInfos,
    {
      ...lastItem, 
      [`d${from}`]: lastItemFrom.filter((item, index) => index !== 0),
      [`d${to}`]: [lastItemFromFirst, ...lastItemTo]
    }
  ]
  
}

const generateDiscs1 = (discArray) => {
  const widthdiff = 18 / discArray.length
  let discInfo1 = discArray.reverse().map((item, index) => ({
    id: item,
    color: discColors[item - 1],
    width: 20 - widthdiff * (index)
  }))
  discInfo1 = discInfo1.reverse()
  discInfos = [{
    d1: discInfo1,
    d2: [], 
    d3: []
  }]
  updateTOH_interval()
}

const updateTOH_interval = () => {
  clearInterval(uiInterval)
  if (uiIndex === -1) updateTOH()
  uiInterval = setInterval(() => { 
    updateTOH()
  }, speedTime)
  
}


const updateTOH = () => {
  ++uiIndex
  if (uiIndex === discInfos.length) {
    clearInterval(uiInterval)
    uiIndex = -1
    play = false
    playBtn.innerHTML = 'Play'
    return
  }
  
  let data = ''
  discInfos[uiIndex]?.d1.forEach((item, index) => {
    data += `<div 
    class="disc-item disc-item${item.id}" 
    style="width: ${item.width}rem; background-color: ${item.color}"></div>`
  })
  discContainer1.innerHTML = data

  data = ''
  discInfos[uiIndex]?.d2.forEach((item, index) => {
    data += `<div 
    class="disc-item disc-item${item.id}" 
    style="width: ${item.width}rem; background-color: ${item.color}"></div>`
  })
  discContainer2.innerHTML = data

  data = ''
  discInfos[uiIndex]?.d3.forEach((item, index) => {
    data += `<div 
    class="disc-item disc-item${item.id}" 
    style="width: ${item.width}rem; background-color: ${item.color}"></div>`
  })
  discContainer3.innerHTML = data
}

