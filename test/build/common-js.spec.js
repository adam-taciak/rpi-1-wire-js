import { readFileSync } from 'fs';

import { expect } from 'chai';

import { getSensorsSync } from '../../dist/index.js';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

describe('The Common JS module', function () {
  it('should get an empty list of sensors', function () {
    expect(getSensorsSync()).to.eql([]);
  });

  it('should be in the place specified in `main` in package.json', function () {
    expect(pkg.main).to.equal('./dist/index.js');
  });

  it('exports.require should be the right place', function () {
    expect(pkg.exports.require).to.equal('./dist/index.js');
  });
});
