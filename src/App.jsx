import React, {useState} from 'react';

import MiApi from './components/MiApi';
import BuscarFeriado from './components/Buscador';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {
  const [buscarPor, setBuscarPor] = useState("");
  return (
    <div className='container d-flex flex-column'>
      <div className='Header'>
        <h1 className='text-center mt-2 text-bg-light p-3 '>Feriados de Chile Año 2023</h1>
      </div>
      <BuscarFeriado search = {setBuscarPor}/>
      <MiApi buscarPor = {buscarPor}/>
    </div>
  );
}

export default App;