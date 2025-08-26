const { auth: pgauth } = require('./postgres');
const express = require('./express');

exports.load = async (app) => {
  await pgauth();
  express(app);
};
