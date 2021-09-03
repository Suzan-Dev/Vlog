exports.sendResponse = (status, message, data) => ({
  status,
  message,
  data,
});

exports.sendResponseForAuth = (status, message, data, token) => ({
  status,
  message,
  token,
  data,
});
