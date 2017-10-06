window.onload = (()=>{
/*********************
get elements
*********************/
const grabEl = (el)=>{
  return document.getElementById(el);
}
/****************
get input values
****************/
const getInput = (el)=>{
  return grabEl(el).value;
}

const getChecked = (el)=>{
  return grabEl(el).checked;
}

/***************************
variables representing pages
****************************/
const signIn = grabEl('sign-in');
const quiz = grabEl('quiz');
const finish = grabEl('finish');
const assesInfo = grabEl("assesment-info");
/************
Error Object
************/
const error = {};
error.signup = "Not Completed";
const showError = grabEl('error');
/***************
event variables....the thing being clicked or listening to event
***************/
const getSignIn = grabEl("getSignIn");
const proceed = grabEl("proceed");
const getQuiz = grabEl("getQuiz");
const getWelcome = grabEl("getWelcome");

//Quiz
const getQuestion = grabEl("getQuestion");
/**************************
get input values
1.signup form
2.quiz values
**************************/
let customerInfo = {
  firstName: null,
  lastName: null,
  email: null,
  ein: null
};
/**************************
variables with state change....the thing thats changing
**************************/
//sign-in
let signInForm = grabEl('signInForm');

//quiz
let qCount = 0;
let qAnswers = [];
let q = grabEl('quiz-question');
let c1 = grabEl('choice1');
let c2 = grabEl('choice2');
let c3 = grabEl('choice3');
let c4 = grabEl('choice4');
let c1Text = grabEl('choice1-choice');
let c2Text = grabEl('choice2-choice');
let c3Text = grabEl('choice3-choice');
let c4Text = grabEl('choice4-choice');

const showScore = grabEl('score');
/**************************
variables for server
**************************/
let cinfo;
let postInfo;
let score;
let postScore;

const postData = ()=>{
  const init = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ "info": postInfo, "score": postScore}),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };

  fetch("https://eletrical-assesment-grid.herokuapp.com/finish",init)
    .then((res)=>{
    }).catch((res) => {
    });
}

/**************************
Utility Functions
**************************/
//functions for ui changes
const chDisplay = (el, value)=> {
  return el.style.display = value;
}
const upCount = (count) => {
  return count++;
}

//functions for event changes
const handleClicks = (el, cb) => {
   return el.onclick = (e) => {
    e.preventDefault();
    return cb();
  }
}

/******************
Handle SignUp form
******************/
const getForm = () => {
  const getInfo = { infoData: "validateInfo"};
  history.pushState(getInfo, "signIn", "info.html");
  chDisplay(signInForm,"flex");
  chDisplay(getWelcome, "none");
}

handleClicks(getSignIn, getForm);

const checkEmpty = (val)=>{
  if(val === null || val === "undefined" || val === ""){
    return false;
  } else {
    return true;
  }
}

const displayError = (error)=>{
  chDisplay(showError, "block");
  return showError.innerHTML = error + " not completed";
}

const checkName = (name)=>{
  if(checkEmpty(name) === true){
    return true;
  } else {
    return false;
  }
}

const checkEmail = (email)=>{
 if(checkEmpty(email) === true){
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      return (true)
    } else {
      return (false)
    }
  }
}

const checkEin = (ein)=>{
  if(checkEmpty(ein) === true){
    if(ein.length > 4 && ein.length < 7){
      return (true)
    } else {
      return (false)
    }
  }
}

proceed.onclick = function(e){
  e.preventDefault();

  const firstName = getInput('nameInput');
  const lastName = getInput('nameInput2');
  const emailInput = getInput('emailInput');
  const ein = getInput('einInput');

  if(checkName(firstName) !== true){
    return displayError("first name");
  } else {
    customerInfo.firstName = firstName;

    if(checkName(lastName) !== true){
      return displayError("last name");
    } else {
      customerInfo.lastName = lastName;

      if(checkEmail(emailInput) !== true){
        return displayError("email");
      } else {
        customerInfo.email = emailInput;

        if(checkEin(ein) !== true){
          return displayError("ein");
        } else {
          customerInfo.ein = ein;
        }
      }
    }
  }

  if(customerInfo.ein != null){
    localStorage.setItem("info", JSON.stringify(customerInfo));
    cinfo = JSON.parse(localStorage.getItem("info"));
    postInfo = JSON.stringify(customerInfo);
    return getAssesInfo();
  } else {
    return displayError("fields are required");
  }

}
/******************
assesment info
******************/
let getAssesInfo = () => {
  const getAsses = { assesData: "Assesment"};
  history.pushState(getAsses, "assement", "assement");
    chDisplay(assesInfo,"block");
    chDisplay(signInForm,"none");
    chDisplay(signIn,"none");
}

//handleClicks(proceed, getAssesInfo);
/******************
Handle Quiz
******************/
let startQuiz = () => {
  const getQuizData = { quizData: "quizData"};
  history.pushState(getQuizData, "quizData", "quiz");
  chDisplay(quiz, 'block');
  chDisplay(assesInfo, "none");
}

handleClicks(getQuiz, startQuiz);

let addAnswer = (answer) => {
  qAnswers.push(answer);
}

q.innerHTML = (qCount + 1) + ". " + QuizData[qCount].question;
c1Text.innerHTML = QuizData[qCount].choices[0].a1;
c2Text.innerHTML = QuizData[qCount].choices[1].a2;
c3Text.innerHTML = QuizData[qCount].choices[2].a3;
c4Text.innerHTML = QuizData[qCount].choices[3].a4;

getQuestion.onclick = function(e){
  e.preventDefault();

  qCount++;
  if(qCount >= QuizData.length){
    qCount = 0;
  }

  const question = QuizData[qCount];
  q.innerHTML = (qCount + 1) + ". " + QuizData[qCount].question;
  q.innerHTML = (qCount + 1) + ". " + QuizData[qCount].question;
  c1Text.innerHTML = QuizData[qCount].choices[0].a1;
  c2Text.innerHTML = QuizData[qCount].choices[1].a2;
  c3Text.innerHTML = QuizData[qCount].choices[2].a3;
  c4Text.innerHTML = QuizData[qCount].choices[3].a4;

  const answer1 = getChecked('choice1');
  const answer2 = getChecked('choice2');
  const answer3 = getChecked('choice3');
  const answer4 = getChecked('choice4');

  const ops = [answer1,answer2,answer3,answer4];

  const chose = ops.map((answered, i)=>{
    if(answered != false){
      i = i + 1;
      console.log(i);
      return i;
    }
  })

  const chosen = chose.filter((item,i)=>{
    if(item != 'undefined' || item != " " || item != 0){
      console.log(item);
      return item;
    }
  });

  addAnswer(chosen);

  c1.checked = false;
  c2.checked = false;
  c3.checked = false;
  c4.checked = false;

  if(qCount === QuizData.length -1){
    getQuestion.setAttribute("value", "finish");
  }

  if(getQuestion.getAttribute("value") == "finish"){
    handleClicks(getQuestion, getFinish);
  }

}
/******************
Handle finish
******************/
//handle quiz answers
const getQuizAnswers = (arr)=>{
    return arr.map((item,i,a) => {
            //console.log(a[i].answer);
            return a[i].answer;
          });
}

const flatten = (arr) =>{
	return arr.reduce((all, cur) => {
  return all.concat(cur);
  }, []);
}

const testAnswers = (s,t)=>{
  s.pop();
  let toSee = s.map((item,i,arr)=>{
  				 if(item.length !== t[i].length){
           	 return "wrong";
           } else {
           		if(Number(flatten(item)) === Number(flatten(t[i]))){
              return "correct";
              }else {
              	return "wrong";
              }
           }
    });
    return toSee;
}

//handleCalculation
const calcScore = (arr)=>{
  let scoreCount = 0;
  let i;
  for(i = 0; i < arr.length; i++){
    if(arr[i] === "correct"){
      scoreCount++;
    }
  }
  return scoreCount;
}

const getPercent = (num)=>{
  const result = (num / qAnswers.length) * 100;
  return result;
}

//handle displaying text
const writeScore = (scr)=>{
  const yc = calcScore(scr);
  return showScore.innerHTML = `Your score: ${Math.floor(getPercent(yc))}%`;
}

const getFinish = ()=>{
  const finishData = { finishData: "finishData"};
  history.pushState(finishData, "finishData", "finish");

  localStorage.setItem("assesmentScore", JSON.stringify(qAnswers));
  score = JSON.parse(localStorage.getItem("assesmentScore"));

  const yourScore = testAnswers(getQuizAnswers(QuizData), score);
  postScore = JSON.stringify(getPercent(calcScore(yourScore)));

  writeScore(yourScore);
  postData();
  chDisplay(finish, "block");
  chDisplay(quiz, "none");
}

})();
