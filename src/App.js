import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import BookIcon from '@material-ui/icons/Book';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ListarLivros from './components/Livros/index'
import PaginaNaoEncontrada from './components/PaginaNaoEncontrada/index';
import UsuariosService from './services/UsuariosService';
import { login, logout, isAutenticado } from './services/auth';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu';
import Alert from '@material-ui/lab/Alert';

const usuarioService = new UsuariosService();

const useStyles = makeStyles((theme) => ({

  root: {
    paddingTop: 70,
    paddingBottom:50,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 70,
      paddingBottom:50,
    },
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  search: {
    flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },

}));

function App({ history }) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [textoPesquisar, setTextoPesquisar] = useState('');
  const [pesquisa, setPesquisa] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLogin, setErroLogin] = useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const abrir = Boolean(anchorEl);

  const handleLogin = async () => {

    if (!email || !senha) {

      console.log('Campos em branco');
      setErroLogin('Inválida combinação de E-mail e Senha.');

    } else {

      try {

        const response = await usuarioService.login(email, senha);
        console.log('LOGOU');
        console.log(response.data.access_token);
        login(response.data.access_token);
        handleClose();

      } catch (error) {
        setErroLogin('Inválida combinação de E-mail e Senha.');
      }
    }

  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErroLogin('');
    setEmail('');
    setSenha('');
    setOpen(false);
  };

  const buscar = (e) => {
    e.preventDefault();
    setPesquisa(textoPesquisar);
    setTextoPesquisar('');
  }

  const inicio = () => {
    window.location.href='/';
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFecharMenu = () => {
    setAnchorEl(null);
  }

  const handleSair = () => {
    if(window.confirm('Deseja realmente sair do sistema?')) {
      logout();
      setAnchorEl(null);
    }
  }

  const handleTrocarSenha = () => {
    alert('Ainda não implementado.');
    setAnchorEl(null);
  }

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" color="inherit">
            <BookIcon onClick={inicio} />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap>
            Livros
          </Typography>

            <div className={classes.search}>
              <form className={classes.form} onSubmit={buscar}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  autoFocus
                  onChange={(e) => {setTextoPesquisar(e.target.value)}}
                  value={textoPesquisar}
                  fullWidth={true}
                  placeholder="Busque por título, autor, editora, ISBN..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </form>
            </div>
          {isAutenticado() ? (
            <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={abrir}
              onClose={handleFecharMenu}
            >
              <MenuItem onClick={handleTrocarSenha}>Trocar Senha</MenuItem>
              <MenuItem onClick={handleSair}>Sair</MenuItem>
            </Menu>
          </div>
          ) : (
            <Button color="inherit" onClick={handleClickOpen}>Login</Button>
          )}
          

        </Toolbar>
      </AppBar>

      <Container>
        <Router>
          <Switch>
            <Route exact path='/'>
              <ListarLivros pesquisa={pesquisa} setPesquisa={setPesquisa} setTextoPesquisar={setTextoPesquisar} />
            </Route>
            <Route>
              <PaginaNaoEncontrada />
            </Route>
          </Switch>
        </Router>
        
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Login</DialogTitle>
        <DialogContent>
          <DialogContentText align="center">
            Informe e-mail e senha 
            {erroLogin && (
              <>
              <br /><br />
              <Alert variant="filled" severity="error">
                {erroLogin}
              </Alert>
              <br />
              </>
            )}
          </DialogContentText>
          <TextField
            autoFocus
            onChange={(e) => {setEmail(e.target.value)}}
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
          />
          <TextField
            onChange={(e) => {setSenha(e.target.value)}}
            margin="dense"
            id="senha"
            label="Senha"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
          <Button onClick={handleLogin} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  );
}

export default App;
