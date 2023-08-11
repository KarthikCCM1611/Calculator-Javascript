let currentInputEle; 
let answerScreenEle;
let inputValues = []; 

const handleClick = (args) =>{
    let currentId = args.target.id;
    if(currentId.includes("cancel")){
        currentInputEle.innerHTML = "";
        answerScreenEle.innerHTML = 0;
        inputValues = [];
    }
    else if(currentId.includes("erase")){
        inputValues.pop();
        if(inputValues.length > 0){
            if(isNaN(inputValues[inputValues.length-1])){
                currentInputEle.innerHTML = inputValues.join("");              
                var val = [...inputValues];  
                val.pop();
                answerScreenEle.innerHTML = eval(val.join(""));        
            }
            else{
                currentInputEle.innerHTML = inputValues.join("");
                answerScreenEle.innerHTML = eval(inputValues.join(""));        
            }
        }
        else{
            currentInputEle.innerHTML = "";
            answerScreenEle.innerHTML = 0;
        }
    }
    else if(!currentId.includes("evaluate")){
        let currentVal = args.target.textContent === "x" ? "*" : args.target.textContent;
        if(inputValues.length === 0){
            inputValues.push(currentVal);
            currentInputEle.innerHTML = inputValues.join("");
            if(args.target.classList.contains("num-btn")){
                answerScreenEle.innerHTML = eval(inputValues.join(""));
            }    
        }
        else if(!(isNaN(currentVal) && isNaN(inputValues[inputValues.length-1]))){
            inputValues.push(currentVal);
            currentInputEle.innerHTML = inputValues.join("");
            if(args.target.classList.contains("num-btn")){
                answerScreenEle.innerHTML = eval(inputValues.join(""));
            }    
        }
    }
}

const renderCalculatorUI = () =>{
    var container = document.getElementById("container");

    let displaySection = document.createElement("section");
    displaySection.id = "display_area";
    displaySection.classList.add("display-area");


    var currentInput = document.createElement("div");
    currentInput.id = "current_input"; 
    currentInput.classList.add("current-input");    

    var answerScreen = document.createElement("div");
    answerScreen.id = "answer_screen";
    answerScreen.classList.add("answer-screen");
    answerScreen.textContent = 0;

    displaySection.appendChild(currentInput);
    displaySection.appendChild(answerScreen); 

    let keyBoardSection = document.createElement("section");
    keyBoardSection.id = "keypad_btns";
    keyBoardSection.classList.add("keypad-btns"); 

    let keyBoardBtns = ["C", "&#11013;", "/", "%", 7, 8, 9, "x", 4, 5, 6, "-", 1, 2, 3, "+", "00", 0, ".", "="];
    keyBoardBtns.map(btnVal =>{
        let button = document.createElement("button");
        if(!isNaN(btnVal)){
            button.id = "num_btn"
            button.innerHTML = `${btnVal}`;
            button.classList.add("num-btn");
        }
        else{
            if(btnVal === "="){
                button.id = "fun_btn evaluate"
                button.innerHTML = `${btnVal}`;           
                button.classList.add("fun-btn");     
            }
            else if(btnVal === "C"){
                button.id = "fun_btn cancel"
                button.innerHTML = `${btnVal}`;  
                button.classList.add("fun-btn");
            }
            else if(btnVal === "&#11013;"){
                button.id = "fun_btn erase"
                button.innerHTML = `${btnVal}`;  
                button.classList.add("fun-btn");
            }
            else{
                button.id = "fun_btn"
                button.innerHTML = `${btnVal}`;    
                button.classList.add("fun-btn");
            }
        }
        button.addEventListener("click", handleClick)
        keyBoardSection.appendChild(button);
    })
    container.appendChild(displaySection);
    container.appendChild(keyBoardSection);

    currentInputEle = document.getElementById("current_input"); 
    answerScreenEle = document.getElementById("answer_screen");
}

renderCalculatorUI();