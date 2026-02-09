import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

if (container) {
  try {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("React-Anwendung erfolgreich initialisiert.");
  } catch (err) {
    console.error("Kritischer Fehler beim Rendern der App:", err);
  }
} else {
  console.error("Kritischer Fehler: Das Element mit der ID 'root' wurde nicht gefunden.");
}