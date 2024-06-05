document.addEventListener('DOMContentLoaded', () => {
    const cadastroContatoForm = document.getElementById('cadastroContato');
    const mensagem = document.getElementById('mensagem');
    const exibirContatosBtn = document.getElementById('exibirContatosBtn');
    const buscarContatoBtn = document.getElementById('buscarContatoBtn');
    const removerContatoBtn = document.getElementById('removerContatoBtn');
    const listaContatos = document.getElementById('listaContatos');
    let usuarios = [];

    function atualizarMensagem(texto, tipo) {
        mensagem.textContent = texto;
        mensagem.className = `message ${tipo}`;
        mensagem.style.display = 'block';
        setTimeout(() => {
            mensagem.style.display = 'none';
        }, 3000);
    }

    cadastroContatoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const cpf = document.getElementById('cpf').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const endereco = document.getElementById('endereco').value;

        const cpfExistente = usuarios.some(usuario => usuario.cpf === cpf);

        if (cpfExistente) {
            atualizarMensagem('🚨 CPF já cadastrado!', 'error');
            
        } else {
            const novoUsuario = { nome, cpf, dataNascimento, endereco };
            usuarios.push(novoUsuario);
            atualizarMensagem('✅ Usuário cadastrado com sucesso!', 'success');
            cadastroContatoForm.reset();
            // listaContatos.innerHTML = '';
        }
    });

    exibirContatosBtn.addEventListener('click', () => {
        listaContatos.innerHTML = '';
        if (usuarios.length === 0) {
            atualizarMensagem('⚠ Nenhum contato cadastrado.', 'alert');
            // listaContatos.innerHTML = '<p>Nenhum contato cadastrado.</p>';
            
        } else {
            usuarios.forEach(usuario => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${usuario.nome}</h3>
                    <p><strong>CPF:</strong> ${usuario.cpf}</p>
                    <p><strong>Data de Nascimento:</strong> ${usuario.dataNascimento}</p>
                    <p><strong>Endereço:</strong> ${usuario.endereco}</p>
                `;
                listaContatos.appendChild(card);
            });
        }
    });

    buscarContatoBtn.addEventListener('click', () => {
        const cpf = prompt('Digite o CPF do contato a ser buscado:');
        const usuario = usuarios.find(usuario => usuario.cpf === cpf);

        if (usuario) {
            alert(`Nome: ${usuario.nome}\nCPF: ${usuario.cpf}\nData de Nascimento: ${usuario.dataNascimento}\nEndereço: ${usuario.endereco}`);
        } else {
            alert('🚨 Contato não encontrado.');
        }
    });

    removerContatoBtn.addEventListener('click', () => {
        const cpf = prompt('Digite o CPF do contato a ser removido:');
        const index = usuarios.findIndex(usuario => usuario.cpf === cpf);

        if (index !== -1) {
            usuarios.splice(index, 1);
            atualizarMensagem('✅ Contato removido com sucesso!', 'success');
            listaContatos.innerHTML = ''; // Atualiza a lista de contatos após remoção
        } else {
            atualizarMensagem('🚨 Contato não encontrado.', 'error');
        }
    });
});
