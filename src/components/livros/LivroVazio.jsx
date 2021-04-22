import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

export default function LivroVazio({mensagem, classes}) {
  return(
    <Grid container justify="center">
      <Paper elevation={0}>
          <div className={classes.mensagem}>{mensagem}</div>
      </Paper>
    </Grid> 
  )
}