function initAStar(inicio,final,tabuleiro)
{
    var movimentos              = [];
    var visitar                 = [];
    var solucao                 = [];

    let resultado               = aStar(inicio, final, movimentos, visitar, tabuleiro, solucao);
    var constCam                = constroiCaminho(solucao, movimentos, inicio);
    
    return {movimentos:resultado.movimentos, solucao:resultado.solucao, caminho:constCam};
}


// Funcao de fato que inicia o processo do metodo A*
function aStar(inicio, final, movimentos, visitar, tabuleiro, solucao)
{
    calculaAStar(inicio, final, movimentos, visitar, tabuleiro, solucao, 0);
    return {movimentos:movimentos, solucao:solucao};
}

function calculaAStar(inicio, final, movimentos, visitar, tabuleiro, solucao)
{   
    movimentos.push(inicio);
    insereSolucao(inicio, solucao);

    if (inicio.x == final.x && inicio.y == final.y)
    {
        return;
    }

    var vizinho = pegaVizinhoEstrela(inicio, final, movimentos, visitar, tabuleiro, solucao, 1, inicio.nivel+1);
   
    if(vizinho.x == -1)
    {
        return;
    }

    return calculaAStar(vizinho, final, movimentos, visitar, tabuleiro, solucao);
}

// Procura o vizinho do no' atual olhando a vizinhanca 4 conexa utilizando somente a heuristica [h(n)]
function pegaVizinhoEstrela(inicio, final, movimentos, visitar, tabuleiro, solucao, type, nivel)
{
    var vizinho;
    var temVizinho                  = false;
    var incrementou                 = false;

    if ( inicio.x > 0 && naoVisitado(movimentos, {x:(inicio.x - 1), y:(inicio.y)}))
    {
        if(tabuleiro[inicio.x - 1][inicio.y] != -1)
        {
            if(type == 0)
            {
                var vizinho         = {x:(inicio.x - 1), y:(inicio.y), peso: distanciaRaizFinal({x:(inicio.x - 1), y:(inicio.y)}, final)}
            }
            else if(type == 1)
            {
                temVizinho          = true;
                var vizinho         = {x:(inicio.x - 1), y:(inicio.y), peso: distanciaRaizFinal({x:(inicio.x - 1), y:(inicio.y)}, final)+nivel, nivel:nivel}
                   
            }

            visitar.push(vizinho);
        }
    } 

    if (inicio.x < tabuleiro.length - 1 && naoVisitado(movimentos, {x:(inicio.x + 1), y:(inicio.y)}))
    {
        if(tabuleiro[inicio.x + 1][inicio.y] != -1)
        {
            if(type == 0)
            {
                var vizinho         = {x:(inicio.x + 1), y:(inicio.y), peso: distanciaRaizFinal({x:(inicio.x + 1), y:(inicio.y)}, final)}
            }
            else if(type == 1)
            {
                var vizinho         = {x:(inicio.x + 1), y:(inicio.y), peso: distanciaRaizFinal({x:(inicio.x + 1), y:(inicio.y)}, final)+nivel, nivel:nivel}
            }

            visitar.push(vizinho);
        }
    } 

    if ( inicio.y > 0 && naoVisitado(movimentos, {x:(inicio.x), y:(inicio.y - 1)}))
    {
        if(tabuleiro[inicio.x][inicio.y - 1] != -1)
        {
            if(type == 0)
            {
                var vizinho         = {x:(inicio.x), y:(inicio.y - 1), peso: distanciaRaizFinal({x:(inicio.x), y:(inicio.y - 1)}, final)} 
            }
            else if(type==1)
            {
                var vizinho         = {x:(inicio.x), y:(inicio.y - 1), peso: distanciaRaizFinal({x:(inicio.x), y:(inicio.y - 1)}, final)+nivel, nivel:nivel}    
            }

            visitar.push(vizinho);
        }
    } 

    if ( inicio.y < tabuleiro[0].length - 1 && naoVisitado(movimentos, {x:(inicio.x), y:(inicio.y + 1)}))
    {
        if(tabuleiro[inicio.x][inicio.y + 1] != -1)
        {
            if(type==0)
            {    
                var vizinho         = {x:(inicio.x), y:(inicio.y + 1), peso: distanciaRaizFinal({x:(inicio.x), y:(inicio.y + 1)}, final)}
            }
            else if(type==1)
            {
                var vizinho         = {x:(inicio.x), y:(inicio.y + 1), peso: distanciaRaizFinal({x:(inicio.x), y:(inicio.y + 1)}, final)+nivel, nivel:nivel}
            }

            visitar.push(vizinho);
        }
    }

    visitar.sort(function(a, b)
    {
        return b.peso - a.peso;
    });

    if (visitar.length > 0)
    {
        return visitar.pop();
    }
    else
    {
        return {x: -1, y: -1};
    }
    
}


