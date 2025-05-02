#!/usr/bin/env bun
import { spawn } from 'bun';
import { resolve, join } from 'path';

/**
 * Configuration options for building the server executable
 */
export interface BuildServerConfig {
  /**
   * Directory containing the server.ts file and where the executable will be created
   * @default 'out'
   */
  outDir?: string;
  
  /**
   * Name of the server TypeScript file to compile
   * @default 'server.ts'
   */
  serverFileName?: string;
  
  /**
   * Name of the output executable file
   * @default 'site'
   */
  executableName?: string;
}

/**
 * Build a Bun executable from a TypeScript server file
 * @param config Configuration options
 * @returns Promise with the build result
 */
export async function buildServer(config: BuildServerConfig = {}) {
  const outDir = config.outDir || 'out';
  const serverFileName = config.serverFileName || 'server.ts';
  const executableName = config.executableName || 'site';

  const serverInputPath = resolve(join(outDir, serverFileName));
  const serverOutputPath = resolve(join(outDir, executableName));

  console.log(`Building server executable from ${serverInputPath} to ${serverOutputPath}...`);

  const buildProcess = spawn(
    ['bun', 'build', serverInputPath, '--compile', '--outfile', serverOutputPath],
    {
      stdio: ["inherit", "inherit", "inherit"],
      cwd: process.cwd(),
    }
  );

  const status = await buildProcess.exited;

  if (status === 0) {
    console.log(`Bun build successful. Executable created at ${serverOutputPath}`);
    return { success: true, outputPath: serverOutputPath };
  } else {
    console.error(`Bun build failed with exit code ${status}.`);
    return { success: false, exitCode: status };
  }
}

// CLI support for direct invocation
if (import.meta.main) {
  // Process CLI arguments for configuration
  const args = process.argv.slice(2);
  let outDir = 'out';
  let serverFileName = 'server.ts';
  let executableName = 'site';

  // Very simple argument parsing
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--outDir' && i + 1 < args.length) {
      outDir = args[i + 1];
      i++;
    } else if (args[i] === '--serverFileName' && i + 1 < args.length) {
      serverFileName = args[i + 1];
      i++;
    } else if (args[i] === '--executableName' && i + 1 < args.length) {
      executableName = args[i + 1];
      i++;
    }
  }

  const result = await buildServer({ outDir, serverFileName, executableName });
  if (!result.success) {
    process.exit(result.exitCode);
  }
}
