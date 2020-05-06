const game = document.querySelector(".game")
const daysCounter = document.querySelector(".dayCount")

const population = document.querySelector("#population")
const populationText = document.querySelector(".population-text")

const land = document.querySelector("#land")
const landText = document.querySelector(".land-text")

const evoliution = document.querySelector("#evoliution")
const evoliutionText = document.querySelector(".evoliution-text")



let populationSize = 15

let daysCount = 1
let positionLog = []
let bordSize = 20
let evoliutionSpeed = 1000


population.oninput = function (){
    let currentValue = population.value
    populationSize = currentValue
    populationText.innerHTML = currentValue

    daysCount = 1
    positionLog = []
    game.innerHTML = ""
    addCells()
}

land.oninput = function (){

    let currentValue = land.value

    bordSize = parseInt(currentValue, 10) 
    landText.innerHTML = currentValue

    daysCount = 1
    positionLog = []
    game.innerHTML = ""
    addCells()
}

evoliution.oninput = function (){

    let currentValue = evoliution.value

    evoliutionSpeed = 5000 - (4900*(currentValue/100)) 
    evoliutionText.innerHTML = Math.floor(evoliutionSpeed) + " ms/day"

    daysCount = 1
    positionLog = []
    game.innerHTML = ""
    addCells()
}


const addCells = ()=>{
    const cellNumer = bordSize * bordSize
    let cellHTML = ""

    for(let i = 0; i<cellNumer; i++){

        let isBlack = Math.random()
        let classname = isBlack>populationSize/100 ? "white":"black"

        cellHTML += `<div class="${classname} box" id = Nr${i} style="width:${100/bordSize}%; height:${100/bordSize}%" class="box"></div>`
    }
    game.innerHTML = cellHTML
}

addCells()

let days 

function startIteration(){
    days = setInterval(()=>{
        
        daysCounter.innerHTML = "Day: " + daysCount
        let allCells = document.querySelectorAll(".box")
        let aliveAround = []
    
        for (let i = 0; i < allCells.length; i++) {
            aliveAround.push(checkAlive(i))
        }
        checkForDup(aliveAround)
        positionLog.push(aliveAround)
    
        for(let i=0;i<allCells.length;i++){
            // action with Dead cells
            if(allCells[i].classList.contains("white")){
                // Dead cell gets resurected
                if(aliveAround[i] === 3){
                    allCells[i].classList.remove("white")
                    allCells[i].classList.add("black")
                }
            }
            // action with Alive cells
            if(allCells[i].classList.contains("black")){
                // alive cell dies from underpopulation
                if(allCells[i].classList.contains("black") && aliveAround[i]<2){
                    allCells[i].classList.remove("black")
                    allCells[i].classList.add("white")
                }
                // alive cell dies from overpopulation
                if(allCells[i].classList.contains("black") && aliveAround[i]>3){
                    allCells[i].classList.remove("black")
                    allCells[i].classList.add("white")
                }
            }
        }
        daysCount++
        if(daysCount>50){
            clearInterval(days)
        }
        
    },evoliutionSpeed)  
}

// startIteration()

const checkAlive = (index)=>{
    let liveCount = 0

    if(game.querySelector(`#Nr${(index-1) - bordSize }`) !== null && game.querySelector(`#Nr${(index-1) - bordSize}`).classList.contains("black")){
        if(index%bordSize !== 0){
            liveCount++
        }
    }
    if(game.querySelector(`#Nr${(index) - bordSize }`) !== null && game.querySelector(`#Nr${(index) - bordSize}`).classList.contains("black")){
        liveCount++
    }
    if(game.querySelector(`#Nr${(index+1) - bordSize }`) !== null && game.querySelector(`#Nr${(index+1) - bordSize}`).classList.contains("black")){
        
        if((index+1)%bordSize  !== 0){
            liveCount++
        }
    }
    if(game.querySelector(`#Nr${index-1}`) !== null && game.querySelector(`#Nr${index-1}`).classList.contains("black")){
        if(index%bordSize !== 0){
            liveCount++
        }
    }
    if(game.querySelector(`#Nr${(index+1)}`) !== null && game.querySelector(`#Nr${(index+1)}`).classList.contains("black")){
        if((index+1)%bordSize !== 0){
            liveCount++
        }
    }
    if(game.querySelector(`#Nr${(index-1) + bordSize }`) !== null && game.querySelector(`#Nr${(index-1) + bordSize}`).classList.contains("black")){
        if(index%bordSize !== 0){
            liveCount++
        }
    }
    if(game.querySelector(`#Nr${(index) + bordSize }`) !== null && game.querySelector(`#Nr${(index) + bordSize}`).classList.contains("black")){
        liveCount++
    }
    if(game.querySelector(`#Nr${(index+1) + bordSize }`) !== null && game.querySelector(`#Nr${(index+1) + bordSize}`).classList.contains("black")){
        if((index+1)%bordSize !== 0){
            liveCount++
        }
    }
    return liveCount
}

const checkForDup = (arr) =>{
    let counter = 0;
    for(let i = 0;i<positionLog.length;i++){
            for(let j=0;j<positionLog[i].length;j++){
                if(arr[j] == positionLog[i][j]){
                counter++ 
                }  
            }
            if(counter == arr.length){

            clearInterval(days)

            game.classList.add("redBorder")
            daysCounter.innerHTML += ` . Same population distribution as at day: ${i+1}. Game of life has ended`
            daysCounter.style.fontSize = "30px" 
            }
            counter = 0
    }
}

function removeLanding(){
    document.querySelector(".landing").style.visibility = "hidden"
}
function reload(){
    location.reload();
}