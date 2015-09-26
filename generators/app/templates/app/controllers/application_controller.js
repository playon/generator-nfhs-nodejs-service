var http = require('../services/utils').httpStatusCodes;
module.exports.status = function (req, res) {
  res.status(http.ok).json({ status: 'ok' });
};
