//base de dados
const valores = {
    popular: {
        velocidadeMaxima: { min: 180, max: 200},
        velocidadeMinima: { min: 110, max: 130},
        derrapagem: { min: 0.03, max: 0.04}
    },
    sport: {
        velocidadeMaxima: { min: 195, max: 200 },
        velocidadeMinima: { min: 125, max: 145 },
        derrapagem: { min: 0.02, max: 0.03 }
    },
    superSport: {
        velocidadeMaxima: { min: 210, max: 230 },
        velocidadeMinima: { min: 125, max: 145 },
        derrapagem: { min: 0.01, max: 0.0175 }
    }
};

//carros
const frota = {
    pedro: {
        raridade: "",
        velocidadeMaxima: "",
        velocidadeMinima: "",
        derrapagem: ""
    },
    juca: {
        raridade: "",
        velocidadeMaxima: "",
        velocidadeMinima: "",
        derrapagem: ""
    },
    edna: {
        raridade: "",
        velocidadeMaxima: "",
        velocidadeMinima: "",
        derrapagem: ""
    }
};

//dados para cada corrida
const corredores = {
    pedro: {
        vitorias: "",
        velocidade: ""
    },
    juca: {
        vitorias: "",
        velocidade: ""
    },
    edna: {
        vitorias: "",
        velocidade: ""
    }
}

const informarVencedor = document.getElementById("vencedor");

//função para determinar a raridade
function determinarRaridade () {
    let raridade = "";
    let probabilidade = Math.random();
    if (probabilidade <= 0.6) {
        raridade = "popular";
    } else if (probabilidade > 0.6 && probabilidade <= 0.95) {
        raridade = "sport";
    } else {
        raridade = "super sport";
    }
    return raridade;
}

//função para gerar os valores dos carros
function determinarValor (limiteInferior, limiteSuperior) {
    let valor = Math.random()*(limiteSuperior - limiteInferior) + limiteInferior;
    return valor;
}

// velocidade em cada volta
function velocidade(min,max,derrapagem) {
    let vel = Math.random()*(max-min) + min;
    let velocidadeFinal = vel*(100 - derrapagem);
    return velocidadeFinal;
}

//funçao para determinar o vencedor de cada tipo de Corridas
function corridas(iteracao) {
    corredores.pedro.vitorias = 0;
    corredores.juca.vitorias = 0;
    corredores.edna.vitorias = 0;
    frota.pedro.raridade = determinarRaridade();
    frota.juca.raridade = determinarRaridade();
    frota.edna.raridade = determinarRaridade();
    frota.pedro.velocidadeMaxima = determinarValor(valores[frota.pedro.raridade].velocidadeMaxima.min , valores[frota.pedro.raridade].velocidadeMaxima.max);
    frota.pedro.velocidadeMinima = determinarValor(valores[frota.pedro.raridade].velocidadeMinima.min , valores[frota.pedro.raridade].velocidadeMinima.max);
    frota.pedro.derrapagem = determinarValor(valores[frota.pedro.raridade].derrapagem.min, valores[frota.pedro.raridade].derrapagem.max);

    frota.juca.velocidadeMaxima = determinarValor(valores[frota.juca.raridade].velocidadeMaxima.min , valores[frota.juca.raridade].velocidadeMaxima.max);
    frota.juca.velocidadeMinima = determinarValor(valores[frota.juca.raridade].velocidadeMinima.min , valores[frota.juca.raridade].velocidadeMinima.max);
    frota.juca.derrapagem = determinarValor(valores[frota.juca.raridade].derrapagem.min, valores[frota.juca.raridade].derrapagem.max);

    frota.edna.velocidadeMaxima = determinarValor(valores[frota.edna.raridade].velocidadeMaxima.min , valores[frota.edna.raridade].velocidadeMaxima.max);
    frota.edna.velocidadeMinima = determinarValor(valores[frota.edna.raridade].velocidadeMinima.min , valores[frota.edna.raridade].velocidadeMinima.max);
    frota.edna.derrapagem = determinarValor(valores[frota.edna.raridade].derrapagem.min, valores[frota.edna.raridade].derrapagem.max);

    for (let i = 0; i <= iteracao; i++) {
        corredores.pedro.velocidade = velocidade ( frota.pedro.velocidadeMinima , frota.pedro.velocidadeMaxima , frota.pedro.derrapagem );
        corredores.juca.velocidade = velocidade ( frota.juca.velocidadeMinima , frota.juca.velocidadeMaxima , frota.juca.derrapagem );
        corredores.edna.velocidade = velocidade ( frota.edna.velocidadeMinima , frota.edna.velocidadeMaxima , frota.edna.derrapagem );
        let volta = [corredores.pedro.velocidade , corredores.juca.velocidade, corredores.edna.velocidade];
        let resultadoVolta = volta.sort((a,b) => b - a);
        if (resultadoVolta[0] === corredores.pedro.velocidade) {
            corredores.pedro.vitorias += 1;
        } else if (resultadoVolta[0] === corredores.juca.velocidade) {
            corredores.juca.vitorias += 1;
        } else {
            corredores.edna.vitorias += 1;
        }
    }

    let valoresFinais = [corredores.pedro.vitorias, corredores.juca.vitorias, corredores.edna.vitorias];
    let resultado = valoresFinais.sort(( a, b) => b - a);
    let vencedor = "";
    if (resultado[0] === corredores.pedro.vitorias) {
        vencedor = "Pedro";
    } else if (resultado[0] === corredores.juca.vitorias) {
        vencedor = "Juca";
    } else {
        vencedor = "Edna";
    }
    console.log("O vencedor da corrida rápida é " + vencedor);
    informarVencedor.innerHTML = "O vencedor da corrida rápida é " + vencedor;

}
