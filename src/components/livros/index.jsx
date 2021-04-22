import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import 'fontsource-roboto';
import { makeStyles } from '@material-ui/core/styles';
import LivrosService from '../../services/LivrosService';
import { DialogContentText, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Listar from './Listar';
import Modal from '../../contexts/Modal';

const useStyles = makeStyles((theme) => ({

  capaLivros: {
      width: '100%',
      height: '35vw',
      cursor: 'pointer',
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

  const classes = useStyles();
  
  const [value, setValue] = useState(0);
  const [livros, setLivros] = useState([]);
  const [carregou, setCarregou] = useState(false);
  const [open, setOpen] = useState(false);

  

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

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = () => {
    setOpen(false);
  };

  return (
    
    <>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
        >
          <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
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
              <Modal.Provider value={setOpen}>
                <Listar livros={livros} classes={classes} />
              </Modal.Provider>
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
              <Modal.Provider value={setOpen}>
                <Listar livros={livros} classes={classes} />
              </Modal.Provider>
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
              <Modal.Provider value={setOpen}>
                <Listar livros={livros} classes={classes} />
              </Modal.Provider>
            </Grid>
        }
      </TabPanel>

    </>
  );
}
