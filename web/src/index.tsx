import React from 'react';
// Fala pro react que precisamos de uma interface web atravez do DOM.
import ReactDOM from 'react-dom';
import App from './App';

// Renderizar = Mostrar em tela
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

