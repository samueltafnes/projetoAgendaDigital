const trocar_guia = document.querySelector('.contatos_tarefas');
const guia_contatos = document.querySelector('.guia_contatos');
const guia_tarefas = document.querySelector('.guia_tarefas');

const form_contatos = document.getElementById('formulario_contatos');




form_contatos.addEventListener('submit', function(e){
    e.preventDefault();
    

    const nome_contato = document.getElementById('nome');
    console.log(nome_contato.value);

    const tel_contato = document.getElementById('telefone');
    console.log(tel_contato.value);

    const mail_contato = document.getElementById('e_mail');
    console.log(mail_contato.value);

    console.log(tel_contato.value);
})




function formatar(mascara, documento){
	var i = documento.value.length;
	var saida = mascara.substring(0,1);
	var texto = mascara.substring(i)

	if (texto.substring(0,1) != saida){
		documento += texto.substring(0,1);
	}
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