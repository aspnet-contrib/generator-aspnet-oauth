/*
 * Licensed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * See https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers
 * for more information concerning the license and the contributors participating to this project.
 */

using System;
using AspNet.Security.OAuth.<%= name %>;
using JetBrains.Annotations;
using Microsoft.AspNetCore.Authentication;

namespace Microsoft.Extensions.DependencyInjection
{
    /// <summary>
    /// Extension methods to add <%= name %> authentication capabilities to an HTTP application pipeline.
    /// </summary>
    public static class <%= name %>AuthenticationExtensions
    {
        /// <summary>
        /// Adds <see cref="<%= name %>AuthenticationHandler"/> to the specified
        /// <see cref="AuthenticationBuilder"/>, which enables <%= name %> authentication capabilities.
        /// </summary>
        /// <param name="builder">The authentication builder.</param>
        /// <returns>The <see cref="AuthenticationBuilder"/>.</returns>
        public static AuthenticationBuilder Add<%= name %>([NotNull] this AuthenticationBuilder builder)
        {
            return builder.Add<%= name %>(<%= name %>AuthenticationDefaults.AuthenticationScheme, options => { });
        }

        /// <summary>
        /// Adds <see cref="<%= name %>AuthenticationHandler"/> to the specified
        /// <see cref="AuthenticationBuilder"/>, which enables <%= name %> authentication capabilities.
        /// </summary>
        /// <param name="builder">The authentication builder.</param>
        /// <param name="configuration">The delegate used to configure the <%= name %> options.</param>
        /// <returns>The <see cref="AuthenticationBuilder"/>.</returns>
        public static AuthenticationBuilder Add<%= name %>(
            [NotNull] this AuthenticationBuilder builder,
            [NotNull] Action<<%= name %>AuthenticationOptions> configuration)
        {
            return builder.Add<%= name %>(<%= name %>AuthenticationDefaults.AuthenticationScheme, configuration);
        }

        /// <summary>
        /// Adds <see cref="<%= name %>AuthenticationHandler"/> to the specified
        /// <see cref="AuthenticationBuilder"/>, which enables <%= name %> authentication capabilities.
        /// </summary>
        /// <param name="builder">The authentication builder.</param>
        /// <param name="scheme">The authentication scheme associated with this instance.</param>
        /// <param name="configuration">The delegate used to configure the <%= name %> options.</param>
        /// <returns>The <see cref="AuthenticationBuilder"/>.</returns>
        public static AuthenticationBuilder Add<%= name %>(
            [NotNull] this AuthenticationBuilder builder,
            [NotNull] string scheme,
            [NotNull] Action<<%= name %>AuthenticationOptions> configuration)
        {
            return builder.Add<%= name %>(scheme, <%= name %>AuthenticationDefaults.DisplayName, configuration);
        }

        /// <summary>
        /// Adds <see cref="<%= name %>AuthenticationHandler"/> to the specified
        /// <see cref="AuthenticationBuilder"/>, which enables <%= name %> authentication capabilities.
        /// </summary>
        /// <param name="builder">The authentication builder.</param>
        /// <param name="scheme">The authentication scheme associated with this instance.</param>
        /// <param name="caption">The optional display name associated with this instance.</param>
        /// <param name="configuration">The delegate used to configure the <%= name %> options.</param>
        /// <returns>The <see cref="AuthenticationBuilder"/>.</returns>
        public static AuthenticationBuilder Add<%= name %>(
            [NotNull] this AuthenticationBuilder builder,
            [NotNull] string scheme,
            [CanBeNull] string caption,
            [NotNull] Action<<%= name %>AuthenticationOptions> configuration)
        {
            return builder.AddOAuth<<%= name %>AuthenticationOptions, <%= name %>AuthenticationHandler>(scheme, caption, configuration);
        }
    }
}
