// Verifica se o nó já foi visitado anteriormente
function naoVisitado(movimentos, no)
{  
    for(var i = 0; i < movimentos.length; i++)
    {
        if(no.x == movimentos[i].x && no.y == movimentos[i].y)
        {
            return false;
        }
    }
    return true;
}

// Adiciona o nó atual ao vetor solução se o mesmo for vizinho ao ultimo nó do array solucao
function insereSolucao(no, solucao)
{
    while(verificaVizinho(no, solucao) && solucao.length > 0)
    {
        solucao.pop();
    }
    solucao.push(no);
}

// Constroi o array com o caminho solução
function constroiCaminho(solucao, movimentos, inicio)
{
    var noAtual         = solucao.pop();
    var caminho         = new Array();
    caminho.push(noAtual);

    while( ! (noAtual.x == inicio.x && noAtual.y == inicio.y) )
    {
        for(var i = movimentos.length-1; i>=0; i--)
        {
            if(movimentos[i].nivel == noAtual.nivel - 1)
            {
                if(!verificaVizinho2(noAtual, movimentos[i]))
                {
                    caminho.push(movimentos[i]);
                    noAtual     = movimentos[i];
                    i           = movimentos.length;
                }
            }
        }
    }

    return caminho;
}

// Verifica vizinhos no-4
function verificaVizinho2(no, solucao)
{
    if (solucao.length <= 0)
        return false;
    else if(no.x-1 == solucao.x && no.y == solucao.y) 
        return false;
    else if (no.x + 1 == solucao.x && no.y == solucao.y) 
        return false;
    else if (no.x == solucao.x && no.y-1 == solucao.y) 
        return false;
    else if (no.x == solucao.x && no.y+1 == solucao.y) 
        return false;
    
    return true;
}

// Verifica se o nó atual é vizinho do ultimo nó inserido no vetor solução
function verificaVizinho(no, solucao)
{
    if (solucao.length <= 0)
        return false;
    else if(no.x - 1 == solucao[solucao.length-1].x && no.y == solucao[solucao.length-1].y)
        return false;
    else if (no.x + 1 == solucao[solucao.length-1].x && no.y == solucao[solucao.length-1].y)
        return false;
    else if (no.x == solucao[solucao.length-1].x && no.y - 1 == solucao[solucao.length-1].y)
        return false;
    else if (no.x == solucao[solucao.length-1].x && no.y + 1 == solucao[solucao.length-1].y)
        return false;
    
    return true;
}

// Calcula a distancia do no' ate' o final
function distanciaRaizFinal(no, final)
{
    return (Math.abs(no.x - final.x) + (Math.abs(no.y - final.y)));
}
