var contNivel = 0;

function initLargura(inicio, final, tabuleiro)
{
    contNivel               = 0;

    try {
        return largura(inicio, final, tabuleiro);
    }catch(error) {
        return false;
    }
}

function largura(inicio, final, tabuleiro)
{
    var movimentos          = new Array();
    var visitar             = new Array();
    var solucao             = new Array();
    var caminho             = new Array();

    calculaLargura(inicio, final, movimentos, visitar, tabuleiro, solucao, 0);
    caminho                 = constroiCaminho(solucao, movimentos, inicio);
 
    return {movimentos:movimentos, solucao:solucao, caminho:caminho};
}

// Funcao recursiva que calcula o caminho percorrido pelo método largura
function calculaLargura(inicio, final, movimentos, visitar, tabuleiro, solucao, nivel)
{    
    movimentos.push(inicio);
    insereSolucao(inicio, solucao);

    if (inicio.x == final.x && inicio.y == final.y)
    {
        return;
    }
    
    var elemento            = pegaVizinhoLarg(inicio, final, movimentos, visitar, tabuleiro, nivel);
    var vizinho             = elemento.shift();

    if(vizinho.x == -1)
        return;
    
    if(vizinho.nivel == inicio.nivel)
        return calculaLargura(vizinho, final, movimentos, visitar, tabuleiro, solucao, inicio.nivel+1);
    else
        return calculaLargura(vizinho, final, movimentos, visitar, tabuleiro, solucao, -1);
}

// Procura o vizinho do nó atual olhando a vizinhança 4 conexa
function pegaVizinhoLarg(inicio, final, movimentos, visitar, tabuleiro, nivel)
{
    var vizinho;
    var temVizinho          = false;
    var incrementou         = false;

    if ( inicio.x > 0 && naoVisitado(movimentos, {x:(inicio.x - 1), y:(inicio.y)}) && !estaListaVizinhos(visitar, {x:(inicio.x - 1), y:(inicio.y)}))
    {
        if(tabuleiro[inicio.x - 1][inicio.y] != -1)
        {
            temVizinho          = true;

            if(nivel != -1 && nivel != 0)
            {
                var vizinho = {x:(inicio.x - 1), y:(inicio.y), peso:0, nivel:nivel}
                contNivel=nivel;
            }
            else
            {
                var vizinho     = {x:(inicio.x - 1), y:(inicio.y), peso:0, nivel:contNivel+1}
                incrementou     = true;
            }
            visitar.push(vizinho);
        }
    }

    if (inicio.x < tabuleiro.length - 1 && naoVisitado(movimentos, {x:(inicio.x + 1), y:(inicio.y)}) && !estaListaVizinhos(visitar, {x:(inicio.x + 1), y:(inicio.y)}))
    {
        if(tabuleiro[inicio.x + 1][inicio.y] != -1)
        {
            temVizinho          = true;
            if(nivel != -1 && nivel != 0)
            {
                var vizinho     = {x:(inicio.x + 1), y:(inicio.y), peso:0, nivel:nivel}
                contNivel       = nivel;
            }
            else
            {
                var vizinho     = {x:(inicio.x + 1), y:(inicio.y), peso:0, nivel:contNivel+1}
                incrementou     = true;
            }
            visitar.push(vizinho);
        }
    } 

    if ( inicio.y > 0 && naoVisitado(movimentos, {x:(inicio.x), y:(inicio.y - 1)}) && !estaListaVizinhos(visitar, {x:(inicio.x), y:(inicio.y - 1)}))
    {
        if(tabuleiro[inicio.x][inicio.y - 1] != -1)
        {
            temVizinho          = true;
            if(nivel!=-1 && nivel!=0){
                var vizinho     = {x:(inicio.x), y:(inicio.y - 1), peso:0, nivel:nivel}
                contNivel       = nivel;
            }
            else
            {
                var vizinho     = {x:(inicio.x), y:(inicio.y - 1), peso:0, nivel:contNivel+1}
                incrementou     = true;
            }
            visitar.push(vizinho);
        }
    }

    if ( inicio.y < tabuleiro[0].length - 1 && naoVisitado(movimentos, {x:(inicio.x), y:(inicio.y + 1)}) && !estaListaVizinhos(visitar, {x:(inicio.x), y:(inicio.y + 1)}))
    {
        if(tabuleiro[inicio.x][inicio.y + 1] != -1){
            temVizinho          = true;
            if(nivel != -1 && nivel != 0)
            {
                var vizinho     = {x:(inicio.x), y:(inicio.y + 1), peso:0, nivel:nivel}
                contNivel       = nivel;
            }
            else
            {
                var vizinho     = {x:(inicio.x), y:(inicio.y + 1), peso:0, nivel:contNivel+1}
                incrementou     = true;
            }
            visitar.push(vizinho);
        }
    }
    if(temVizinho && incrementou)
    {
        contNivel++;
    }

    if (visitar.length > 0)
    {
        return visitar;
    } else {
        return {x: -1, y: -1};
    }
}


function estaListaVizinhos(visitar, no)
{  
    for(var i = 0; i < visitar.length; i++)
    {
        if(no.x == visitar[i].x && no.y == visitar[i].y)
        {
            return true;
        }
    }
    return false;
}



