/*
 * Licensed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * See https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers
 * for more information concerning the license and the contributors participating to this project.
 */

using System.Security.Claims;

namespace AspNet.Security.OAuth.<%= name %>;

/// <summary>
/// Defines a set of options used by <see cref="<%= name %>AuthenticationHandler"/>.
/// </summary>
public class <%= name %>AuthenticationOptions : OAuthOptions
{
    /// <summary>
    /// Initializes a new instance of the <see cref="<%= name %>AuthenticationOptions"/> class.
    /// </summary>
    public <%= name %>AuthenticationOptions()
    {
        ClaimsIssuer = <%= name %>AuthenticationDefaults.Issuer;
        CallbackPath = <%= name %>AuthenticationDefaults.CallbackPath;

        AuthorizationEndpoint = <%= name %>AuthenticationDefaults.AuthorizationEndpoint;
        TokenEndpoint = <%= name %>AuthenticationDefaults.TokenEndpoint;
        UserInformationEndpoint = <%= name %>AuthenticationDefaults.UserInformationEndpoint;

        // TODO Add any required scopes
        // Scope.Add("?");

        // TODO Map any claims
        // ClaimActions.MapJsonKey(ClaimTypes.Email, "?");
    }
}
