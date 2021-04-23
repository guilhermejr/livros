import React from 'react';
import LivroVazio from './LivroVazio';
import Livro from './Livro';

export default function Listar({livros}) {
    return(
        <>
            {livros.length === 0 && <LivroVazio mensagem="Nenhum livro encontrado nesta estante." />}
            {livros.map((livro) => <Livro key={livro.id} livro={livro} />)}  
        </>    
    )
}