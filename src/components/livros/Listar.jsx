import React from 'react';
import LivroVazio from './LivroVazio';
import Livro from './Livro';

export default function Listar({livros}) {
    return(
        <>
            {livros.content.length === 0 && <LivroVazio mensagem="Nenhum livro encontrado nesta estante." />}
            {livros.content.map((livro) => <Livro key={livro.id} livro={livro} />)}  
        </>    
    )
}