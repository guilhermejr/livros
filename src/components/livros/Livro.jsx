import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ModalLivroContext from '../../contexts/ModalLivroContext';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  capaLivros: {
      width: '100%',
      height: '35vw',
      cursor: 'pointer',
      [theme.breakpoints.up('sm')]: {
          height: '20vw',
      },
  },

}));

export default function Livro({livro}) {

    const classes = useStyles();
    
    const { REACT_APP_API_URL } = process.env;
    const modal = useContext(ModalLivroContext);

    function abrirLivro(id, titulo, extensao) {
        console.log(id);
        modal.setOpen(true);
        modal.setLivro({id: id, titulo: titulo, extensao: extensao});
    }

    return(
      <Grid item xs={4} sm={2}>
        <Paper elevation={0}>
            <img onClick={() => {abrirLivro(livro.id, livro.titulo, livro.extensao)}} className={classes.capaLivros} src={`${REACT_APP_API_URL}/capas/${livro.id}.${livro.extensao}`} alt={`${livro.titulo}`} title={`${livro.titulo}`}/>
        </Paper>
      </Grid>     
    )
  }