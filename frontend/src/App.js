import './App.css';
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';

function App() {

  //urls del backend 
  const url = "http://localhost:8080/api/usuarios/crear"
  const url2 = "http://localhost:8080/api/usuarios/"

  var emoji = require('node-emoji')
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [modalCiudad, setmodalCiudad] = useState(false);
  const [modalRegistro, setmodalRegistro] = useState(false);

  const [usuarios, setUsuarios] = useState([]);

//Login  
  const accesoLogin = () =>{

    Axios.post(url2, {nombre: usuario, contrasena: contrasena})
    .then(response =>{

      abrirCerrarModalCiudad();
    }).catch(err =>{
      alert('ERROR AL REGISTRARSE')
    })
  }

//Funcion que procesa la creación de cuenta
  const accesoRegistrarse = () =>{

    Axios.post(url, {nombre: usuario, contrasena: contrasena})
    .then(response =>{

      abrirCerrarModalRegistrarse();

    }).catch(err =>{
      alert('ERROR AL REGISTRARSE')
    })
  }

  //Desplegar Usuarios
  const desplegarUsuarios = () => {
    Axios.get(url2)
    .then (response =>{
      console.log(response.data);
      setUsuarios(response.data);
      console.log('usuarios: ' , usuarios)
    }).catch(err =>{
      alert('Error al desplegar')
    })
  }

  const abrirCerrarModalCiudad = () => {
    setmodalCiudad(!modalCiudad);
  }

  const abrirCerrarModalRegistrarse = () => {
    setmodalRegistro(!modalRegistro);
  }

  const bodyModalCiudad=(
    <div className="Modal">
      <Card sx={{ maxWidth: 700}} className="carta_model">
        <CardContent>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Modal para prueba
          </Typography>

          <Typography variant="h5" component="div">
            Al presionar el siguiente botón se desplegará la lista de Usuarios.
          </Typography>

        </CardContent>
        <CardActions style={{justifyContent: 'center'}}>
          <Button variant="contained" onClick={desplegarUsuarios} color="success">Desplegar Usuarios</Button>
          <Button variant="contained" onClick={abrirCerrarModalCiudad} color="error">Cerrar</Button>
        </CardActions>
        <CardContent>
          <Typography>
            {usuarios.map((val)=> {
              return <p>Usuarios: {val.nombre} </p>
            })}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )

  const bodyModalRegistro=(
    <div className="Modal">
      <Card sx={{ maxWidth: 700}} className="carta_model">
        <CardContent>

          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Crear Cuenta
          </Typography>

          <div className="form">
            <TextField label=" Elegir Usuario" variant="outlined" name="usuario" onChange={(e) => {
              setUsuario(e.target.value)
            }}/>
          </div>

          <div className="form">
            <TextField label="Elegir Contraseña" variant="outlined" name="password" type="password" onChange={(e) => {
              setContrasena(e.target.value)
            }}/>
          </div>

        </CardContent>
        <CardActions style={{justifyContent: 'center'}}>
        <Button variant="contained" onClick={accesoRegistrarse}>Crear Cuenta</Button>
        <Button variant="contained" onClick={abrirCerrarModalRegistrarse} color="error">Cerrar</Button>
        </CardActions>
      </Card>
    </div>
  )

  return (
    <div className="App">
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Test 
            </Typography>
          </Toolbar>
        </AppBar>
      </div>

      <div>
        <Card>   
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              coded with {emoji.get('❤️')} by @fitocuevas
          </Typography>
        </Card>
      </div>

      <div className="form">
        <TextField label="Usuario" variant="outlined" name="usuario" onChange={(e) => {
          setUsuario(e.target.value)
        }}/>
      </div>

      <div className="form">
        <TextField label="Contraseña" variant="outlined" name="password" type="password" onChange={(e) => {
          setContrasena(e.target.value)
        }}/>
      </div>
      
      <div className="Boton">
        <Button variant="contained" onClick={accesoLogin}> Acceder</Button>
      </div>
      
      <div className="Boton">
        <Button variant="contained" onClick={abrirCerrarModalRegistrarse} color="success"> Registrarse</Button>
      </div>

      <div>
        <Typography variant="h1" component="div" gutterBottom>
        {emoji.get('')}
        </Typography>
      </div>

      <Modal
        open={modalCiudad}
        onClose={abrirCerrarModalCiudad}>
          {bodyModalCiudad}
      </Modal>

      <Modal
        open={modalRegistro}
        onClose={abrirCerrarModalRegistrarse}>
          {bodyModalRegistro}
      </Modal>
    </div>
  );
}

export default App;
