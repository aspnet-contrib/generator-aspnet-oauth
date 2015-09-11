/*
 * Licensed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * See https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers
 * for more information concerning the license and the contributors participating to this project.
 */

using Microsoft.AspNet.Authentication;
using Microsoft.AspNet.Authentication.OAuth;

namespace AspNet.Security.OAuth.<%= name %> {
    /// <summary>
    /// Default values used by the <%= name %> authentication middleware.
    /// </summary>
    public static class <%= name %>AuthenticationDefaults {
        /// <summary>
        /// Default value for <see cref="AuthenticationOptions.AuthenticationScheme"/>.
        /// </summary>
        public const string AuthenticationScheme = "<%= name %>";

        /// <summary>
        /// Default value for <see cref="OAuthAuthenticationOptions.Caption"/>.
        /// </summary>
        public const string Caption = "<%= name %>";

        /// <summary>
        /// Default value for <see cref="OAuthAuthenticationOptions.ClaimsIssuer"/>.
        /// </summary>
        public const string Issuer = "<%= name %>";

        /// <summary>
        /// Default value for <see cref="OAuthAuthenticationOptions.CallbackPath"/>.
        /// </summary>
        public const string CallbackPath = "/signin-<%= name.toLowerCase() %>";

        /// <summary>
        /// Default value for <see cref="OAuthAuthenticationOptions.AuthorizationEndpoint"/>.
        /// </summary>
        public const string AuthorizationEndpoint = "<%= authorizationendpoint %>";

        /// <summary>
        /// Default value for <see cref="OAuthAuthenticationOptions.TokenEndpoint"/>.
        /// </summary>
        public const string TokenEndpoint = "<%= tokenendpoint %>";

        /// <summary>
        /// Default value for <see cref="OAuthAuthenticationOptions.UserInformationEndpoint"/>.
        /// </summary>
        public const string UserInformationEndpoint = "<%= userinformationendpoint %>";
    }
}
