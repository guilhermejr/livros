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

export default function ListarLivros() {
  
  const [value, setValue] = useState(0);
  const [livros, setLivros] = useState([]);
  const [carregou, setCarregou] = useState(false);
  const [open, setOpen] = useState(false);
  const [livro, setLivro] = useState({id: 0, titulo: ''});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

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
    listaDeLivros(newValue+1, 0, rowsPerPage);

  };

  useEffect(() => {
    console.log("hook");
    listaDeLivros(1, page, rowsPerPage);
    
  }, []);

  //console.log(livros);

  const handleChangePage = (event, newPage) => {
    setCarregou(false);
    setPage(newPage);
    listaDeLivros(1, newPage, rowsPerPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setCarregou(false);
    const qtdPorPagina = parseInt(event.target.value, 10);
    setRowsPerPage(qtdPorPagina);
    setPage(0);
    listaDeLivros(1, 0, qtdPorPagina);
  };

  return (
    
    <ModalLivroContext.Provider value={{open: open, setOpen: setOpen, livro: livro, setLivro: setLivro}}>
        <ModalLivro />
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
      
      <TabPanel value={value} index={0}>
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

      <TabPanel value={value} index={1}>
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

      <TabPanel value={value} index={2}>
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
        <TablePagination
          style={{ justifyContent:"right", textAlign:"right", width: "100%", }}
          //labelDisplayedRows = {({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : mais que ${to}}`}
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
      <Hidden smDown>
        <TablePagination
          style={{ justifyContent:"right", textAlign:"right", width: "100%", }}
          //labelDisplayedRows = {({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : mais que ${to}}`}
          labelRowsPerPage="Livros por página:"
          rowsPerPageOptions = {[ 12, 24, 48, 96 ]}
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
