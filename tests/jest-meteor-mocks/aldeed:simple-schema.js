/* eslint-env jest */

const SimpleSchema = jest
  .fn()
  .mockImplementation(() => ({
    pick: jest.fn(() => SimpleSchema),
    validator: jest.fn(() => jest.fn()),
  }));

SimpleSchema.validator = jest.fn();

SimpleSchema.RegEx = {
  Id: /^[23456789ABCDEFGHJKLMNPQRSTWXYZabcdefghijkmnopqrstuvwxyz]{17}$/,
};

module.exports = { SimpleSchema };
