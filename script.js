'use sctrict';

//banco de dados
let banco = [
  {'tarefa': 'estudar JS', 'status': ''},
  {'tarefa': 'ler', 'status': 'checked'},
  {'tarefa': 'teste1', 'status': ''}
];

//cria tarefa
const criarItem = (tarefa, status, indice) => {
  const item = document.createElement('label');
  item.classList.add('todo__item');
  item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>
  `;
  document.getElementById('todoList').appendChild(item);
}


const limparTarefas = () => {
  const todoList = document.getElementById('todoList');
  while(todoList.firstChild) {
    todoList.removeChild(todoList.lastChild);
  }
}

//atualiza a tela
const atualizarTela = () => {
  limparTarefas();
  banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

//permite inserir item por meio da interface ao pressionar 'Enter'
const inserirItem = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value;
  if (tecla === 'Enter') {
    banco.push({'tarefa': texto, 'status': ''});
    atualizarTela();
    //limpa o campo input -obs: refaturar
    evento.target.value = '';
  }
}

//remover item e atualiza a tela
const removerItem = (indice) => {
  banco.splice (indice, 1);
  atualizarTela();
}

// ao clicar no checkbox se estiver vazio marca, se estiver marcado desmarca.
const atualizarItem = (indice) => {
  banco[indice].status = banco[indice].status === '' ? 'checked' : '';
  atualizarTela();
}

// reconhece o item clicado, se for tipo botão remove o item, ser for tipo checkbox atualiza a tela
const clickItem = (evento) => {
  const elemento = evento.target;
  if (elemento.type === 'button') {
    const indice = elemento.dataset.indice;
    removerItem(indice);
  } else if (elemento.type === 'checkbox') {
    const indice = elemento.dataset.indice;
    atualizarItem(indice);
  }
}

document.getElementById('newItem').addEventListener('keypress', inserirItem);

document.getElementById('todoList').addEventListener('click', clickItem);

atualizarTela();

