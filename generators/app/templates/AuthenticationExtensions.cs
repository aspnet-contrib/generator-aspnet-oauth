/*
 * Licensed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * See https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers
 * for more information concerning the license and the contributors participating to this project.
 */

using System;
using AspNet.Security.OAuth.<%= name %>;
using JetBrains.Annotations;
using Microsoft.Extensions.Options;

namespace Microsoft.AspNetCore.Builder {
    /// <summary>
    /// Extension methods to add <%= name %> authentication capabilities to an HTTP application pipeline.
    /// </summary>
    public static class <%= name %>AuthenticationExtensions {
        /// <summary>
        /// Adds the <see cref="<%= name %>AuthenticationMiddleware"/> middleware to the specified
        /// <see cref="IApplicationBuilder"/>, which enables <%= name %> authentication capabilities.
        /// </summary>
        /// <param name="app">The <see cref="IApplicationBuilder"/> to add the middleware to.</param>
        /// <param name="options">A <see cref="<%= name %>AuthenticationOptions"/> that specifies options for the middleware.</param>        
        /// <returns>A reference to this instance after the operation has completed.</returns>
        public static IApplicationBuilder Use<%= name %>Authentication(
            [NotNull] this IApplicationBuilder app,
            [NotNull] <%= name %>AuthenticationOptions options) {
            if (app == null) {
                throw new ArgumentNullException(nameof(app));
            }

            if (options == null) {
                throw new ArgumentNullException(nameof(options));
            }

            return app.UseMiddleware<<%= name %>AuthenticationMiddleware>(Options.Create(options));
        }

        /// <summary>
        /// Adds the <see cref="<%= name %>AuthenticationMiddleware"/> middleware to the specified
        /// <see cref="IApplicationBuilder"/>, which enables <%= name %> authentication capabilities.
        /// </summary>
        /// <param name="app">The <see cref="IApplicationBuilder"/> to add the middleware to.</param>
        /// <param name="configuration">An action delegate to configure the provided <see cref="<%= name %>AuthenticationOptions"/>.</param>
        /// <returns>A reference to this instance after the operation has completed.</returns>
        public static IApplicationBuilder Use<%= name %>Authentication(
            [NotNull] this IApplicationBuilder app,
            [NotNull] Action<<%= name %>AuthenticationOptions> configuration) {
            if (app == null) {
                throw new ArgumentNullException(nameof(app));
            }

            if (configuration == null) {
                throw new ArgumentNullException(nameof(configuration));
            }

            var options = new <%= name %>AuthenticationOptions();
            configuration(options);

            return app.UseMiddleware<<%= name %>AuthenticationMiddleware>(Options.Create(options));
        }
    }
}
