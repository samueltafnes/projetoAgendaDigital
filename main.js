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
const corpoTabela = document.querySelector('tbody');
const alerta = document.getElementById('#alerta');

/* ======= Filtro da Tabela ======= */
const filtro = document.querySelector('#filtro');
filtro.addEventListener('change', function(){
    atualizarTabela();
})

const inputTelefone = document.querySelector('#telefone');
var linha;
var lista_de_contatos = [];


form_contatos.addEventListener('submit', function(e){
    e.preventDefault();

    const nomeContato = document.getElementById('nome');
    const telefoneContato = document.getElementById('telefone');
    const mailContato = document.getElementById('e_mail');

    if (validarNome(nomeContato.value) && validarTelefone(telefoneContato.value)){
        prepararLinha(nomeContato.value, telefoneContato.value, mailContato.value);
        adicionarContato();
        atualizarTabela();
    }
    
    nomeContato.value = '';
    telefoneContato.value = '';
    mailContato.value = '';
})


tabela.addEventListener('click', function(evento){
    var btnRemoverClicado = evento.target;

    if (btnRemoverClicado.classList.contains("removerContato")){
        var celula = btnRemoverClicado.parentNode;
        var conjuntoOpcoes = celula.parentNode;
        var linhaSelecionada = conjuntoOpcoes.parentNode;
        
        linhaSelecionada.remove();
        lista_de_contatos.splice(lista_de_contatos.indexOf(linhaSelecionada.outerHTML), 1);
    }
})


function prepararLinha(nome, telefone, email){
    linha = `<tr>`;
    linha += `<td> ${nome} </td>`;
    linha += `<td> ${telefone} </td>`
    linha += `<td> ${email} </td>`
    linha += prepararOpcoes(telefone, email);
    linha += `</tr>` 
}

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

function adicionarContato(){
    lista_de_contatos.push(linha);
}

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






function validarNome(nome){
    const nomeDividido = nome.split(' ');
    if (nomeDividido >= 2){
        return true;
    }else{
        exibirAlerta('nome');
        return false;
    }
        
}

function validarTelefone(telefone){
    if (telefone >= 10){
        return true;
    }else{
        exibirAlerta('telefone');
        return false;
    }
}

function exibirAlerta(campo){
    const tipoInput = {
        'nome': 'Informe um nome e sobrenome para continuar!',
        'telefone': 'Digite um numero válido com o DDD para continuar!'
    };
    console.log(tipoInput[campo] || 'Primeiro preencha os campos Nome e Telefone para adicionar um contato!');
    alerta.classList.add('.slide');
}



function switch_contacts(){
    guia_contatos.classList.add('guia_ativa');
    guia_tarefas.classList.remove('guia_ativa');
    trocar_guia.classList.remove('trocar');
}

function switch_tasks(){
    guia_tarefas.classList.add('guia_ativa'); 
    guia_contatos.classList.remove('guia_ativa');
    trocar_guia.classList.add('trocar');
}




