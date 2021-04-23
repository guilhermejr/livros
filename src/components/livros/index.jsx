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

  const listaDeLivros = async (estante) => {
    try {
      
      const livros = await service.getAll(estante);
      if (livros.status === 200) {
        setLivros(livros.data.content);
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
    listaDeLivros(newValue+1);

  };

  useEffect(() => {

    listaDeLivros(1);
    
  }, []);

  //console.log(livros);

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

    </ModalLivroContext.Provider>
  );
}
