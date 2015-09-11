/*
 * Licensed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * See https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers
 * for more information concerning the license and the contributors participating to this project.
 */

using Microsoft.AspNet.Authentication.OAuth;
using Microsoft.AspNet.Http;

namespace AspNet.Security.OAuth.<%= name %> {
    /// <summary>
    /// Defines a set of options used by <see cref="<%= name %>AuthenticationHandler"/>.
    /// </summary>
    public class <%= name %>AuthenticationOptions : OAuthAuthenticationOptions {
        public <%= name %>AuthenticationOptions() {
            AuthenticationScheme = <%= name %>AuthenticationDefaults.AuthenticationScheme;
            Caption = <%= name %>AuthenticationDefaults.Caption;
            ClaimsIssuer = <%= name %>AuthenticationDefaults.Issuer;

            CallbackPath = new PathString(<%= name %>AuthenticationDefaults.CallbackPath);

            AuthorizationEndpoint = <%= name %>AuthenticationDefaults.AuthorizationEndpoint;
            TokenEndpoint = <%= name %>AuthenticationDefaults.TokenEndpoint;
            UserInformationEndpoint = <%= name %>AuthenticationDefaults.UserInformationEndpoint;

            SaveTokensAsClaims = false;
        }
    }
}
