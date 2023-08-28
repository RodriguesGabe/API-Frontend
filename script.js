// Evento de clique para obter uma piadinha, imagem de gato e chegar cpf
document.getElementById('joke-button').addEventListener('click', getJoke);
document.getElementById('cat-button').addEventListener('click', getCatImage);
document.getElementById('cpf-button').addEventListener('click', checkCPF);

// Função Conta Piada
function getJoke() {
  // Faz uma requisição à API de piadas
  fetch('https://official-joke-api.appspot.com/jokes/random')
    .then(response => response.json())
    .then(data => {
      // Exibe a piada no elemento HTML 'joke-result'
      const jokeResult = document.getElementById('joke-result');
      jokeResult.textContent = data.setup + ' ' + data.punchline;
    })
    .catch(error => {
      console.error('Erro ao obter piada:', error);
    });
}

// Função exibe Gato
function getCatImage() {
  // Faz uma requisição à API de imagens de gato
  fetch('https://api.thecatapi.com/v1/images/search')
    .then(response => response.json())
    .then(data => {
      // Exibe a imagem de gato no elemento HTML 'cat-image'
      const catImage = document.getElementById('cat-image');
      catImage.src = data[0].url;
    })
    .catch(error => {
      console.error('Erro ao obter imagem de gato:', error);
    });
}

// Função Validar CPF
function checkCPF() {
  // Obtendo o elemento de entrada de CPF e o elemento de resultado
  const cpfInput = document.getElementById('cpf-input');
  const cpfResult = document.getElementById('cpf-result');
  
  // Removendo caracteres não numéricos do CPF
  const cpf = cpfInput.value.replace(/[^\d]/g, '');
  
  // Verificando se o CPF é válido ou inválido usando a função validateCPF
  if (validateCPF(cpf)) {
    cpfResult.textContent = 'CPF válido.';
  } else {
    cpfResult.textContent = 'CPF inválido.';
  }
}

// Função para validar um CPF
function validateCPF(cpf) {
  // Verificando o tamanho do CPF
  if (cpf.length !== 11) {
    return false;
  }

  // Convertendo o CPF em um array de números
  const cpfArray = cpf.split('').map(Number);
  const [a, b, c, d, e, f, g, h, i, j, k] = cpfArray;

  // Verificando se todos os dígitos do CPF são iguais
  if (new Set(cpfArray).size === 1) {
    return false;
  }

  // Calculando o primeiro dígito verificador
  let sum = 0;
  for (let n = 0; n < 9; n++) {
    sum += cpfArray[n] * (10 - n);
  }
  let remainder = sum % 11;
  remainder = remainder < 2 ? 0 : 11 - remainder;
  if (remainder !== cpfArray[9]) {
    return false;
  }

  // Calculando o segundo dígito verificador
  sum = 0;
  for (let n = 0; n < 10; n++) {
    sum += cpfArray[n] * (11 - n);
  }
  remainder = sum % 11;
  remainder = remainder < 2 ? 0 : 11 - remainder;
  if (remainder !== cpfArray[10]) {
    return false;
  }

  // Se todas as verificações passarem, o CPF é válido
  return true;
}
