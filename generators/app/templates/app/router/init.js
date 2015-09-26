module.exports = function (app) {

  //root
  var appController = require('../controllers/application_controller');
  app.get('/', appController.status);

};
