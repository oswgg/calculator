const d = document;
const mainNumber = d.getElementById('principal_operation'),
  secondaryNumber = d.getElementById('secondary_operation');
let first = true;
let val1, val2;
let result;

const dot = d.getElementById('dot');
d.addEventListener('click', e => {
  if (e.target.classList.contains('button')) typing(e);
});

const actualizarNum = (empty, target, deleting) => {
  if (empty) {
    secondaryNumber.textContent = '';
    return;
  }
  if (result) {
    secondaryNumber.textContent = mainNumber.textContent;
    result = null;
    return;
  }

  if (deleting) {
    secondaryNumber.textContent = mainNumber.textContent;
    return;
  }

  let lastCharacter = mainNumber.textContent.toString().split('')[
    mainNumber.textContent.length - 1
  ];

  secondaryNumber.textContent = secondaryNumber.textContent
    .toString()
    .concat(lastCharacter);
};

function typing(e) {
  const { target } = e;
  if (target.classList.contains('number')) {
    typeNumber(target);
  } else if (target.classList.contains('operation')) {
    typeOperation(target);
  } else if (target.id == 'equals') {
    showResults();
  } else if (target.id == 'clear') {
    clearResults();
  } else if (target.id == 'dot') {
    typeDot(target);
  } else if (target.id == 'clear-one') {
    clearOne();
  }
}

function typeNumber(target) {
  if (first) {
    mainNumber.textContent = target.textContent;
    first = false;
    actualizarNum(false, target);
  } else {
    mainNumber.textContent += target.textContent;
    actualizarNum(false, target);
  }
}

function typeOperation(target) {
  if (first) return;
  val1 = Number(mainNumber.textContent);
  mainNumber.textContent += target.textContent;
  actualizarNum(false, target);
  mainNumber.textContent = '';
  first = true;
}

function typeDot(target) {
  if (mainNumber.textContent.includes('.')) return;
  if (first) {
    mainNumber.textContent = '0.';
    actualizarNum(false, target);
    first = false;
    return;
  }
  mainNumber.textContent += '.';
  first = false;
  actualizarNum(false, target);
}

function clearOne() {
  if (mainNumber.textContent.length == 0) return;
  if (mainNumber.textContent.length == 1) {
    mainNumber.textContent = 0;
    actualizarNum(true, null, true);
    first = true;
    return;
  }
  mainNumber.textContent = mainNumber.textContent
    .toString()
    .substring(0, mainNumber.textContent.length - 1);
  actualizarNum(false, null, true);
}

function showResults() {
  val2 = Number(mainNumber.textContent);
  if (val2 == 0) return;
  if (secondaryNumber.textContent.includes('+')) {
    result = val1 + val2;
    actualizarNum(true);
  } else if (secondaryNumber.textContent.includes('-')) {
    result = val1 - val2;
    actualizarNum(true);
  } else if (secondaryNumber.textContent.includes('x')) {
    result = val1 * val2;
    actualizarNum(true);
  } else if (secondaryNumber.textContent.includes('/')) {
    result = val1 / val2;
    actualizarNum(true);
  } else if (secondaryNumber.textContent.includes('%')) {
    result = val1 % val2;
    actualizarNum(true);
  }

  mainNumber.classList.add('animate');
  mainNumber.textContent = result.toFixed(4);

  setTimeout(() => {
    mainNumber.classList.remove('animate');
  }, 850);
}

function clearResults() {
  mainNumber.textContent = 0;
  actualizarNum(true);
  first = true;
}
