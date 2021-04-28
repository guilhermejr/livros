import React, { useState, useContext, useEffect } from 'react';
import { DialogContentText, Dialog, DialogContent, DialogActions, DialogTitle, Button, Grid, Paper, LinearProgress } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import {  makeStyles } from '@material-ui/core/styles';
import LivrosService from '../../services/LivrosService';
import ModalLivroContext from '../../contexts/ModalLivroContext';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { isAutenticado } from '../../services/auth';
import EstantesService from '../../services/EstantesService';

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

    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },

}));

export default function ModalLivro() {

    const { REACT_APP_API_URL } = process.env;
    const modal = useContext(ModalLivroContext);
    const [livro, setLivro] = useState({});
    const classes = useStyles();
    const [carregou, setCarregou] = useState(false);
    const [estantes, setEstantes] = useState([]);
    const [estanteId, setEstanteId] = useState(1);

    const service = new LivrosService();
    const estanteService = new EstantesService();

    const handleChange = (event) => {
      setEstanteId(event.target.value);
      console.log(event.target.value);
      if(window.confirm('Deseja realmente mudar o livro '+ livro.titulo +' para a estante '+ estantes[event.target.value - 1].descricao +' ?')) {
        estanteService.mudar(livro.id, event.target.value)
        .then((response) => {
          setEstanteId(event.target.value);
          console.log(livro);
          console.log('mudou de estante');
        })
        .catch((error) => {
          console.log(error.request);
          alert(error);
        });
      }
      
    };

    const handleClose = () => {
        modal.setOpen(false);
        setCarregou(false);
    };

    const carregarLivro = async (id) => {
        try {
          const livro = await service.get(id);
          if (livro.status === 200) {
            setLivro(livro.data);
            setCarregou(true);
            setEstanteId(livro.data.estante.id);
            console.log(livro.data);
          }
      
        } catch (error) {
          alert(error);
        }
      };

    useEffect(() => {
        if (modal.livro.id !== 0) {
            carregarLivro(modal.livro.id);
            modal.setLivro({id: 0, titulo: modal.livro.titulo, extensao: modal.livro.extensao});
        }
    }, [modal.livro.id]);

    useEffect(() => {

      estanteService.getAll()
        .then((response) => {
          setEstantes(response.data);
        })
        .catch((error) => {
          alert(error);
        });

    }, []);

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
                                        <img src={`${REACT_APP_API_URL}/capas/${livro.id}.${livro.extensao}`} alt={`${livro.titulo}`} title={`${livro.titulo}`} /><br/>
                                    </div>
                                    {livro.subtitulo && ReactHtmlParser(`${livro.subtitulo} <br/>`)}
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

                                    {isAutenticado && (
                                      <FormControl className={classes.formControl}>
                                        <InputLabel id="mudar-estante">Estante</InputLabel>
                                        <Select
                                          labelId="mudar-estante"
                                          id="mudar-estante-select"
                                          value={estanteId}
                                          onChange={handleChange}
                                        >
                                          {estantes.map((estante) =>
                                            <MenuItem value={estante.id}>{estante.descricao}</MenuItem>
                                          )}
                                        </Select>
                                      </FormControl>
                                    )}
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