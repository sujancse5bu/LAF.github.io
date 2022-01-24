document.getElementById('tohBtn').addEventListener('click', () => showSection('toh'))






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