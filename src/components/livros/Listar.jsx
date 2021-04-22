import React from 'react';
import LivroVazio from './LivroVazio';
import Livro from './Livro';

export default function Listar({livros, classes}) {
    return(
        <>
            {livros.length === 0 && <LivroVazio mensagem="Nenhum livro encontrado nesta estante." classes={classes} />}
            {livros.map((livro) => <Livro key={livro.id} livro={livro} classes={classes} />)}  
        </>    
    )
}