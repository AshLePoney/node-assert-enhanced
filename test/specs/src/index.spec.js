const path = require('path');
const main = require(path.resolve(__root, 'src/index.js'));

test('Should not be null', () => {
  expect(main).not.toBe(null);
});
