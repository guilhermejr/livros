import React, { useState, useContext, useEffect } from 'react';
import { DialogContentText, Dialog, DialogContent, DialogActions, DialogTitle, Button, Grid, Paper, LinearProgress } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import {  makeStyles } from '@material-ui/core/styles';
import LivrosService from '../../services/LivrosService';
import ModalLivroContext from '../../contexts/ModalLivroContext';

const useStyles = makeStyles((theme) => ({

    capa: {
      textAlign: 'center',
      [theme.breakpoints.up('sm')]: {
        textAlign: 'left',
      },
    },

    esconder: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },

}));

export default function ModalLivro() {

    const modal = useContext(ModalLivroContext);
    const [livro, setLivro] = useState({});
    const { REACT_APP_API_URL } = process.env;
    const classes = useStyles();
    const [carregou, setCarregou] = useState(false);

    const handleClose = () => {
        modal.setOpen(false);
        setCarregou(false);
    };

    const service = new LivrosService();

    const carregarLivro = async (id) => {
        try {
          const livro = await service.get(id);
          if (livro.status === 200) {
            setLivro(livro.data);
            setCarregou(true);
            console.log(livro.data);
          }
      
        } catch (error) {
          alert(error);
        }
      };

    useEffect(() => {
        if (modal.livro.id !== 0) {
            carregarLivro(modal.livro.id);
            modal.setLivro({id: 0, titulo: modal.livro.titulo});
        }
    }, [modal.livro.id]);

    return(
        <Dialog
          open={modal.open}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={'lg'}
        >
          <DialogTitle>{modal.livro.titulo}</DialogTitle>
          <DialogContent>
            <DialogContentText>
                {
                    !carregou 
                    ? 
                        <LinearProgress />
                    :
                        <Grid container spacing={3}>
                            <Grid item sm={3} xs={12}>
                                <Paper elevation={0}>
                                    <div className={classes.capa}>
                                        <img src={`${REACT_APP_API_URL}/capas/${livro.id}.jpg`} alt={`${livro.titulo}`} title={`${livro.titulo}`} /><br/>
                                    </div>
                                    <ul>
                                        {livro.autores && livro.autores.map((autor) => <li>{autor.descricao}</li>)}
                                    </ul>
                                    <hr />
                                    <br />
                                    ISBN: {livro.isbn}<br/>
                                    Editora: {livro.editora && livro.editora.descricao}<br/>
                                    Idioma: {livro.idioma && livro.idioma.descricao}<br/>
                                    Ano publicação: {livro.anoPublicacao} <br />
                                    Páginas: {livro.paginas}<br/>
                                    Tipo: {livro.tipo && livro.tipo.descricao}<br/><br/>
                                    <hr className={classes.esconder} />
                                </Paper>
                            </Grid>
                            <Grid item sm={9} xs={12}>
                                <Paper elevation={0}>
                                    <div align="justify">{ReactHtmlParser(livro.descricao)}</div>
                                    <ul>
                                        {livro.generos && livro.generos.map((genero) => <li>{genero.descricao}</li>)}
                                    </ul>
                                </Paper>
                            </Grid>
                        </Grid>
                }
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
    )
}