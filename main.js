const trocar_painel = document.querySelector('.contatos_tarefas');
const painel_contatos = document.querySelector('.contatos');
const painel_tarefas = document.querySelector('.tarefas');

const form_contatos = document.getElementById('formulario_contatos');

form_contatos.addEventListener('submit', function(e){
    e.preventDefault();
    
})















function switch_contacts(){
    console.log("voce clicou em contacts!");
    trocar_painel.classList.remove('trocar');
}

function switch_tasks(){
    console.log("voce clicou em tasks!");  
    trocar_painel.classList.add('trocar');
}