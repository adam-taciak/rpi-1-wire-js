import { readFileSync } from 'fs';

import { expect } from 'chai';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

describe('Type definitions', function () {
  it('should exist', function () {
    const file = readFileSync('./dist/index.d.ts', 'utf8');
    expect(file).to.match(/isConnected/);
  });

  it('should be in the place specified in package.json', function () {
    expect(pkg.types).to.equal('./dist/index.d.ts');
  });
});
