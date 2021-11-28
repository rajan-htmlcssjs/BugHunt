const sections = document.getElementsByTagName('section')
const startGameBtn = document.getElementById('start-game-btn')
const scoresEle = document.getElementById('scores')
const timeEle = document.getElementById('time-remaining')
const insectGroup = document.querySelector('.insects-list')
const insectGroupImgs = document.querySelectorAll('.insects-list img')

let allImageSources = []
let score = 0
let timePending = 90

insectGroupImgs.forEach((ele)=> allImageSources.push(ele.src))
let selectedInsectSrc = ''
const gameLvl = 1

  

startGameBtn.addEventListener('click',()=>{
    sections[0].classList.add('up')
})

insectGroup.addEventListener('click',(e)=>{
    console.log(e.target.src)
    selectedInsectSrc = e.target.src
    sections[1].classList.add('up')
    startGame()
})

function startGame(){
    spawInsects()
    startCountDown()
}

function getRandomLoc(){
    return {
        w: Math.random() * window.innerWidth,
        h: Math.random() * window.innerHeight,
    }
}

function spawInsects(){
    setInterval(()=>{
        const { w , h} = getRandomLoc()
        const Insect = document.createElement('button')
        Insect.classList.add('created-insect-btn')
        Insect.style.height = 100/gameLvl + "px"
        Insect.style.width = 100/gameLvl + "px"
        Insect.style.top =  h + "px"
        Insect.style.left = w + "px"
        Insect.innerHTML = `
        <img
        src=${allImageSources[parseInt(Math.random() * 4) ]}
        alt="target"
        />
        `
        Insect.addEventListener('click',handleInsectClick)
        sections[2].appendChild(Insect)
        setTimeout(()=>Insect.remove(),2000)
    },1000/gameLvl)
}

function handleInsectClick(e){
    if(e.target.src === selectedInsectSrc){
        score++
        scoresEle.style.color='#000'
    }else{
        score--
        scoresEle.style.color='#f00'
    }
    scoresEle.innerText = `Scores: ${score}`
    this.remove()
}

function startCountDown(){
    timeEle.innerText = `Time Remaining : ${timePending}`
    if(timePending <= 0){
        alert('Your socres are '+score)
        window.location.reload(true)
        return
    }
    setTimeout(() => {
        timePending--
        startCountDown()
    }, 1000);
}