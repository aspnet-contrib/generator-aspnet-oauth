'use strict';

const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('aspnet-oauth:app', () => {
  before(async () => {
    return await helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({ skipInstall: true })
      .withPrompts({
        name: 'Foo',
        authorname: 'John Smith',
        authorizationendpoint: 'https://foo.local/auth',
        tokenendpoint: 'https://foo.local/token',
        userinformationendpoint: 'https://foo.local/user'
      });
  });

  it('creates the provider code files', () => {
    assert.file([
      'AspNet.Security.OAuth.Foo/AspNet.Security.OAuth.Foo.csproj',
      'AspNet.Security.OAuth.Foo/FooAuthenticationDefaults.cs',
      'AspNet.Security.OAuth.Foo/FooAuthenticationExtensions.cs',
      'AspNet.Security.OAuth.Foo/FooAuthenticationHandler.cs',
      'AspNet.Security.OAuth.Foo/FooAuthenticationOptions.cs'
    ]);
  });
  it('sets the authors name', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/AspNet.Security.OAuth.Foo.csproj',
      /<Authors>John Smith<\/Authors>/
    );
  });
  it('sets the description', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/AspNet.Security.OAuth.Foo.csproj',
      /<Description>ASP\.NET Core security provider enabling Foo authentication\.<\/Description>/
    );
  });
  it('sets the packages tags', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/AspNet.Security.OAuth.Foo.csproj',
      /<PackageTags>foo;aspnetcore;authentication;oauth;security<\/PackageTags>/
    );
  });
  it('sets the defaults class name', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationDefaults.cs',
      /public static class FooAuthenticationDefaults/
    );
  });
  it('sets the authentication scheme', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationDefaults.cs',
      /AuthenticationScheme = \"Foo\";/
    );
  });
  it('sets the display name', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationDefaults.cs',
      /DisplayName = \"Foo\";/
    );
  });
  it('sets the issuer', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationDefaults.cs',
      /Issuer = \"Foo\";/
    );
  });
  it('sets the callback path', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationDefaults.cs',
      /CallbackPath = \"\/signin-foo\";/
    );
  });
  it('sets the authorization endpoint', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationDefaults.cs',
      /AuthorizationEndpoint = \"https:\/\/foo.local\/auth\";/
    );
  });
  it('sets the token endpoint', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationDefaults.cs',
      /TokenEndpoint = \"https:\/\/foo.local\/token\";/
    );
  });
  it('sets the user information endpoint', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationDefaults.cs',
      /UserInformationEndpoint = \"https:\/\/foo.local\/user\";/
    );
  });
  it('sets the extensions class name', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationExtensions.cs',
      /public static class FooAuthenticationExtensions/
    );
  });
  it('sets the extensions method names', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationExtensions.cs',
      /public static AuthenticationBuilder AddFoo\(/
    );
  });
  it('sets the handler class name', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationHandler.cs',
      /public partial class FooAuthenticationHandler : OAuthHandler<FooAuthenticationOptions>/
    );
  });
  it('sets the handler constructor name', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationHandler.cs',
      /public FooAuthenticationHandler\(/
    );
  });
  it('sets the options class name', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationOptions.cs',
      /public class FooAuthenticationOptions : OAuthOptions/
    );
  });
  it('sets the options constructor name', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/FooAuthenticationOptions.cs',
      /public FooAuthenticationOptions\(\)/
    );
  });
});
