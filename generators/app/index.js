var generators = require('yeoman-generator');
module.exports = generators.Base.extend({

  prompting: function () {

    var done = this.async();
    this.prompt({
      type    : 'input',
      name    : 'projectName',
      message : 'Provide a name for this project',
      default : this.appname //curr folder name
    }, function (answers) {
      this.projectName = answers.projectName;
      done();
    }.bind(this));

  },

  writing: function () {

    //package.json
    var projectName = this.projectName;
    var pkg = {
      "name": projectName,
      "version": "0.1.0",
      "dependencies": {
        "airbrake": "^0.3.8",
        "aws-sdk": "^2.1.37",
        "bluebird": "^2.9.34",
        "body-parser": "^1.13.1",
        "bookshelf": "^0.8.1",
        "cors": "^2.7.1",
        "express": "^4.13.0",
        "knex": "^0.8.6",
        "mandrill-api": "^1.0.45",
        "moment": "^2.10.3",
        "mysql": "^2.7.0",
        "request": "^2.60.0",
        "stripe": "^3.6.0"
      },
      "devDependencies": {
        "jasmine-node": "^1.14.5",
        "jscs": "^1.13.1",
        "jshint": "^2.8.0"
      },
      "scripts": {
        "db:create": "node ./db/commands/create.js",
        "db:drop": "node ./db/commands/drop.js",
        "db:migrate": "node ./db/commands/migrations_run.js",
        "db:migrate:add": "node ./db/commands/migrations_add.js",
        "db:seed": "node ./db/commands/seed.js",
        "lint": "jshint ./app ./db ./scripts",
        "start": "node ./server.js",
        "style": "jscs ./app ./db ./scripts",
        "tests": "./node_modules/.bin/jasmine-node ./spec/*.js"
      },
      "appSettings": {
        "development": {
          "port":3000
        },
        "production": {
          "port":80
        },
        "stage":{
          "port":80
        }
      },
      "jshintConfig": {
        "node": true,
        "loopfunc": true
      },
      "jscsConfig": {
        "validateIndentation": 2
      }
    };
    this.write('package.json', JSON.stringify(pkg, null, 2));

    //gitignore
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
    );

    //nvmrc
    this.fs.copyTpl(
      this.templatePath('.nvmrc'),
      this.destinationPath('.nvmrc'),
      {}
    );

    //server.js
    this.fs.copyTpl(
      this.templatePath('server.js'),
      this.destinationPath('server.js'),
      { projectName:this.projectName }
    );

    //readme.md
    this.fs.copyTpl(
      this.templatePath('readme.md'),
      this.destinationPath('readme.md'),
      { projectName:this.projectName }
    );

    //deploy dir
    this.fs.copy(
      this.templatePath('deploy/**/*'),
      this.destinationPath('deploy')
    );

    //db dir files
    var dbname = this.projectName.toLowerCase().split(' ').join('_');
    this.fs.copyTpl(
      this.templatePath('db/**/*'),
      this.destinationPath('db'),
      { dbname:dbname }
    );
    //db dir dotfiles
    this.fs.copy(
      this.templatePath('db/**/.*'),
      this.destinationPath('db')
    );

    //scripts dir files
    this.fs.copy(
      this.templatePath('scripts/**/*'),
      this.destinationPath('scripts')
    );

    //app dir files
    this.fs.copy(
      this.templatePath('app/**/*'),
      this.destinationPath('app')
    );
    //app dir dotfiles
    this.fs.copy(
      this.templatePath('app/**/.*'),
      this.destinationPath('app')
    );

  },

  install: function () {

    this.npmInstall();

  },

  end: function () {

    this.log('');
    this.log('Setup Complete!');
    this.log('');
    this.log('To run the app, first create the database with the following commands:');
    this.log('');
    this.log('$ npm run db:create');
    this.log('$ npm run db:migrate');
    this.log('$ npm run db:seed');
    this.log('');
    this.log('Finally, run the following command to start the service:');
    this.log('');
    this.log('$ npm start');
    this.log('');

  }

});
