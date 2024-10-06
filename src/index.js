// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the application
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
