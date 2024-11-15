if (!sessionStorage.getItem("logado")) {
    window.location.href = "index.html";
}


const container = document.getElementById("container");


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


const filtrarAtletas = async (genero = 'todos', nome = '') => {
    container.innerHTML = '';
    let endpoint = "https://botafogo-atletas.mange.li/2024-1/";
    endpoint += genero === 'todos' ? "all" : genero;

    const atletas = await pega_json(endpoint);
    const atletasFiltrados = atletas.filter(atleta =>
        atleta.nome.toLowerCase().includes(nome.toLowerCase())
    );

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
        <p>${atleta.detalhes}</p>
        <button class="saiba-mais" data-id="${atleta.id}">Saiba Mais</button>
    `;

    cartao.querySelector('.saiba-mais').onclick = () => {
        window.location.href = `detalhes.html?id=${atleta.id}`;
    };

    container.appendChild(cartao);
};


const debounce = (func, delay) => {
    let debounceTimer;
    return function(...args) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(this, args), delay);
    };
};


const debounceFiltroNome = debounce((event) => {
    const nome = event.target.value;
    const genero = document.querySelector('#filtro-genero button.active')?.getAttribute('data-genero') || 'todos';
    filtrarAtletas(genero, nome);
}, 300);

document.getElementById("filtro-nome").addEventListener("input", debounceFiltroNome);

document.getElementById("filtro-genero").addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        document.querySelectorAll("#filtro-genero button").forEach(btn => btn.classList.remove("active"));
        event.target.classList.add("active");
        filtrarAtletas(event.target.getAttribute("data-genero"), document.getElementById("filtro-nome").value);
    }
});


document.getElementById("logout").onclick = () => {
    sessionStorage.removeItem("logado");
    window.location.href = "index.html";
};


filtrarAtletas();






