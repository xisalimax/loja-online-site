// Troca da imagem principal ao clicar nas miniaturas
const miniaturas = document.querySelectorAll('.miniaturas img');
const imgPrincipal = document.querySelector('.img-principal');

// Carrega imagem principal salva no localStorage (se existir)
const imgSalva = localStorage.getItem('imagemPrincipal');
if (imgSalva) {
  imgPrincipal.src = imgSalva;
}

miniaturas.forEach(mini => {
  mini.addEventListener('click', () => {
    imgPrincipal.src = mini.src;
    // Salva no localStorage
    localStorage.setItem('imagemPrincipal', mini.src);
  });
});


// Seleção de tamanho com destaque
const botoesTamanho = document.querySelectorAll('.tamanhos button');
let tamanhoSelecionado = localStorage.getItem('tamanhoSelecionado') || null;

// Aplica destaque no tamanho salvo (se existir)
if (tamanhoSelecionado) {
  botoesTamanho.forEach(botao => {
    if (botao.textContent === tamanhoSelecionado) {
      botao.classList.add('selecionado');
    }
  });
}

botoesTamanho.forEach(botao => {
  botao.addEventListener('click', () => {
    botoesTamanho.forEach(b => b.classList.remove('selecionado'));
    botao.classList.add('selecionado');
    tamanhoSelecionado = botao.textContent;
    // Salva o tamanho selecionado
    localStorage.setItem('tamanhoSelecionado', tamanhoSelecionado);
  });
});


// Estilo para botão selecionado
const estiloSelecionado = document.createElement('style');
estiloSelecionado.innerHTML = `
  .tamanhos button.selecionado {
    background-color: #1ea358;
    color: white;
    border-color: #1ea358;
  }
`;
document.head.appendChild(estiloSelecionado);


// Simulação de cálculo de frete
const btnCalcular = document.getElementById('btn-calcular');
const inputCep = document.getElementById('cep');
const resultadoFrete = document.getElementById('resultado-frete');

// Carrega CEP salvo (se houver)
const cepSalvo = localStorage.getItem('cepSalvo');
if (cepSalvo) {
  inputCep.value = cepSalvo;
}

btnCalcular.addEventListener('click', () => {
  const cep = inputCep.value.trim();

  if (cep.length === 8 && /^\d+$/.test(cep)) {
    resultadoFrete.textContent = `Frete para o CEP ${cep}: R$ 15,90 (3 a 5 dias úteis)`;
    resultadoFrete.style.color = '#1ea358';
    resultadoFrete.style.marginTop = '10px';
    // Salva o CEP no localStorage
    localStorage.setItem('cepSalvo', cep);
  } else {
    resultadoFrete.textContent = 'Por favor, insira um CEP válido com 8 dígitos.';
    resultadoFrete.style.color = 'red';
    resultadoFrete.style.marginTop = '10px';
  }
});


// Alerta ao clicar em "Comprar"
const btnComprar = document.querySelector('.btn-comprar');

btnComprar.addEventListener('click', () => {
  if (tamanhoSelecionado) {
    alert(`Produto adicionado ao carrinho!\nTamanho selecionado: ${tamanhoSelecionado}`);
  } else {
    alert('Por favor, selecione um tamanho antes de comprar.');
  }
});
