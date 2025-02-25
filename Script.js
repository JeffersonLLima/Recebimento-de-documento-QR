// Função para calcular a divergência percentual
function calcularDivergencia() {
    const valorAntigo = parseFloat(document.getElementById("valorAntigo").value);
    const valorNovo = parseFloat(document.getElementById("valorNovo").value);

    // Validação dos valores inseridos
    if (isNaN(valorAntigo) || isNaN(valorNovo) || valorAntigo <= 0) {
        document.getElementById("resultado").innerText = "Por favor, insira valores válidos!";
        return;
    }

    // Cálculo da divergência
    const divergencia = ((valorNovo - valorAntigo) / valorAntigo) * 100;
    const mensagem = divergencia > 0 
        ? `Aumento de ${divergencia.toFixed(2)}%`
        : `Redução de ${Math.abs(divergencia).toFixed(2)}%`;

    const status = divergencia > 5 ? "Pendente" : "Apta para Embarque";

    // Exibe o resultado
    document.getElementById("resultado").innerText = `Resultado: ${mensagem}. Status: ${status}`;
}

// Função para carregar documentos do Local Storage
function carregarDocumentos() {
    const documentosSalvos = JSON.parse(localStorage.getItem("documentos")) || [];
    const tabela = document.getElementById("document-list");
    documentosSalvos.forEach(doc => {
        const novaLinha = document.createElement("tr");
        novaLinha.innerHTML = `
            <td>${doc.mawb}</td>
            <td>${doc.data}</td>
            <td>${doc.hora}</td>
            <td>${doc.peso} kg</td>
            <td>${doc.origem}</td>
            <td>${doc.destino}</td>
            <td>${doc.status}</td>
            <td><input type="checkbox" /></td>
            <td><button onclick="removerDocumento(this)">Remover</button></td>
        `;
        tabela.appendChild(novaLinha);
    });
}

// Função para adicionar documentos
document.getElementById("document-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const mawb = document.getElementById("document-name").value;
    const data = document.getElementById("dataRecebimento").value;
    const hora = document.getElementById("horaRecebimento").value;
    const peso = document.getElementById("pesoDocumento").value;
    const origem = document.getElementById("origemDocumento").value;
    const destino = document.getElementById("destinoDocumento").value;
    const status = document.getElementById("statusDocumento").value;

    // Adiciona documento à tabela
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${mawb}</td>
        <td>${data}</td>
        <td>${hora}</td>
        <td>${peso} kg</td>
        <td>${origem}</td>
        <td>${destino}</td>
        <td>${status}</td>
        <td><input type="checkbox" /></td>
        <td><button onclick="removerDocumento(this)">Remover</button></td>
    `;
    document.getElementById("document-list").appendChild(newRow);

    // Salva no Local Storage
    salvarDocumentos();

    // Limpa os campos
    document.getElementById("document-form").reset();
});

// Função para salvar documentos no Local Storage
function salvarDocumentos() {
    const documentos = [];
    const rows = document.querySelectorAll("#document-list tr");

    rows.forEach(row => {
        const cols = row.querySelectorAll("td");
        documentos.push({
            mawb: cols[0].textContent,
            data: cols[1].textContent,
            hora: cols[2].textContent,
            peso: cols[3].textContent.replace(" kg", ""),
            origem: cols[4].textContent,
            destino: cols[5].textContent,
            status: cols[6].textContent
        });
    });

    localStorage.setItem("documentos", JSON.stringify(documentos));
}

// Função para remover um documento com senha
function removerDocumento(button) {
    const senhaCorreta = "Soeuseiasenh@";
    const senha = prompt("Digite a senha para remover o documento:");

    if (senha === senhaCorreta) {
        button.closest("tr").remove();
        salvarDocumentos();
    } else {
        alert("Senha incorreta. O documento não foi removido.");
    }
}

// Função para filtrar documentos
function filtrarDocumento() {
    const searchTerm = document.getElementById("search").value.toLowerCase();
    const rows = document.querySelectorAll("#document-list tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        let match = false;
        cells.forEach(cell => {
            if (cell.textContent.toLowerCase().includes(searchTerm)) {
                match = true;
            }
        });
        row.style.display = match ? "" : "none";
    });
}

// Carregar documentos ao iniciar a página
document.addEventListener("DOMContentLoaded", carregarDocumentos);
