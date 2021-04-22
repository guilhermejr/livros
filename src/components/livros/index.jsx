import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'fontsource-roboto';

import { makeStyles } from '@material-ui/core/styles';
import LivrosService from '../../services/LivrosService';

const useStyles = makeStyles((theme) => ({

  capaLivros: {
      width: '100%',
      height: '35vw',
      [theme.breakpoints.up('sm')]: {
          height: '20vw',
      },
  },

  mensagem: {
    marginTop: '100px',
    fontSize: '30px',
    textAlign: 'center',
  },

}));

const service = new LivrosService();

const { REACT_APP_API_URL } = process.env;

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

function LivroVazio({mensagem, classes}) {
  return(
    <Grid container justify="center">
      <Paper elevation={0}>
          <div className={classes.mensagem}>{mensagem}</div>
      </Paper>
    </Grid> 
  )
}

function Livro({livro, classes}) {
  return(
    <Grid item xs={4} sm={2}>
      <Paper elevation={0}>
          <img className={classes.capaLivros} src={`${REACT_APP_API_URL}/capas/${livro.id}.jpg`} alt={`${livro.titulo}`} title={`${livro.titulo}`}/>
      </Paper>
    </Grid>     
  )
}

function Listar({livros, classes}) {
  return(
    <>
      {livros.length === 0 && <LivroVazio mensagem="Nenhum livro encontrado nesta estante." classes={classes} />}
      {livros.map((livro) => <Livro key={livro.id} livro={livro} classes={classes} />)}  
    </>    
  )
}

export default function ListarLivros() {

  const classes = useStyles();
  
  const [value, setValue] = useState(0);
  const [livros, setLivros] = useState([]);
  const [carregou, setCarregou] = useState(false);

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
    
    <>

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
              <Listar livros={livros} classes={classes} />
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
              <Listar livros={livros} classes={classes} />
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
              <Listar livros={livros} classes={classes} />
            </Grid>
        }
      </TabPanel>

    </>
  );
}
