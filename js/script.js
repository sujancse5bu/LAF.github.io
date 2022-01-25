const discColors = ['red', 'blue', 'green', 'yellow', 'violet', 'aqua']
let totalDiscLength = 3
let discInfos = []


document.getElementById('tohBtn').addEventListener('click', () => showSection('toh'))

window.onload = () => {
  generateDiscs1(Array.from({ length: 3 }).map((item, index) => index + 1))
  document.getElementById('tohInput').addEventListener('change', (e) => {
    totalDiscLength = parseInt(e.target.value)
    discInfos = []
    generateDiscs1(Array.from({length: parseInt(e.target.value)}).map((item, index) => index + 1))
  })
  document.getElementById('startBtn').addEventListener('click', () => {
    Hanoi(totalDiscLength, 1, 3, 2)
    setTimeout(() => {
      updateTOH_UI()
    }, 1000)
  })
}//

const Hanoi = (n, from, to, via) => {
  if (n == 0) return
  Hanoi(n - 1, from, via , to)
  moveDisk(from,to, via)
  Hanoi(n-1, via, to , from)
}
const moveDisk = (from, to, via) => {
  console.log('info: ', from, via, to)
  let lastIndex = discInfos.length - 1
  let lastItem = discInfos[lastIndex]
  let lastItemFrom = discInfos[lastIndex][`d${from}`]
  let lastItemFromFirst = discInfos[lastIndex][`d${from}`][0]
  let lastItemVia = discInfos[lastIndex][`d${via}`]
  let lastItemFViaFirst = discInfos[lastIndex][`d${via}`][0]
  let lastItemTo = discInfos[lastIndex][`d${to}`]
  // console.log('lastItemFrom: ', from, lastItemFrom)
  
  // console.log('discInfos b:', discInfos)
  discInfos = [ /// removed disc from + add disc via
    ...discInfos,
    {
      ...lastItem, 
      [`d${from}`]: lastItemFrom.filter((item, index) => index !== 0),
      // [`d${via}`]: [lastItemFromFirst, ...lastItemVia]
      [`d${to}`]: [lastItemFromFirst, ...lastItemTo]
    }
  ]
  // lastIndex = discInfos.length - 1
  // lastItem = discInfos[lastIndex]
  // lastItemFrom = discInfos[lastIndex][`d${from}`]
  // lastItemVia = discInfos[lastIndex][`d${via}`]
  // let lastItemTo = discInfos[lastIndex][`d${to}`]
  // lastItemFromFirst = discInfos[lastIndex][`d${from}`][0]
  // lastItemFViaFirst = discInfos[lastIndex][`d${via}`][0]
  // let lastItemFToFirst = discInfos[lastIndex][`d${to}`][0]

  // discInfos = [ /// removed disc via + add disc to
  //   ...discInfos,
  //   {
  //     ...lastItem, 
  //     [`d${via}`]: lastItemVia.filter((item, index) => index !== 0),
  //     [`d${to}`]: [lastItemFViaFirst, ...lastItemTo]
  //   }
  // ]
  
  

  // console.log('discInfos a: ', discInfos)


}

const generateDiscs1 = (discArray) => {
  const widthdiff = 9 - discArray.length
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
  updateTOH_UI()
}

const updateTOH_UI = () => {
  const discContainer1 = document.querySelector('.disc-container.disc-container1')
  const discContainer2 = document.querySelector('.disc-container.disc-container2')
  const discContainer3 = document.querySelector('.disc-container.disc-container3')
  console.log('disc1: ', discInfos)
  let index = -1
  const uiInterval = setInterval(() => { 
    ++index
    if (index === discInfos.length) {
      clearInterval(uiInterval)
      return
    }
    console.log('index: ', index, discInfos[index])

    let data = ''
    discInfos[index]?.d1.forEach((item, index) => {
      data += `<div 
      class="disc-item disc-item${item.id}" 
      style="width: ${item.width}rem; background-color: ${item.color}"></div>`
    })
    discContainer1.innerHTML = data
    console.log('data1: ', data)

    data = ''
    discInfos[index]?.d2.forEach((item, index) => {
      data += `<div 
      class="disc-item disc-item${item.id}" 
      style="width: ${item.width}rem; background-color: ${item.color}"></div>`
    })
    discContainer2.innerHTML = data
    console.log('data2: ', data)

    data = ''
    discInfos[index]?.d3.forEach((item, index) => {
      data += `<div 
      class="disc-item disc-item${item.id}" 
      style="width: ${item.width}rem; background-color: ${item.color}"></div>`
    })
    discContainer3.innerHTML = data
    console.log('data3: ', data)

    // clearInterval(uiInterval)
    // return
  }, 1000)
  
  console.log(discContainer1)
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

