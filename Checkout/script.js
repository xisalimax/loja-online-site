// ==========================
// Máscara de CPF
// ==========================
document.getElementById('cpf').addEventListener('input', function(e){
    let v = e.target.value.replace(/\D/g,'');
    v = v.replace(/^(\d{3})(\d)/,'$1.$2');
    v = v.replace(/^(\d{3})\.(\d{3})(\d)/,'$1.$2.$3');
    v = v.replace(/\.(\d{3})(\d)/,'.$1-$2');
    e.target.value = v;
});

// ==========================
// Máscara de celular
// ==========================
document.getElementById('celular').addEventListener('input', function(e){
    let v = e.target.value.replace(/\D/g,'');
    v = v.replace(/^(\d{2})(\d)/g,'($1) $2');
    v = v.replace(/(\d{5})(\d)/,'$1-$2');
    e.target.value = v;
});

// ==========================
// Função para salvar todos os dados no localStorage (JSON)
// ==========================
function salvarLocalStorage() {
    const totalCompra = parseFloat(document.getElementById('total-price').textContent.replace('R$', '').replace(',', '.'));

    // Captura o pagamento selecionado
    const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked').id;

    const dados = {
        usuario: {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            celular: document.getElementById('celular').value,
            tipo: document.getElementById('tipo').value,
            cpf: document.getElementById('cpf').value
        },
        endereco: {
            cep: document.getElementById('cep').value,
            logradouro: document.getElementById('logradouro').textContent,
            bairro: document.getElementById('bairro').textContent,
            cidade: document.getElementById('cidade').textContent,
            uf: document.getElementById('uf').textContent
        },
        frete: {
            sudeste: {
                preco: document.getElementById('price-sudeste').textContent,
                dias: document.getElementById('days-sudeste').textContent
            },
            outros: {
                preco: document.getElementById('price-outros').textContent,
                dias: document.getElementById('days-outros').textContent
            }
        },
        pagamento: pagamentoSelecionado,
        total: `R$${totalCompra.toFixed(2)}`,
        mensagem: document.getElementById('mensagem').value
    };

    // ==========================
    // LIMITAR A 5 REGISTROS (limpa e recomeça)
    // ==========================
    let historico = JSON.parse(localStorage.getItem('historicoCheckout')) || [];

    if (historico.length >= 5) {
        historico = []; // limpa tudo
    }

    historico.push(dados);

    localStorage.setItem('historicoCheckout', JSON.stringify(historico));
}

// ==========================
// Função para carregar dados do localStorage
// ==========================
function carregarLocalStorage() {
    const dadosSalvos = JSON.parse(localStorage.getItem('dadosCheckout'));
    if (!dadosSalvos) return;

    document.getElementById('nome').value = dadosSalvos.usuario.nome || '';
    document.getElementById('email').value = dadosSalvos.usuario.email || '';
    document.getElementById('celular').value = dadosSalvos.usuario.celular || '';
    document.getElementById('tipo').value = dadosSalvos.usuario.tipo || '';
    document.getElementById('cpf').value = dadosSalvos.usuario.cpf || '';

    document.getElementById('cep').value = dadosSalvos.endereco.cep || '';
    document.getElementById('logradouro').textContent = dadosSalvos.endereco.logradouro || '-';
    document.getElementById('bairro').textContent = dadosSalvos.endereco.bairro || '-';
    document.getElementById('cidade').textContent = dadosSalvos.endereco.cidade || '-';
    document.getElementById('uf').textContent = dadosSalvos.endereco.uf || '-';
    if(dadosSalvos.endereco.cep) document.getElementById('address-box').style.display = 'block';

    document.getElementById('price-sudeste').textContent = dadosSalvos.frete.sudeste.preco || 'R$0,00';
    document.getElementById('days-sudeste').textContent = dadosSalvos.frete.sudeste.dias || '0 dias';
    document.getElementById('price-outros').textContent = dadosSalvos.frete.outros.preco || 'R$0,00';
    document.getElementById('days-outros').textContent = dadosSalvos.frete.outros.dias || '0 dias';

    if(dadosSalvos.pagamento) {
        const pagamentoRadio = document.getElementById(dadosSalvos.pagamento);
        if(pagamentoRadio) pagamentoRadio.checked = true;
    }

    document.getElementById('total-price').textContent = dadosSalvos.total || 'R$0,00';
    document.getElementById('mensagem').value = dadosSalvos.mensagem || '';
}

// ==========================
// Limpar formulário
// ==========================
function limparFormulario() {
    ['nome','email','celular','tipo','cpf','cep','mensagem'].forEach(id => {
        document.getElementById(id).value = '';
    });
    document.getElementById('address-box').style.display = 'none';
    document.getElementById('logradouro').textContent = '-';
    document.getElementById('bairro').textContent = '-';
    document.getElementById('cidade').textContent = '-';
    document.getElementById('uf').textContent = '-';
    document.getElementById('price-sudeste').textContent = 'R$0,00';
    document.getElementById('days-sudeste').textContent = '0 dias';
    document.getElementById('price-outros').textContent = 'R$0,00';
    document.getElementById('days-outros').textContent = '0 dias';
    document.getElementById('total-price').textContent = 'R$0,00';
    document.querySelector('input[name="pagamento"][id="pix"]').checked = true;
}

// ==========================
// Executa ao carregar a página
// ==========================
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.getElementById('search-address');
    const totalProduto = 80.00;
    document.getElementById('total-price').textContent = `R$${totalProduto.toFixed(2)}`;

    carregarLocalStorage();

    ['nome','email','celular','tipo','cpf','cep','mensagem'].forEach(id => {
        document.getElementById(id).addEventListener('input', salvarLocalStorage);
    });

    document.querySelectorAll('input[name="pagamento"]').forEach(radio => {
        radio.addEventListener('change', salvarLocalStorage);
    });

    searchBtn.addEventListener('click', async function(event) {
        event.preventDefault();
        const cep = document.getElementById('cep').value.replace(/\D/g, '');
        if (!cep) return alert('Digite um CEP válido!');

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
            const data = await response.json();

            if (data.erro) {
                alert('CEP não encontrado!');
                return;
            }

            document.getElementById('logradouro').textContent = data.logradouro || '-';
            document.getElementById('bairro').textContent = data.bairro || '-';
            document.getElementById('cidade').textContent = data.localidade || '-';
            document.getElementById('uf').textContent = data.uf || '-';
            document.getElementById('address-box').style.display = 'block';

            const sudeste = ['SP','RJ','MG','ES'];
            let freteSudeste = 19.90;
            let diasSudeste = 3;
            let freteOutros = 28.90;
            let diasOutros = 8;

            let isSudeste = sudeste.includes(data.uf);

            document.getElementById('price-sudeste').textContent = `R$${freteSudeste.toFixed(2)}`;
            document.getElementById('days-sudeste').textContent = `${diasSudeste} dias`;
            document.getElementById('price-outros').textContent = `R$${freteOutros.toFixed(2)}`;
            document.getElementById('days-outros').textContent = `${diasOutros} dias`;

            const freteAtual = isSudeste ? freteSudeste : freteOutros;
            const totalCompra = totalProduto + freteAtual;
            document.getElementById('total-price').textContent = `R$${totalCompra.toFixed(2)}`;

            salvarLocalStorage();

        } catch (error) {
            console.error(error);
            alert('Erro ao buscar endereço.');
        }
    });

    // Finalizar Compra
    document.querySelector('.btn-primary').addEventListener('click', function() {
        salvarLocalStorage();
        alert('Transação realizada com sucesso! Dados salvos.');
        limparFormulario();
    });
});
