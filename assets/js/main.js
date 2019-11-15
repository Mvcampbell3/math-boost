const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);

function startGame() {
  clearHTML();
  loadChoices();
}

function clearHTML() {
  document.getElementById('container').innerHTML = '';
  document.getElementById('container').style.display = 'none';
}

function loadChoices() {
  const container = document.getElementById('container');

  const choiceHolder = document.createElement('div');
  choiceHolder.classList = 'choiceHolder';

  const sayNumbers = document.createElement('button');
  sayNumbers.classList = 'btn sayNumbersBtn choiceBtn'
  sayNumbers.textContent = 'Say Numbers'
  sayNumbers.addEventListener('click', playSayNumbers);

  const addNumbers = document.createElement('button');
  addNumbers.classList = 'btn addNumbersBtn choiceBtn';
  addNumbers.textContent = 'Add Numbers';
  addNumbers.addEventListener('click', playAddNumbers)

  const countingNumbers = document.createElement('button');
  countingNumbers.classList = 'btn countingNumbersBtn choiceBtn';
  countingNumbers.textContent = 'Count Numbers';
  countingNumbers.addEventListener('click', playCountingNumbers);

  choiceHolder.append(sayNumbers, addNumbers, countingNumbers);
  container.append(choiceHolder);

  container.style.display = 'block'
}

function playSayNumbers() {
  console.log('say numbers')
  clearHTML();
  let question = 0;

  const questionHolder = document.createElement('div');
  questionHolder.classList = 'questionHolder'

  const questionText = document.createElement('h4');
  questionText.textContent = 'Say the number below out loud, then press the next button';
  questionText.classList = 'questionText text-center';

  const numberPlace = document.createElement('h2');
  numberPlace.classList = 'text-center numberPlace';
  numberPlace.textContent = Math.floor(Math.random() * 40);

  const nextBtn = document.createElement('button');
  nextBtn.textContent = question === 4 ? 'Last One' : 'Next';
  nextBtn.classList = 'btn nextBtn';
  nextBtn.addEventListener('click', nextNumber);

  function nextNumber() {
    if (question < 4) {
      let newNumber = Math.floor(Math.random() * 40);
      numberPlace.textContent = newNumber;
      question++;
    } else {
      console.log('done');
      clearHTML();
      awesomeJob();
    }
  }

  questionHolder.append(questionText, numberPlace, nextBtn);

  container.append(questionHolder);

  document.getElementById('container').style.display = 'block';
}

function playAddNumbers() {
  console.log('add numbers')
  clearHTML();
  const number_1 = randomNumber(10, 0);
  const number_2 = randomNumber(10, 0);

  const sum_number = number_1 + number_2;

  const answers = [sum_number];

  for (let i = 0; i < 3; i++) {
    checkAnswers();
  }

  function checkAnswers() {
    let wrong_answer = randomNumber(20, 0);
    if (answers.indexOf(wrong_answer) === -1) {
      answers.push(wrong_answer)
    } else {
      console.log('re-roll')
      checkAnswers()
    }
  }

  console.log(answers)

  console.log(number_1, number_2, number_2 + number_1);


  const questionHolder = document.createElement('div');
  questionHolder.classList = 'questionHolder';

  const questionText = document.createElement('h3');
  questionText.textContent = `${number_1} + ${number_2}?`;
  questionText.classList = 'questionText text-center';

  const answerBox = document.createElement('div');
  answerBox.classList = 'answerBox';

  const answer_1 = document.createElement('button');
  const answer_2 = document.createElement('button');
  const answer_3 = document.createElement('button');
  const answer_4 = document.createElement('button');

  const answers_btns = [answer_1, answer_2, answer_3, answer_4];
  answers_btns.forEach(answer => {
    answer.classList = 'btn answerBtn';
    answer.addEventListener('click', evalAnswer);
  })

  const answer_order = [];

  function returnAnswerIndex() {
    const random_index = randomNumber(4, 0);
    if (answer_order.indexOf(random_index) === -1) {
      answer_order.push(random_index);
    } else {
      returnAnswerIndex();
    }
  }

  for (answer of answers) {
    returnAnswerIndex()
  }

  console.log(answer_order)

  console.log(answers)

  answer_1.textContent = answers[answer_order[0]];
  answer_2.textContent = answers[answer_order[1]];
  answer_3.textContent = answers[answer_order[2]];
  answer_4.textContent = answers[answer_order[3]];

  answer_1.setAttribute('data-answer', answers[answer_order[0]])
  answer_2.setAttribute('data-answer', answers[answer_order[1]])
  answer_3.setAttribute('data-answer', answers[answer_order[2]])
  answer_4.setAttribute('data-answer', answers[answer_order[3]])

  let wrong = false;

  function evalAnswer() {
    console.log(this.dataset.answer);
    console.log(sum_number)
    if (parseInt(this.dataset.answer) === sum_number) {
      console.log('correct')
      clearHTML();
      awesomeJob(0)
    } else {
      if (!wrong) {
        wrong = true;
        const errorLine = document.createElement('h4');
        errorLine.classList = 'error text-center';
        errorLine.textContent = 'try again!'
        document.getElementById('container').append(errorLine)
      }

      console.log('wrong')
      this.classList.add('wrongAnswer')

    }
  }

  answerBox.append(answer_1, answer_2, answer_3, answer_4);

  questionHolder.append(questionText, answerBox);

  const container = document.getElementById('container');
  container.append(questionHolder);
  container.style.display = 'block';
}

function playCountingNumbers() {
  console.log('counting numbers')
}

function randomNumber(limit, start) {
  return Math.floor((Math.random() * limit) + start);
}

function awesomeJob() {
  const congratsMsg = document.createElement('h4');
  congratsMsg.textContent = 'Awesome Job!';
  congratsMsg.classList = 'text-center';

  const container = document.getElementById('container');
  container.append(congratsMsg);
  container.style.display = 'block';

  setTimeout(function() {
    clearHTML();
    loadChoices();
  }, 1000)
}