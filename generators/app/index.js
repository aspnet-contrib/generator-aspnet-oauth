'use strict';
const Generator = require('yeoman-generator');
const yosay = require('yosay');

module.exports = class extends Generator {

  initializing() {
    this.templateData = {};
    this.log(yosay('Welcome to the classy ASP.NET OAuth Provider generator!'));
  }

  async prompting() {
    const prompts = [{
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

    const answers = await this.prompt(prompts);

    this.templateData.name = answers.name;
    this.templateData.authorname = answers.authorname;
    this.templateData.authorizationendpoint = answers.authorizationendpoint;
    this.templateData.tokenendpoint = answers.tokenendpoint;
    this.templateData.userinformationendpoint = answers.userinformationendpoint;

    this.name = answers.name;
    this.applicationName = 'AspNet.Security.OAuth.' + answers.name;
  }

  writing() {
    this.fs.copyTpl(this.templatePath('Project.csproj'), this.applicationName + '/' + this.applicationName + '.csproj', this.templateData)
    this.fs.copyTpl(this.templatePath('AuthenticationDefaults.cs'), this.applicationName + '/' + this.name + 'AuthenticationDefaults.cs', this.templateData)
    this.fs.copyTpl(this.templatePath('AuthenticationExtensions.cs'), this.applicationName + '/' + this.name + 'AuthenticationExtensions.cs', this.templateData)
    this.fs.copyTpl(this.templatePath('AuthenticationHandler.cs'), this.applicationName + '/' + this.name + 'AuthenticationHandler.cs', this.templateData)
    this.fs.copyTpl(this.templatePath('AuthenticationOptions.cs'), this.applicationName + '/' + this.name + 'AuthenticationOptions.cs', this.templateData)
  }
};
