/* ======= Formulário, Tabela e Notificação global ======= */
const form_contatos = document.getElementById('formulario_contatos');
const notificacao = document.getElementById('notificacao');
const tabela = document.querySelector("#tabela_contatos");
const corpoTabela = document.querySelector('tbody');

/* ======= Icone das opções ======= */
const imgTelefone = `<img src="./images/call.svg" alt="Ligar">`
const imgWhatsapp = `<img src="./images/whatsapp.svg" alt="Whatsapp">`
const imgEmail = `<img src="./images/mail.svg" alt="Enviar e-mail"></img>`
const imgExcluir = `<img class="removerContato" src="./images/excluir.svg" alt="Apagar contato" title="Remover contato">`;

/* ======= Filtro da Tabela ======= */
const filtro = document.querySelector('#filtro');
filtro.addEventListener('change', function(){
    atualizarTabela();
})

/* ======= Primeiro contato somente para exemplo para visualização na tabela ======= */
PrimeiroExemplo = '<tr>'
PrimeiroExemplo += '<td> Samuel Tafnes </td>'
PrimeiroExemplo +='<td> 11940028922 </td>'
PrimeiroExemplo += '<td> samuel@email.com </td>'
PrimeiroExemplo += '<td class="tabela_alinhada">'
PrimeiroExemplo += '<a href="tel:11940028922" title="Ligar para este contato"> <img src="./images/call.svg" alt="Ligar"> </a>'
PrimeiroExemplo += '<a href="http://wa.me/+5511940028922" title="Entrar em contato pelo WhatsApp" target="blank"> <img src="./images/whatsapp.svg" alt="Whatsapp"> </a>'
PrimeiroExemplo += '<a href="mailto:samuel@email.com" title="Enviar um E-mail"> <img src="./images/mail.svg" alt="Enviar e-mail"></img> </a>'
PrimeiroExemplo += '<span> <img class="removerContato" src="./images/excluir.svg" alt="Apagar contato" title="Remover contato"> </span>'
PrimeiroExemplo += '</td>'
PrimeiroExemplo += '</tr>'

var linha;
var lista_de_contatos = [PrimeiroExemplo];

/* ======= Aguarda o click no botão submit para validar e incluir o novo contato ======= */
form_contatos.addEventListener('submit', function(e){
    e.preventDefault();

    const nomeContato = document.getElementById('nome');
    const telefoneContato = document.getElementById('telefone');
    const mailContato = document.getElementById('e_mail');

    if(validarCampos(nomeContato.value, telefoneContato.value)){
        prepararLinha(nomeContato.value, telefoneContato.value, mailContato.value);
        adicionarContato();
        atualizarTabela();

        nomeContato.value = '';
        telefoneContato.value = '';
        mailContato.value = '';

        exibirNotificacao('adicionado', '1');
    }
})

/* ======= Remove as linhas vermelhas do campo input ao clicar no botão Limpar ======= */
form_contatos.addEventListener('reset', function(){
    for (let i = 0; i < all_input.length; i++){
        all_input[i].classList.remove('error');
    }
})

/* ======= Preparar a linha do novo contato ======= */
function prepararLinha(nome, telefone, email){
    linha = `<tr>`;
    linha += `<td> ${nome} </td>`;
    linha += `<td> ${telefone} </td>`
    linha += `<td> ${email} </td>`
    linha += prepararOpcoes(telefone, email);
    linha += `</tr>` 
    console.log(linha);
}

/* ======= Preparar as opções do campo "Ações" do novo contato ======= */
function prepararOpcoes(telefone, email){
    let opcoes = `<td class="tabela_alinhada">`;
    opcoes += `<a href="tel:${telefone}" title="Ligar para este contato"> ${imgTelefone} </a>`;
    if (telefone.length > 10){
        opcoes += `<a href="http://wa.me/+55${telefone}" title="Entrar em contato pelo WhatsApp" target="blank"> ${imgWhatsapp} </a>`;
    }
    if (email != ""){
        opcoes += `<a href="mailto:${email}" title="Enviar um E-mail"> ${imgEmail} </a>`;
    }
    opcoes += `<span> ${imgExcluir} </span>`;
    opcoes += `</td>`;

    return opcoes;
}

/* ======= Adiciona o novo contato na lista ======= */
function adicionarContato(){
    lista_de_contatos.push(linha);
}

/* ======= Organiza e atualiza a tabela adicionando todos os contatos da lista ======= */
function atualizarTabela(){
    if(filtro.value == 'Mais recente'){
        corpoTabela.innerHTML = lista_de_contatos.slice(0, lista_de_contatos.length).reverse().join("");
    }
    else if(filtro.value == 'Nome'){
        corpoTabela.innerHTML = lista_de_contatos.slice(0, lista_de_contatos.length).sort().join("");
    }
    else{
        corpoTabela.innerHTML = lista_de_contatos.slice(0, lista_de_contatos.length).join("");
    }
}

/* ======= Remove o contato selecionado ======= */
tabela.addEventListener('click', function(evento){
    var btnRemoverClicado = evento.target;

    if (btnRemoverClicado.classList.contains("removerContato")){
        var celula = btnRemoverClicado.parentNode;
        var conjuntoOpcoes = celula.parentNode;
        var linhaSelecionada = conjuntoOpcoes.parentNode;

        var nome = linhaSelecionada.getElementsByTagName('td');
        nome = nome[0].textContent;

        resposta = window.confirm(`Deseja remover o contato: ${nome} da sua lista?`);

        if (resposta){
            linhaSelecionada.remove();
            lista_de_contatos.splice(lista_de_contatos.indexOf(linhaSelecionada.outerHTML), 1);
            exibirNotificacao('removido', '0');
        } 
    }
})

/* ======= Valida o campo "nome" ======= */
function validarNome(nome){
    const nomeDividido = nome.split(" ");
    return (nomeDividido.length >= 2);
}
/* ======= Valida o campo "telefone" ======= */
function validarTelefone(telefone){
    return telefone.length >= 10;
}

/* ======= Valida todos os campos para iniciar o registro ======= */
 function validarCampos(nome, telefone){
    if (!validarNome(nome) && !validarTelefone(telefone)){
        notificacao.innerHTML = getMensagem();
        document.getElementById('nome').classList.add('error');
        document.getElementById('telefone').classList.add('error');
        exibirNotificacao();
        return false;
    }
    else if(!validarNome(nome)){
        document.getElementById('nome').classList.add('error');
        exibirNotificacao('nome', 0);
        return false;
    }
    else if (!validarTelefone(telefone)){
        document.getElementById('telefone').classList.add('error');
        exibirNotificacao('telefone', 0);
        return false;
    }
    else {
        return true;
    }
}

/* ======= Remove as linhas vermelhas do campo input após começar a digitar ======= */
const all_input = document.querySelectorAll('input');
for (let i = 0; i < all_input.length; i++){
    all_input[i].addEventListener('keypress', function(){
        all_input[i].classList.remove('error');
    })
}

/* ======= Lista de seleção se avisos para a Notificação ======= */
function getMensagem(campo){
    const tipoInput = {
        'nome': 'Informe um Nome e Sobrenome para continuar!',
        'telefone': 'Digite um numero válido com o DDD!',
        'adicionado': 'Contato adicionado com sucesso!',
        'removido': 'Contato removido!'
    };
    return tipoInput[campo] || 'Informe o nome completo e um numero de telefone válido para adicionar um contato!';
}

/* ======= Exibe a notificação ======= */
function exibirNotificacao(campo, tipo){

    if (tipo == 1){
        notificacao.style.backgroundColor = 'lightseagreen'; 
        notificacao.innerHTML = getMensagem(campo);
    }
    else{
        notificacao.style.backgroundColor = 'lightcoral'; 
        notificacao.innerHTML = getMensagem(campo);
    }
    notificacao.style.animation = null;
    notificacao.offsetHeight;
    notificacao.style.animation = 'slide_in 4s ease-in-out';
}