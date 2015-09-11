'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  init: function() {
    this.templatedata = {};
    
    this.log(yosay('Welcome to the classy ' + chalk.yellow('ASP.NET OAuth Provider') + ' generator!'));    
  },
  
  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      message: 'What is the name of the provider you want to create?',
      store: true
    },   
    {
      type: 'input',
      name: 'authorname',
      message: 'What is your name?',
      store: true
    },
    {
      type: 'input',
      name: 'authorizationendpoint',
      message: 'What is the Authorization Endpoint for this service?',
      store: true
    },
    {
      type: 'input',
      name: 'tokenendpoint',
      message: 'What is the Token Endpoint for this service?',
      store: true
    },
    {
      type: 'input',
      name: 'userinformationendpoint',
      message: 'What is the User Information Endpoint for this service?',
      store: true
    }];

    this.prompt(prompts, function (props) {
      this.templatedata.name = props.name;
      this.templatedata.authorname = props.authorname;
      this.templatedata.authorizationendpoint = props.authorizationendpoint;
      this.templatedata.tokenendpoint = props.tokenendpoint;
      this.templatedata.userinformationendpoint = props.userinformationendpoint;
      
      this.name = props.name;
      this.applicationname = 'AspNet.Security.OAuth.' + props.name
      
      done();
    }.bind(this));
  },

  writing: function() {
    this.fs.copyTpl(this.templatePath('project.json'), this.applicationname + '/project.json', this.templatedata)
    this.fs.copyTpl(this.templatePath('Project.xproj'), this.applicationname + '/' + this.applicationname + '.xproj', this.templatedata)
    this.fs.copyTpl(this.templatePath('AuthenticationDefaults.cs'), this.applicationname + '/' + this.name + 'AuthenticationDefaults.cs', this.templatedata)
    this.fs.copyTpl(this.templatePath('AuthenticationExtensions.cs'), this.applicationname + '/' + this.name + 'AuthenticationExtensions.cs', this.templatedata)
    this.fs.copyTpl(this.templatePath('AuthenticationHandler.cs'), this.applicationname + '/' + this.name + 'AuthenticationHandler.cs', this.templatedata)
    this.fs.copyTpl(this.templatePath('AuthenticationHelper.cs'), this.applicationname + '/' + this.name + 'AuthenticationHelper.cs', this.templatedata)
    this.fs.copyTpl(this.templatePath('AuthenticationMiddleware.cs'), this.applicationname + '/' + this.name + 'AuthenticationMiddleware.cs', this.templatedata)
    this.fs.copyTpl(this.templatePath('AuthenticationOptions.cs'), this.applicationname + '/' + this.name + 'AuthenticationOptions.cs', this.templatedata)
  },

  install: function () {
    //this.installDependencies();
  }
});
