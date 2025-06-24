import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// Bootstrap CSS + JS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './index.css';

const container = document.getElementById('root');
createRoot(container).render(<App />);
