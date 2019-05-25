'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;

describe('aspnet-oauth:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        name: 'Foo',
        authorname: 'John Smith',
        authorizationendpoint: 'https://foo.local/auth',
        tokenendpoint: 'https://foo.local/token',
        userinformationendpoint: 'https://foo.local/user'
      })
      .on('end', done);
  });

  it('creates the provider code files', function () {
    assert.file([
      'AspNet.Security.OAuth.Foo/FooAuthenticationDefaults.cs',
      'AspNet.Security.OAuth.Foo/FooAuthenticationExtensions.cs',
      'AspNet.Security.OAuth.Foo/FooAuthenticationHandler.cs',
      'AspNet.Security.OAuth.Foo/FooAuthenticationOptions.cs'
    ]);
  });
});
