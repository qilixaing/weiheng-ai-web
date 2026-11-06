import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { copyFile, cp, readdir, writeFile } from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {buildBrowserCatalogue} from './scripts/build-browser-catalogue.mjs';
import {compressBrowserAssets} from './scripts/compress-browser-assets.mjs';

// Build only the Vue content layer. The existing page/canvas/CSS stay in place.
export default defineConfig(({ command }) => ({
  // Frontend builds never need the private backend API credential file.
  envDir: false,
  resolve:{alias:[
    {find:/^.*\/data\/catalogue\.js$/,replacement:fileURLToPath(new URL('./src/data/catalogue.browser.js',import.meta.url))},
    {find:/^.*\/data\/foodEstimates\.js$/,replacement:fileURLToPath(new URL('./src/data/aiFoodEstimates.browser.js',import.meta.url))}
  ]},
  plugins: [vue(), {
    name: 'local-pdf-worker',
    apply: 'build',
    async buildStart(){await buildBrowserCatalogue();},
    async closeBundle() {
      await buildBrowserCatalogue();
      const chunks=await readdir(new URL('./content-dist/chunks/',import.meta.url));
      const preload=chunks.filter(name=>/^(App-|IntakeAnalysis-|main-|vue-runtime-|useThemeTransition-).*\.js$/.test(name)).map(name=>'/content-dist/chunks/'+name);
      await writeFile(new URL('./content-dist/app-preload.json',import.meta.url),JSON.stringify(preload));
      await copyFile(new URL('./node_modules/pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url), new URL('./content-dist/pdf.worker.min.js', import.meta.url));
      for (const name of ['cmaps', 'standard_fonts']) await cp(new URL(`./node_modules/pdfjs-dist/${name}/`, import.meta.url), new URL(`./content-dist/pdf-resources/${name}/`, import.meta.url), { recursive: true });
      await compressBrowserAssets(new URL('./content-dist/',import.meta.url));
    },
  }],
  server: { proxy: { '/api': { target: process.env.VITABALANCE_API_TARGET || 'http://127.0.0.1:4173', changeOrigin: true } } },
  define: { 'process.env.NODE_ENV': JSON.stringify(command === 'build' ? 'production' : 'development') },
  build: {
    outDir: 'content-dist',
    emptyOutDir: true,
    lib: { entry: 'src/main.js', formats: ['es'], fileName: 'vitabalance', cssFileName: 'vitabalance' },
    rollupOptions: { output: { chunkFileNames: 'chunks/[name]-[hash].js', manualChunks(id) { if (id.includes('/node_modules/@vue/') || id.includes('/node_modules/vue/')) return 'vue-runtime'; } } }
  }
}));
