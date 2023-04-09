import React from 'react';
import { createRoot } from 'react-dom/client';
import Application from '@renderer/App';

// Say something
console.log('[ERWT] : Renderer execution started');

// Application to Render
const app = (
  <React.Fragment>
    <Application />
  </React.Fragment>
);

// Render application in DOM
createRoot(document.getElementById('app')).render(app);
