'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wonderful ' + chalk.red('generator-angular-ajax') + ', created by Ajax Tech!'
    ));

    var prompts = [{
      type   : 'input',
      name   : 'project_name',
      message: 'What is you project name ? '
    };


    return this.prompt(prompts).then(props => {
      this.props = props;
    }.bind(this));
  }

  writing: function () {
    //package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'), {
        project_name: this.props.project_name
      }
    );

    //bower.json
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'), {
        project_name: this.props.project_name
      }
    );

    //gulpfile
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    //loadJS
    this.fs.copyTpl(
      this.templatePath('loadJs.js'),
      this.destinationPath('loadJs.js')
    );

    //copySrc
    this.fs.copyTpl(
      this.templatePath('src'),
      this.destinationPath('src')
    );

  },

  install: function () {
    this.installDependencies(); // run both npm install && bower install
    this.npmInstall(); //npm install
    this.bowerInstall() // bower install
  }
};
