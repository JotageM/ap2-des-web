document.getElementById("login-button").onclick = () => verificaSenha();

document.getElementById("password").addEventListener("keyup", (event) => {
    if (event.key === "Enter") verificaSenha();
});

const verificaSenha = () => {
    const entrada = document.getElementById("password").value;
    const senhaHash = CryptoJS.SHA256("mengao").toString();

    if (CryptoJS.SHA256(entrada).toString() === senhaHash) {
        sessionStorage.setItem("logado", "sim");
        window.location.href = "atletas.html";
    } else {
        const mensagemErro = document.getElementById("mensagem-erro");
        mensagemErro.textContent = "Senha incorreta. Tente novamente.";
        mensagemErro.style.display = "block";
    }
};



