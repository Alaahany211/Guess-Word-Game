// Game Named
let gameName = "Guess Word Game"
document.title = gameName
document.querySelector("h1").innerHTML=gameName
document.querySelector("footer").innerHTML=gameName
// declrear varibales
let inputCountainer = document.querySelector(".inputs") 
let trys = 6
let letters = 6
let current = 1
let hintNumers=3
let wordToGuess = ""
let words =[
    "action", "advice", "amount", "animal", "answer", "appear", "around", "arrive", "artist", "aspect",
    "autumn", "became", "become", "before", "behind", "belief", "better", "beyond", "bishop", "border",
    "bottle", "bottom", "bought", "branch", "bridge", "bright", "broken", "budget", "burden", "button",
    "camera", "canvas", "carbon", "career", "castle", "caught", "center", "chance", "change", "charge",
    "choice", "choose", "church", "circle", "client", "closed", "closer", "coffee", "column", "combat",
    "common", "comply", "copper", "corner", "costly", "county", "couple", "course", "covers", "create",
    "credit", "crisis", "custom", "damage", "danger", "degree", "demand", "design", "detail", "device",
    "dinner", "direct", "doctor", "dollar", "domain", "double", "driven", "driver", "during", "easily",
    "eating", "editor", "effect", "effort", "eighth", "either", "eleven", "emerge", "empire", "employ",
    "energy", "engine", "enough", "escape", "events", "expect", "expert", "export", "fabric", "famous"
];
 wordToGuess= words[(Math.floor(words.length * Math.random()))].toLowerCase()
// Create Div and inputs
function createTry() {
    // Create Div 
    for (let i = 0; i < trys; i++) {
    wordwContainer = document.createElement("div")
    wordwContainer.classList.add(`try-${i+1}`)

    span = document.createElement("span")
    spanInfo=document.createTextNode(`Try ${i+1}`)
    span.appendChild(spanInfo)
    wordwContainer.appendChild(span)
    inputCountainer.appendChild(wordwContainer)
    if (i != 0) wordwContainer.classList.add("disable")
    // Create inputs
    for (let y = 0; y < letters; y++) {
        input=  document.createElement("input")
        input.type = "text"
        input.id = `try-${i+1}-letter-${y+1}`
        input.setAttribute("maxlength","1")
        wordwContainer.appendChild(input)
    }
    // Make Not Current Div Disable
    let inputsDisable = document.querySelectorAll(".disable input")
    inputsDisable.forEach(input => input.disabled = true);
    // If Input Full focus On Next Input
    let allInputs = document.querySelectorAll("input")
    allInputs.forEach((e,index)=>{
        e.addEventListener("input",function () {
            e.value=e.value.toUpperCase()
            let nextInput = allInputs[index+1]
            if (nextInput) {
                nextInput.focus()
            }
        })
    })
    allInputs.forEach((e,index)=>{
        e.addEventListener("keydown",function (event) {
                if (event.code === "ArrowRight")
                {
                    let nextInput = allInputs[index+1]
                    if (nextInput) {
                        nextInput.focus()
                    }
                }
                if (event.code === "ArrowLeft")
                {
                    let preInput = allInputs[index-1]
                    if (preInput) {
                        preInput.focus()
                    }
                }
            
        })
    })
}
// Make Auto Focus On First Inpute
inputCountainer.children[0].children[1].focus()
}
window.onload= function () {createTry() }

// Buttons
let guessButton = document.querySelector(".check")
let hints = document.querySelector(".hints")
hints.innerHTML=`<span>${hintNumers}</span> Hints`

// last Massage
let massage = document.querySelector(".massage")

// Check Letters
function checkLetter() {
    succsesPlace = true
    for (let i = 1; i <= letters ; i++) {
        let inputField = document.querySelector(`#try-${current}-letter-${i}`)
        let letter = inputField.value.toLowerCase()
        // if right letter and  in right place 
        if(letter === wordToGuess[i-1]){
            inputField.classList.add("yes-in-place")
        }
        // if right letter and not in right place 

        else if(wordToGuess.includes(letter) && letter !== ""){
            inputField.classList.add("yes-not-in-place")
            succsesPlace=false
        }
        // if not Correct
        else{
            succsesPlace=false
            inputField.classList.add("no")
        }
    }
    // Succses sitioation
    if (succsesPlace) {
        massage.innerHTML=`<span>You Win The Word Is </span><p>${wordToGuess}</p>`
        guessButton.disabled = true
        guessButton.classList.add("disable")
        hints.disabled = true
        hints.classList.add("disable")
        let alldivs=document.querySelectorAll(".inputs div")
        alldivs.forEach((divs)=>divs.classList.add("disable"))
    }
    // Wrong sitioation
    else{
        netxElem=document.querySelector(`.try-${current+1}`)

        if (netxElem) {
            document.querySelector(`.try-${current}`).classList.add("disable")
            let currentInputs= document.querySelectorAll(`.try-${current} input`)
            currentInputs.forEach(e=>e.disabled = true)
            
            current++

            document.querySelector(`.try-${current}`).classList.remove("disable")
            let nextInputs= document.querySelectorAll(`.try-${current} input`)
            nextInputs.forEach(e=>e.disabled = false)
            netxElem.children[1].focus()

        }else{
            massage.innerHTML=`<span>You Lose The Word Is </span><p>${wordToGuess}</p>`
            guessButton.classList.add("disable")
            hints.classList.add("disable")

            document.querySelector(`.try-${current}`).classList.add("disable")
            let currentInputs= document.querySelectorAll(`.try-${current} input`)
            currentInputs.forEach(e=>e.disabled = true)
    }
    }

}

// hints
function giveHint() {
    let currentTryInputs=Array.from(document.querySelectorAll(`.try-${current} input`))

    let emptyInputs = currentTryInputs.filter(e => e.value == "" );
    let randomIndex = Math.floor(Math.random()*emptyInputs.length)
    
    let randomInputes = emptyInputs[randomIndex]
    
    let inputToFill = Array.from(currentTryInputs).indexOf(randomInputes)
    if ( hintNumers > 0&& Array.from(emptyInputs).length>0) {
        randomInputes.value = wordToGuess[inputToFill].toUpperCase()
        hintNumers--
        hints.innerHTML=`<span>${hintNumers}</span> Hints`
    }
    if(hintNumers===0){
        hints.disabled=true
        hints.classList.add("disable")
    }
}
//BackSpace
function handelBackSpeace(event) {
    if (event.key === "Backspace") {
        let inputs=document.querySelectorAll(`.try-${current} input`)
        let currentElement =Array.from(inputs).indexOf(document.activeElement)
        inputs[currentElement].value = ""
        if (inputs[currentElement-1]) {
            inputs[currentElement-1].value=""
            inputs[currentElement-1].focus()
        }
    }
}
guessButton.addEventListener(("click"),checkLetter)
hints.addEventListener(("click"),giveHint)
document.addEventListener("keydown",handelBackSpeace)
