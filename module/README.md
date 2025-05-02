# vite-plugin-bun-single

A Vite plugin for bundling web applications into a single Bun executable.

## Installation

```bash
npm install vite-plugin-bun-single --save-dev
# or
bun add -d vite-plugin-bun-single
```

## Usage

### Configure Vite Plugin

In your `vite.config.js` or `vite.config.ts`:

```js
import { defineConfig } from 'vite';
import bunSingle from 'vite-plugin-bun-single';

export default defineConfig({
  plugins: [
    bunSingle({
      distDir: 'dist',          // Default: 'dist'
      outDir: 'out',            // Default: 'out'
      assetsFile: 'assets.ts',  // Default: 'assets.generated.ts'
      generateServer: true,     // Default: false
      serverFile: 'server.ts',  // Default: 'server.ts'
    }),
  ],
});
```

### Build Workflow

1. First, build your Vite application
   ```bash
   npm run build
   ```

2. Then, build the server executable:
   ```bash
   npx vite-plugin-bun-single build-server
   # or with custom options
   npx vite-plugin-bun-single build-server --outDir custom-out --serverFileName api.ts --executableName app
   ```

### Programmatic Usage

```js
import { bunSingle, buildServer } from 'vite-plugin-bun-single';

// For the Vite plugin
export default {
  plugins: [bunSingle({ /* options */ })]
};

// For building the server programmatically
await buildServer({
  outDir: 'custom-out',
  serverFileName: 'custom-server.ts',
  executableName: 'app' 
});
```

## Options

### Plugin Options (BunSingleOptions)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| distDir | string | 'dist' | The directory where Vite builds the app |
| outDir | string | 'out' | The directory where asset and server files will be generated |
| assetsFile | string | 'assets.generated.ts' | Name of the generated assets file |
| generateServer | boolean | false | Whether to generate a server file |
| serverFile | string | 'server.ts' | Name of the generated server file |

### Server Build Options (BuildServerConfig)

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| outDir | string | 'out' | Directory containing server file and where executable will be created |
| serverFileName | string | 'server.ts' | Name of the server TypeScript file |
| executableName | string | 'site' | Name of the output executable |

## License

MIT
