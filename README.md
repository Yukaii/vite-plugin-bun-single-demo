# vite-plugin-bun-single (POC)

> This is a **proof of concept** Vite plugin that enables bundling your web application into a single Bun executable, with minimal changes to your project.

## Features

- **Single Executable Output:** Uses Bun's `bun build --compile` to package your Vite-built app and a Bun server into one binary.
- **Minimal Integration:** Just add the plugin to your `vite.config.js` and a build script to your `package.json`.
- **No App Code Changes:** No need to modify your React/Vite app source code.

## Usage

1. **Install the plugin** (see local linking or npm instructions).
2. **Add to your `vite.config.js`:**
   ```js
   import bunSingle from 'vite-plugin-bun-single';
   // ...
   plugins: [
     bunSingle({ generateServer: true })
   ]
   ```
3. **Add a build script to `package.json`:**
   ```json
   "scripts": {
     "build": "bun run build:vite && bun run build:server"
   }
   ```
4. **Run `bun run build`**

This will generate a Bun server and assets, then compile them into a single executable (default: `out/www`).

## Status

This project is a **POC** and not production-ready. Use for experimentation and feedback only.
