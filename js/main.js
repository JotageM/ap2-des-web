if (!sessionStorage.getItem("logado")) {
    window.location.href = "index.html";
}


const container = document.getElementById("container");
let atletasCache = []; 
let generoSelecionado = '';  

const pega_json = async (caminho) => {
    try {
        const resposta = await fetch(caminho);
        if (!resposta.ok) throw new Error(`Erro ${resposta.status}: Não foi possível carregar os dados.`);
        return await resposta.json();
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro ao carregar os dados dos atletas. Tente novamente mais tarde.");
        return [];
    }
};

const carregarAtletas = async (genero) => {
    
    let endpoint = "https://botafogo-atletas.mange.li/2024-1/";
    endpoint += genero === 'todos' ? "all" : genero;

    atletasCache = await pega_json(endpoint);  // Carrega e armazena os dados no cache
    filtrarAtletas(genero, document.getElementById("filtro-nome").value);  // Exibe a lista filtrada
};

const filtrarAtletas = (genero, nome = '') => {
    container.innerHTML = '';
    const atletasFiltrados = atletasCache
        .filter(atleta => atleta.nome.toLowerCase().includes(nome.toLowerCase()));

    if (atletasFiltrados.length === 0) {
        container.innerHTML = "<p>Nenhum atleta encontrado.</p>";
    } else {
        atletasFiltrados.forEach(montaCard);
    }
};

const montaCard = (atleta) => {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao");

    cartao.innerHTML = `
        <h1>${atleta.nome}</h1>
        <img src="${atleta.imagem || 'assets/images/default-image.jpg'}" alt="Foto de ${atleta.nome}">
        <button class="saiba-mais" data-id="${atleta.id}">Saiba Mais</button>
    `;

    cartao.querySelector('.saiba-mais').onclick = () => {
        window.location.href = `detalhes.html?id=${atleta.id}`;
    };

    container.appendChild(cartao);
};


document.getElementById("filtro-nome").addEventListener("input", (event) => {
    const nome = event.target.value;
    if (generoSelecionado) {  
        filtrarAtletas(generoSelecionado, nome); 
    }
});

document.getElementById("filtro-genero").addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        
        document.querySelectorAll("#filtro-genero button").forEach(btn => btn.classList.remove("active"));
        event.target.classList.add("active");

        
        generoSelecionado = event.target.getAttribute("data-genero");
        carregarAtletas(generoSelecionado);
    }
});

document.getElementById("filtro-genero-select").addEventListener("change", (event) => {
    generoSelecionado = event.target.value;
    carregarAtletas(generoSelecionado);
});


document.getElementById("logout").onclick = () => {
    sessionStorage.removeItem("logado");
    window.location.href = "index.html";
};









