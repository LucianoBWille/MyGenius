let order = []
let clickedOrder = []
let score = 0

// 0 - green
// 1 - red
// 2 - yellow
// 3 - blue

const blue = document.querySelector('.blue')
const red = document.querySelector('.red')
const yellow = document.querySelector('.yellow')
const green = document.querySelector('.green')

// cria ordem aleatória de cores
let shuffleOrder = () => {
  let colorOrder = Math.floor(Math.random() * 4)
  order.push(colorOrder)
  clickedOrder = []

  for (let i in order) {
    let elementColor = createColorElement(order[i])
    lightColor(elementColor, Number(i) + 1)
  }
}

// acende a próxima cor
let lightColor = (element, number) => {
  let time = number * 500
  setTimeout(() => {
    element.classList.add('selected')
  }, time - 250)
  setTimeout(() => {
    element.classList.remove('selected')
  }, time)
}

// checa se os botoes clicados são os mesmos da ordem gerada no jogo
let checkOrder = () => {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver()
      break
    }
  }
  if (clickedOrder.length == order.length) {
    alert(`Pontuação: ${score}\nVocê Acertou! Iniciando próximo nível!`)
    nextLevel()
  }
}

// função para o clique do usuário
let click = color => {
  clickedOrder.push(color)
  createColorElement(color).classList.add('selected')

  setTimeout(() => {
    createColorElement(color).classList.remove('selected')
    setTimeout(() => {
      checkOrder()
    }, 50)
  }, 250)
}

// função que retorna a cor
let createColorElement = color => {
  switch (color) {
    case 0:
      return green
    case 1:
      return red
    case 2:
      return yellow
    case 3:
      return blue
    default:
      throw new Error('Invalid Color')
  }
}

// função para próximo nível do Jogo
let nextLevel = () => {
  score++
  shuffleOrder()
}

// função para game over
let gameOver = () => {
  alert(
    `Pontuação: ${score}\nVocê perdeu o jogo!\nClique em OK para iniciar um novo jogo!`
  )
  order = []
  clickedOrder = []

  playGame()
}

// função para iniciar o jogo
let playGame = () => {
  alert('Bem vido ao MyGenius! Iniciando novo jogo!')
  score = 0

  nextLevel()
}

// eventos de clique para as cores
green.onclick = () => click(0)
red.onclick = () => click(1)
yellow.onclick = () => click(2)
blue.onclick = () => click(3)

// inicio do jogo
playGame()
