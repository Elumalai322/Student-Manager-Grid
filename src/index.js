import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Grid from './grid'; // RIGHT – no dot at the end


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Grid />
  </React.StrictMode>
);
