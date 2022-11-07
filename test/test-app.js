'use strict';

const assert = require('yeoman-assert');
const glob = require('glob');
const helpers = require('yeoman-test');
const os = require('os');
const path = require('path');
const { rmSync } = require('fs');
const { spawnSync } = require('child_process');

describe('aspnet-oauth:app', () => {
  before(async function () {
    this.timeout(10000);
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
  it('sets the package baseline version', () => {
    assert.fileContent(
      'AspNet.Security.OAuth.Foo/AspNet.Security.OAuth.Foo.csproj',
      /<PackageValidationBaselineVersion>[0-9]+\.[0-9]+\.[0-9]+<\/PackageValidationBaselineVersion>/
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

  describe('generating a new provider', () => {

    const projectName = 'AspNet.Security.OAuth.Foo';
    const tempDir = path.join(os.tmpdir(), `_generator-aspnet-oauth-${Math.random()}`);
    const artifactsDir = path.join(tempDir, 'artifacts');
    const sourceDir = path.join(tempDir, 'src');
    const projectDir = path.join(sourceDir, projectName);
    const configuration = 'Release';

    before(async function () {
      this.timeout(120000);

      // Clone the providers repository to add the project to
      const clone = spawnSync(
        'git',
        ['clone', 'https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers.git', tempDir]);

      if (clone.status !== 0 && clone.output) {
        console.error(clone.output.toString('utf8'));
      }
      assert.equal(clone.status, 0);

      // Run the generator to create the project
      context = await helpers.run(path.join(__dirname, '../generators/app'), { tmpdir: false })
        .cd(sourceDir)
        .withOptions({ skipInstall: true })
        .withPrompts({
          name: 'Foo',
          authorname: 'John Smith',
          authorizationendpoint: 'https://foo.local/auth',
          tokenendpoint: 'https://foo.local/token',
          userinformationendpoint: 'https://foo.local/user'
        });

      // Add the new project to the solution
      const dotnetSlnAdd = spawnSync(
        `dotnet`,
        ['sln', 'add', path.join(projectDir, `${projectName}.csproj`)],
        { cwd: tempDir });

      if (dotnetSlnAdd.status !== 0) {
        console.error(dotnetSlnAdd.output.toString('utf8'));
      }
      assert.equal(dotnetSlnAdd.status, 0);

      // Build the solution, run the tests and generate the NuGet packages
      let build;

      if (process.platform === 'win32') {
        build = spawnSync('build.cmd', ['-test', '-pack', '-configuration', configuration], { cwd: tempDir });
      } else {
        build = spawnSync('./build.sh', ['--test', '--pack', '--configuration', configuration], { cwd: tempDir });
      }

      if (build.status !== 0 && build.output) {
        console.error(build.output.toString('utf8'));
      }
      assert.equal(build.status, 0);
    });

    it('compiles the provider', (done) => {
      const expected = path.join(artifactsDir, 'bin', projectName, configuration, 'net*', `${projectName}.dll`);
      glob(expected, () => {
        done();
      });
    });
    it('generates the NuGet package', (done) => {
      const expected = path.join(artifactsDir, 'packages', configuration, 'Shipping', `${projectName}.*.nupkg`);
      glob(expected, () => {
        done();
      });
    });
    it('runs the tests', (done) => {
      const expected = path.join(artifactsDir, 'TestResults', configuration, 'AspNet.Security.OAuth.Providers.Tests_net*_x64.html');
      glob(expected, () => {
        done();
      });
    });
  });
});
