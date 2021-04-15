import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import LivrosService from '../../services/livros';

const useStyles = makeStyles((theme) => ({

    capaLivros: {
        width: '100%',
        height: '35vw',
        [theme.breakpoints.up('sm')]: {
            height: '21vw',
        },
    },
  
  }));

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

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

export default function ListarLivros() {

  const classes = useStyles();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const service = new LivrosService();

    service.getAll();
  };

  return (
    <>

        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Biblioteca" {...a11yProps(0)} />
          <Tab label="Desejados" {...a11yProps(1)} />
          <Tab label="Doação" {...a11yProps(2)} />
        </Tabs>

      <TabPanel value={value} index={0}>
            <Grid container spacing={2}>

                <Grid item xs={4} sm={2}>
                    <Paper elevation={0}>
                        <img className={classes.capaLivros} src="https://api.livros.guilhermejr.net/capas/1.jpg" alt="" />
                    </Paper>
                </Grid>        
                <Grid item xs={4} sm={2}>
                    <Paper elevation={0}>
                        <img className={classes.capaLivros} src="https://api.livros.guilhermejr.net/capas/2.jpg" alt="" />
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Paper elevation={0}>
                        <img className={classes.capaLivros} src="https://api.livros.guilhermejr.net/capas/3.jpg" alt="" />
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Paper elevation={0}>
                        <img className={classes.capaLivros} src="https://api.livros.guilhermejr.net/capas/4.jpg" alt="" />
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Paper elevation={0}>
                        <img className={classes.capaLivros} src="https://api.livros.guilhermejr.net/capas/5.jpg" alt="" />
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Paper elevation={0}>
                        <img className={classes.capaLivros} src="https://api.livros.guilhermejr.net/capas/6.jpg" alt="" />
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Paper elevation={0}>
                        <img className={classes.capaLivros} src="https://api.livros.guilhermejr.net/capas/7.jpg" alt="" />
                    </Paper>
                </Grid>
                <Grid item xs={4} sm={2}>
                    <Paper elevation={0}>
                        <img className={classes.capaLivros} src="https://api.livros.guilhermejr.net/capas/8.jpg" alt="" />
                    </Paper>
                </Grid>    

            </Grid>
      </TabPanel>
      
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>

      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>

    </>
  );
}
