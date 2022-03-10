'use sctrict';

// pega os dados inseridos na lista
const getBanco = () => JSON.parse(localStorage.getItem('todoList') ) ?? [];

// manda os dados para o localstorage
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

//cria tarefa
const criarItem = (tarefa, status, indice) => {
  const item = document.createElement('label');
  item.classList.add('todo__item');
  item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="x" data-indice=${indice}>
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
  const banco = getBanco();
  banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

//permite inserir item por meio da interface ao pressionar 'Enter'
const inserirItem = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value;
  if (tecla === 'Enter') {
    const banco = getBanco();
    banco.push({'tarefa': texto, 'status': ''});
    setBanco(banco);
    atualizarTela();
    //limpa o campo input -obs: refaturar
    evento.target.value = '';
  }
}

//remover item e atualiza a tela
const removerItem = (indice) => {
  const banco = getBanco();
  banco.splice (indice, 1);
  setBanco(banco);
  atualizarTela();
}

// ao clicar no checkbox se estiver vazio marca, se estiver marcado desmarca.
const atualizarItem = (indice) => {
  const banco = getBanco();
  banco[indice].status = banco[indice].status === '' ? 'checked' : '';
  setBanco(banco);
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

