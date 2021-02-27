//Setting variable
var questions = [
    {
        title: "What does NaN represent?",
        choices: ["None","Nothing","Not a Norm","Not a Number"],
        answer: "Not a Number",
    },
    {
        title: "What are NOT types of variables?",
        choices: ["Var","Const","Let","State"],
        answer: "State",
    },
    {
        title: "What is a data type?",
        choices: ["String","Letter","Baloon","Acronym"],
        answer: "String",
    },
];
//Setting for timer
var timer;
var time = 90;
var startButton = document.querySelector("#start");
function initiateQuiz() {
    //hide start screen
    document.querySelector("#start-screen").setAttribute("class","hide");

    //unhide the questions class
    document.querySelector("#questions").removeAttribute("class");

    //show time
    document.querySelector("#time").textContent = time;

    //Start timer
    timer = setInterval(function() {
        //decrease the time
        time--;

        //show the updated time
        document.querySelector("#time").textContent = time;

        //check if timer ran out
        if (time <= 0) {
            endQuiz();
        }
    },1000);
    
    //show the question
    showQuestion(); 
} 
var questionIndex = 0;
var score = 0;
function handleQuestionClick(event) {

    var target = event.target.textContent;
    var answer = questions[questionIndex].answer;

    //check if question is right
    if (target === answer) {
        //add to score
        score++;
    } else {
        //If answer is wrong then taken 10 sec away from the timer
        time = time -10;
    }

    //show the next question
    questionIndex++;
    showQuestion();

    //check if we should end the quiz becasue it is the last question
    if (questionIndex === questions.length) {
        endQuiz();
    } else {
        showQuestion();
    }
}
function showQuestion() {
    //create the question html
    var questionHTML = `
        <h2 id="question-title">${questions[questionIndex].title}</h2>
        <div id="choices" class="choices">
            <div class="question-choice">${questions[questionIndex].choices[0]}</div>
            <div class="question-choice">${questions[questionIndex].choices[1]}</div>
            <div class="question-choice">${questions[questionIndex].choices[2]}</div>
            <div class="question-choice">${questions[questionIndex].choices[3]}</div>
        </div>
    `;

    //add the question to the page
    document.querySelector("#questions").innerHTML = questionHTML;

    //loop through each choices that now on the page then asign eventlistening ability
    var questionChoiceArray = document.querySelectorAll(".question-choice");

    console.log("questionChoiceArray: ",questionChoiceArray);
    for (i = 0; i < questionChoiceArray.length; i++) {
        //assign event listeners
        questionChoiceArray[i].addEventListener("click", handleQuestionClick);
    }
}
function endQuiz() {
    //stop the timer
    clearInterval(timer);

    //hide the questions
    document.querySelector("#questions").setAttribute("class","hide");

    //show the end screen
    document.querySelector("#end-screen").removeAttribute("class");
}
startButton.addEventListener("click", initiateQuiz);