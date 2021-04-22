import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Modal from '../../contexts/Modal';

export default function Livro({livro, classes}) {
    
    const { REACT_APP_API_URL } = process.env;
    const modal = useContext(Modal);

    function abrirLivro(id, titulo) {
        console.log(id);
        modal.setOpen(true);
        modal.setLivro({id: id, titulo: titulo});
    }

    return(
      <Grid item xs={4} sm={2}>
        <Paper elevation={0}>
            <img onClick={() => {abrirLivro(livro.id, livro.titulo)}} className={classes.capaLivros} src={`${REACT_APP_API_URL}/capas/${livro.id}.jpg`} alt={`${livro.titulo}`} title={`${livro.titulo}`}/>
        </Paper>
      </Grid>     
    )
  }