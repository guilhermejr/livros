import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'fontsource-roboto';
import LivrosService from '../../services/LivrosService';
import Listar from './Listar';
import ModalLivro from './ModalLivro';
import ModalLivroContext from '../../contexts/ModalLivroContext';
import TablePagination from '@material-ui/core/TablePagination';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  
  paginacaoRodapeFixo: {
    position: 'fixed',
    bottom: theme.spacing(0),
    right: theme.spacing(2),
    backgroundColor: '#fff',
  },

  naoMostrar: {
    display: 'none',
  },

}));

const service = new LivrosService();

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function ListarLivros({ pesquisa, setPesquisa }) {
  
  const [value, setValue] = useState(0);
  const [livros, setLivros] = useState([]);
  const [carregou, setCarregou] = useState(false);
  const [open, setOpen] = useState(false);
  const [livro, setLivro] = useState({id: 0, titulo: '', extensao: ''});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(24);
  const [estante, setEstante] = useState(1);

  const classes = useStyles();

  const pesquisarLivros = async (estante, texto) => {
    try {
      
      const livros = await service.pesquisar(estante, texto);
      if (livros.status === 200) {
        setLivros(livros.data);
        console.log(livros);
        setCarregou(true);
      }
  
    } catch (error) {
      alert(error);
    }
  };

  const listaDeLivros = async (estante, pagina, quantidade) => {
    try {
      
      const livros = await service.getAll(estante, pagina, quantidade);
      if (livros.status === 200) {
        setLivros(livros.data);
        console.log(livros);
        setCarregou(true);
      }
  
    } catch (error) {
      alert(error);
    }
  };

  const handleChange = (event, newValue) => {
    
      setCarregou(false);
      setValue(newValue);
      setPage(0);
      setEstante(newValue+1);
    if (pesquisa === '') {
      listaDeLivros(newValue+1, 0, rowsPerPage);
    }

  };

  useEffect(() => {
    console.log("carga inicial");
    listaDeLivros(estante, page, rowsPerPage);
    
  }, []);

  useEffect(() => {

    if (pesquisa !== '') {
      console.log('pesquisa');
      setCarregou(false);
      pesquisarLivros(estante, pesquisa);
    }

  }, [estante, pesquisa]);

  //console.log(livros);

  const handleChangePage = (event, newPage) => {
    setCarregou(false);
    setPage(newPage);
    listaDeLivros(estante, newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setCarregou(false);
    const qtdPorPagina = parseInt(event.target.value, 10);
    setRowsPerPage(qtdPorPagina);
    setPage(0);
    listaDeLivros(estante, 0, qtdPorPagina);
  };

  const limpar = () => {
    console.log("limpou");
    setCarregou(false);
    setPesquisa('');
    listaDeLivros(estante, 0, rowsPerPage);
  }

  return (
    
    <ModalLivroContext.Provider value={{open: open, setOpen: setOpen, livro: livro, setLivro: setLivro}}>
        <ModalLivro />
        <Chip className={pesquisa === '' && classes.naoMostrar} label={pesquisa} onDelete={limpar} color="primary" />
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Biblioteca" />
          <Tab label="Desejados" />
          <Tab label="Doação" />
        </Tabs>
      
      <TabPanel>
        {
          !carregou
          ?
            <LinearProgress />
          :
            <Grid container spacing={2}>
                <Listar livros={livros} />
            </Grid>
        }
      </TabPanel>

      <Hidden smUp>
        <TablePagination className={classes.paginacaoRodapeFixo}
          style={{ justifyContent:"right", textAlign:"right", width: "100%", }}
          labelDisplayedRows = {({ from, to, count }) => `${from}-${to} de ${count}`}
          labelRowsPerPage="Livros por página:"
          rowsPerPageOptions = {[]}
          component="div"
          count={livros.totalElements}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Hidden>
      <Hidden xsDown>
        <TablePagination className={classes.paginacaoRodapeFixo}
          style={{ justifyContent:"right", textAlign:"right", width: "100%", }}
          labelDisplayedRows = {({ from, to, count }) => `${from}-${to} de ${count}`}
          labelRowsPerPage="Livros por página:"
          rowsPerPageOptions = {[ 24, 48, 72, 96 ]}
          component="div"
          count={livros.totalElements}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Hidden>
    </ModalLivroContext.Provider>
  );
}
