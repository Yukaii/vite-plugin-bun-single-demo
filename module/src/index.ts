// Export plugin and its types
export { bunSingle } from './plugin';
export type { BunSingleOptions } from './plugin';

// Export build-server utility
export { buildServer } from './build-server';
export type { BuildServerConfig } from './build-server';

// Default export for easier imports
import { bunSingle } from './plugin';
export default bunSingle;
