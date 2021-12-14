import { expect } from 'chai';

import { parseSensorsFile } from '../../src/parsers';

describe('Parsers', function () {
  describe('parseSensorsFile', function () {
    it('should parse sensors from a file', function () {
      const file = '28-012042123456\n28-3c01d0123456\n';
      const ids = parseSensorsFile(file);
      expect(ids).to.eql(['28-012042123456', '28-3c01d0123456']);
    });

    it('should work with an empty file', function () {
      const file = '';
      const ids = parseSensorsFile(file);
      expect(ids).to.eql([]);
    });
  });
});
