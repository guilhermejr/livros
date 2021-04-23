import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  
  mensagem: {
    marginTop: '100px',
    fontSize: '30px',
    textAlign: 'center',
  },

}));

export default function LivroVazio({mensagem}) {

  const classes = useStyles();

  return(
    <Grid container justify="center">
      <Paper elevation={0}>
          <div className={classes.mensagem}>{mensagem}</div>
      </Paper>
    </Grid> 
  )
}