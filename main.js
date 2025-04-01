
/* ======= Alterar Guias ======= */
const trocar_guia = document.querySelector('.contatos_tarefas');
const guia_contatos = document.querySelector('.guia_contatos');
const guia_tarefas = document.querySelector('.guia_tarefas');

/* ======= Icone das opções ======= */
const imgTelefone = `<img src="./images/call.svg" alt="Ligar">`
const imgWhatsapp = `<img src="./images/whatsapp.svg" alt="Whatsapp">`
const imgEmail = `<img src="./images/mail.svg" alt="Enviar e-mail"></img>`
const imgExcluir = `<img class="removerContato" src="./images/excluir.svg" alt="Apagar contato" title="Remover contato">`;

/* ======= Formulário e Tabela ======= */
const form_contatos = document.getElementById('formulario_contatos');
const tabela = document.querySelector("#tabela_contatos");

var linhas = '';


form_contatos.addEventListener('submit', function(e){
    e.preventDefault();

    prepararLinha();
    adicionarLinha();
})
tabela.addEventListener('click', function(evento){
    var btnRemoverClicado = evento.target;

    if (btnRemoverClicado.classList.contains("removerContato")){
        var celula = btnRemoverClicado.parentNode;
        var conjuntoOpcoes = celula.parentNode;
        var linhaSelecionada = conjuntoOpcoes.parentNode;
        linhaSelecionada.remove();
    }
})

function prepararLinha(){
    const nomeContato = document.getElementById('nome');
    const telefoneContato = document.getElementById('telefone');
    const mailContato = document.getElementById('e_mail');

    let linha = `<tr>`;
    linha += `<td> ${nomeContato.value} </td>`;
    linha += `<td> ${telefoneContato.value} </td>`
    linha += `<td> ${mailContato.value} </td>`
    linha += prepararOpcoes(telefoneContato.value, mailContato.value);
    linha += `<tr>` 

    linhas += linha;

    nomeContato.value = '';
    telefoneContato.value = '';
    mailContato.value = '';
}

function prepararOpcoes(telefone, email){
    let opcao = `<td class="tabela_alinhada">`;
    opcao += `<a href="tel:${telefone}" title="Ligar para este contato"> ${imgTelefone} </a>`;
    if (telefone.length > 10){
        opcao += `<a href="http://wa.me/${telefone}" title="Entrar em contato pelo WhatsApp" target="blank"> ${imgWhatsapp} </a>`;
    }
    if (email != ""){
        opcao += `<a href="mailto:${email}" title="Enviar um E-mail"> ${imgEmail} </a>`;
    }
    opcao += `<span> ${imgExcluir} </span>`;
    opcao += `</td>`;

    return opcao;
}

function adicionarLinha(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}



function validarNome(nomeContato){
    const nomeDividido = nomeContato.split(' ');
    return nomeDividido >= 2;
}


function switch_contacts(){
    console.log("voce clicou em contacts!");
    guia_contatos.classList.add('guia_ativa');
    guia_tarefas.classList.remove('guia_ativa');
    trocar_guia.classList.remove('trocar');
}

function switch_tasks(){
    console.log("voce clicou em tasks!"); 
    guia_tarefas.classList.add('guia_ativa'); 
    guia_contatos.classList.remove('guia_ativa');
    trocar_guia.classList.add('trocar');
}
