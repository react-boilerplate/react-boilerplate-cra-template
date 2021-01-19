import fs from 'fs';

export function pathExists(path: string) {
  return fs.existsSync(path);
}
