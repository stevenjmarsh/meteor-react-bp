/* eslint-env jest */

// TODO - figure out why this mock implementation doesn't seem to be getting returned
const ValidatedMethod = jest
  .fn()
  .mockImplementation(() => ({
    call: jest.fn(),
  }));

module.exports = { ValidatedMethod };

