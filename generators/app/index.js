'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wonderful ' + chalk.red('generator-angular-ajax') + ', created by Ajax Tech!'
    ));

    var prompts = [{
        type   : 'input',
        name   : 'project_name',
        message: 'What is you project name ? '
      },
      {
        type   : 'input',
        name   : 'repository_address',
        message: 'What is the git URL of your project?'
      },
      {
        type   : 'input',
        name   : 'name',
        message: 'What is your name?'
      },
      {
        type   : 'input',
        name   : 'email',
        message: 'What is your email?'
      }]


    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing () {
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
        project_name: this.props.project_name,
        email: this.props.email,
        name: this.props.name
      }
    );

    //readme.md
    this.fs.copyTpl(
      this.templatePath('_README.md'),
      this.destinationPath('README.md'), {
        project_name: this.props.project_name,
        repository_address: this.props.repository_address,
        folder_project: this.props.repository_address.split('/').slice(-1).pop()
      }
    );

    //gulpfile
    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.js')
    );

    //.bowerrc
    this.fs.copyTpl(
      this.templatePath('.bowerrc'),
      this.destinationPath('.bowerrc')
    );

    //.gitignore
    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore')
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

  }

  install () {
    this.installDependencies(); // run both npm install && bower install
    this.npmInstall(); //npm install
    this.bowerInstall() // bower install
  }
};
