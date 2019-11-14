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
      const congratsMsg = document.createElement('h4');
      congratsMsg.textContent = 'Awesome Job!';
      congratsMsg.classList = 'text-center';

      const container = document.getElementById('container');
      container.append(congratsMsg);
      container.style.display = 'block';

      setTimeout(function() {
        clearHTML();
        loadChoices();
      }, 2000)
    }
  }

  questionHolder.append(questionText, numberPlace, nextBtn);

  container.append(questionHolder);

  document.getElementById('container').style.display = 'block';
}

function playAddNumbers() {
  console.log('add numbers')
}

function playCountingNumbers() {
  console.log('counting numbers')
}