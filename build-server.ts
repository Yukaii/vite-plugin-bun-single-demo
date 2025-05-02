// build-server.ts
// Using Bun.spawn for reliable --compile --outfile behavior
import { spawn } from 'bun'; // Use Bun's spawn
import { resolve } from 'path';

const serverInputPath = resolve('out/server.ts');
const serverOutputPath = resolve('out/site'); // Output executable named 'site' in the 'out' folder

console.log(`Building server executable from ${serverInputPath} to ${serverOutputPath}...`);

const buildProcess = spawn(
    ['bun', 'build', serverInputPath, '--compile', '--outfile', serverOutputPath],
    {
        stdio: ["inherit", "inherit", "inherit"], // Pipe stdin, stdout, stderr
        cwd: 'out',
    }
);

const status = await buildProcess.exited;

if (status === 0) {
    console.log(`Bun build successful. Executable created at ${serverOutputPath}`);
} else {
    console.error(`Bun build failed with exit code ${status}.`);
    process.exit(status);
}
