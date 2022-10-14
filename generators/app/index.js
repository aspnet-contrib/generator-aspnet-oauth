'use strict';
const fetch = require('cross-fetch');
const Generator = require('yeoman-generator');
const queryString = require('query-string');
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

    this.templateData.currentVersion = await this.getCurrentVersion();

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

  async getCurrentVersion() {

    let response = await fetch('https://api.nuget.org/v3/index.json');

    if (!response.ok) {
      throw new Error(`Failed to query NuGet service index. HTTP status code: ${response.status}.`);
    }

    const serviceIndex = await response.json();
    const baseAddress = serviceIndex.resources.find(resource => resource['@type'] === 'SearchQueryService/3.5.0')['@id'];

    if (!baseAddress) {
      throw new Error('Failed to determine the base address for the NuGet search query service.');
    }

    const query = queryString.stringify({
      prerelease: false,
      q: 'PackageId:AspNet.Security.OAuth.GitHub',
      semVerLevel: '2.0.0',
      take: 1
    });

    const searchUrl = `${baseAddress}?${query}`;
    response = await fetch(searchUrl);

    if (!response.ok) {
      throw new Error(`Failed to search for NuGet package from '${searchUrl}'. HTTP status code: ${response.status}.`);
    }

    const searchResult = await response.json();

    let latestVersion = null;

    if (searchResult.data && searchResult.data.length > 0) {
      latestVersion = searchResult.data[0].version;
    }

    if (!latestVersion) {
      throw new Error('Failed to determine the latest version of the OAuth providers.');
    }

    const dot = '.';
    const versionParts = latestVersion.split(dot);

    // Increment the build number by one for the release that
    // would be the first one including this new provider.
    versionParts[2] = parseInt(versionParts[2], 10) + 1;

    return versionParts.join(dot);
  }
};
