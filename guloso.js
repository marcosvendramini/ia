// Funcao de fato que inicia o processo do método guloso
function guloso(inicio, final, tabuleiro)
{
    var movimentos          = new Array();
    var visitar             = new Array();
    var solucao             = new Array();

    calculaGuloso(inicio, final, movimentos, visitar, tabuleiro, solucao); 
    var constCam            = constroiCaminho(solucao, movimentos, inicio);

    return {movimentos: movimentos, solucao:solucao, caminho:constCam};
}

// Funcao recursiva que calcula o caminho percorrido pelo método guloso
function calculaGuloso(inicio, final, movimentos, visitar, tabuleiro, solucao)
{    
    movimentos.push(inicio);
    insereSolucao(inicio, solucao);

    if (inicio.x == final.x && inicio.y == final.y)
        return;
    
    var vizinho             = pegaVizinho(inicio, final, movimentos, visitar, tabuleiro, solucao, inicio.nivel+1);
   
    if(vizinho.x == -1)
        return;
    
    return calculaGuloso(vizinho, final, movimentos, visitar, tabuleiro, solucao);
}

// Procura o vizinho do nó atual olhando a vizinhança 4 conexa
function pegaVizinho(inicio, final, movimentos, visitar, tabuleiro, solucao, nivel)
{
    var vizinho;

    if ( inicio.x > 0 && naoVisitado(movimentos, {x:(inicio.x - 1), y:(inicio.y)}))
    {
        if(tabuleiro[inicio.x - 1][inicio.y] != -1)
        {
            var vizinho = {x:(inicio.x - 1), y:(inicio.y), peso: distanciaRaizFinal({x:(inicio.x - 1), y:(inicio.y)}, final)+solucao.length, nivel:nivel}
            visitar.push(vizinho);
        }
    }

    if (inicio.x < tabuleiro.length - 1 && naoVisitado(movimentos, {x:(inicio.x + 1), y:(inicio.y)}))
    {
        if(tabuleiro[inicio.x + 1][inicio.y] != -1)
        {
            var vizinho = {x:(inicio.x + 1), y:(inicio.y), peso: distanciaRaizFinal({x:(inicio.x + 1), y:(inicio.y)}, final)+solucao.length, nivel:nivel}
            visitar.push(vizinho);
        }
    } 

    if ( inicio.y > 0 && naoVisitado(movimentos, {x:(inicio.x), y:(inicio.y - 1)}))
    {
        if(tabuleiro[inicio.x][inicio.y - 1] != -1)
        {
            var vizinho = {x:(inicio.x), y:(inicio.y - 1), peso: distanciaRaizFinal({x:(inicio.x), y:(inicio.y - 1)}, final)+solucao.length, nivel:nivel}
            visitar.push(vizinho);
        }
    } 

    if ( inicio.y < tabuleiro[0].length - 1 && naoVisitado(movimentos, {x:(inicio.x), y:(inicio.y + 1)}))
    {
        if(tabuleiro[inicio.x][inicio.y + 1] != -1)
        {
            var vizinho = {x:(inicio.x), y:(inicio.y + 1), peso: distanciaRaizFinal({x:(inicio.x), y:(inicio.y + 1)}, final)+solucao.length, nivel:nivel}
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
