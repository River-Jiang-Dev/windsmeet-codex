import fs from 'fs';
import path from 'path';

describe('routing', () => {
  it('does not persist the locale in a cookie', () => {
    const source = fs.readFileSync(path.join(process.cwd(), 'i18n/routing.ts'), 'utf8');
    expect(source).toMatch(/localeCookie:\s*false/);
    expect(source).toMatch(/localeDetection:\s*false/);
  });
});
