'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var KiwiGenerator = module.exports = function KiwiGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(KiwiGenerator, yeoman.generators.Base);

KiwiGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'projectName',
    message: 'What do you want to call your project ?'
  }];

  this.prompt(prompts, function (props) {
    // `props` is an object passed in containing the response values, named in
    // accordance with the `name` property from your prompt object. So, for us:
    this.projectName = props.projectName;

    cb();
  }.bind(this));
};

KiwiGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');
  this.mkdir('app/tools');
  this.mkdir('app/tools/system');
  this.mkdir('app/controllers');
  this.mkdir('app/models');
  this.mkdir('app/public');
  this.mkdir('app/public/css');
  this.mkdir('app/public/assets');
  this.mkdir('app/public/fonts');
  this.mkdir('app/public/scripts');
  this.mkdir('app/public/views');
  this.mkdir('app/public/views/home');

  this.template('_index.html', 'app/public/views/home/index.html');
  this.template('_gruntfile.js', 'gruntfile.js');
  this.template('_package.json', 'package.json');
  this.template('_config.json', 'config.json');
  this.template('_bower.json', 'bower.json');

  this.copy('homeController.js', 'app/controllers/homeController.js')
  this.copy('htmlMapRoute.js', 'app/tools/system/htmlMapRoute.js')
};

KiwiGenerator.prototype.runtime = function runtime() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('gitignore', '.gitignore');
}

KiwiGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
