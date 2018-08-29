function profundidade(inicio, final, tabuleiro)
{
    var movimentos 				= new Array();
    var visitar 				= new Array();
    var solucao 				= new Array();

    calculaProfunfidade(inicio, final, movimentos, visitar, tabuleiro, solucao);
    return {movimentos: movimentos, solucao:solucao};
}

function calculaProfunfidade(inicio, final, movimentos, visitar, tabuleiro, solucao)
{    
    movimentos.push(inicio);
    insereSolucao(inicio, solucao);

    if (inicio.x == final.x && inicio.y == final.y)
    {
        return true;
    }

    return pegaVizinhoProfundidade(inicio, final, movimentos, visitar, tabuleiro, solucao);
}


function pegaVizinhoProfundidade(inicio, final, movimentos, visitar, tabuleiro, solucao)
{
    var vizinho;

    if ( inicio.x > 0 && naoVisitado(movimentos, {x:(inicio.x - 1), y:(inicio.y)})) 
    {
    	if(tabuleiro[inicio.x - 1][inicio.y] != -1)
    	{
    		if(calculaProfunfidade({x:(inicio.x - 1), y:(inicio.y)}, final, movimentos, visitar, tabuleiro, solucao))
    		{
    			return true;
    		}
    		else
    		{
    			solucao.pop();
    		}
    	}
    }

    if (inicio.x < tabuleiro.length - 1 && naoVisitado(movimentos, {x:(inicio.x + 1), y:(inicio.y)})) 
    {
    	if(tabuleiro[inicio.x + 1][inicio.y] != -1) 
    	{
    		if (calculaProfunfidade({x:(inicio.x + 1), y:(inicio.y)}, final, movimentos, visitar, tabuleiro, solucao)) 
    		{
    			return true;
    		}
    		else
    		{
    			solucao.pop();
    		}  
    	}
    }

    if ( inicio.y > 0 && naoVisitado(movimentos, {x:(inicio.x), y:(inicio.y - 1)}))
    {
    	if(tabuleiro[inicio.x][inicio.y - 1] != -1)
    	{
    		if (calculaProfunfidade({x:(inicio.x), y:(inicio.y - 1)}, final, movimentos, visitar, tabuleiro, solucao))
    		{
    			return true;
    		}
    		else
    		{
    			solucao.pop();
    		}
    	}
    } 

    if ( inicio.y < tabuleiro[0].length - 1 && naoVisitado(movimentos, {x:(inicio.x), y:(inicio.y + 1)}))
    {
    	if(tabuleiro[inicio.x][inicio.y + 1] != -1)
    	{
    		if (calculaProfunfidade({x:(inicio.x), y:(inicio.y + 1)}, final, movimentos, visitar, tabuleiro, solucao))
    		{
    			return true;
    		}
    		else
    		{
    			solucao.pop();
    		}
    	}
    }

}
