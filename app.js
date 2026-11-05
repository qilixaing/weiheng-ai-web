import { initAmbientBackground } from './ambient-background.js';

// Preserve the existing independent canvas. Vue mounts only inside #app.
initAmbientBackground();

if (import.meta.env?.DEV) {
  import('./src/main.js');
} else {
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = '/content-dist/vitabalance.css';
  document.head.append(stylesheet);
  import('./content-dist/vitabalance.js');
}
