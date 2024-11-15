if (!sessionStorage.getItem("logado")) {
    window.location.href = "index.html";
}

const container = document.getElementById("atleta");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


const pega_json = async (caminho) => {
    try {
        const resposta = await fetch(caminho);
        if (!resposta.ok) throw new Error(`Erro ${resposta.status}: Não foi possível carregar os dados.`);
        return await resposta.json();
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro ao carregar os detalhes do atleta.");
        return null;
    }
};


const carregarDetalhes = async () => {
    if (!id) {
        container.innerHTML = "<p>ID do atleta não fornecido.</p>";
        return;
    }

    const atleta = await pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`);
    
    
    if (!atleta) {
        container.innerHTML = "<p>Erro ao carregar os detalhes do atleta. Tente novamente mais tarde.</p>";
        return;
    }

    
    container.innerHTML = `
        <div class= "container-detalhes">
            <h1>${atleta.nome}</h1>
            <div class="pagina">
                
                <div class= "nome-foto">
                    
                    <img src="${atleta.imagem || 'assets/images/default-image.jpg'}" alt="Foto de ${atleta.nome}">
                </div>
                <div class= "detalhes">
                    <p><strong>Posição:</strong> ${atleta.posicao}</p>
                    <p><strong>Número de Jogos:</strong> ${atleta.n_jogos}</p>
                    <p><strong>Altura:</strong> ${atleta.altura}</p>
                    <p><strong>Naturalidade:</strong> ${atleta.naturalidade}</p>
                    <p>${atleta.detalhes}</p>
                </div>

                
            </div>
            <a href="atletas.html">Voltar</a>
        </div>
    `;
};


carregarDetalhes();







