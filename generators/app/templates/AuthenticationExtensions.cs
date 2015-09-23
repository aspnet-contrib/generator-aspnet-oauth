/*
 * Licensed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * See https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers
 * for more information concerning the license and the contributors participating to this project.
 */

using System;
using AspNet.Security.OAuth.<%= name %>;
using Microsoft.Framework.Internal;

namespace Microsoft.AspNet.Builder {
    public static class <%= name %>AuthenticationExtensions {
        public static IApplicationBuilder Use<%= name %>Authentication(
            [NotNull] this IApplicationBuilder app,
            [NotNull] <%= name %>AuthenticationOptions options) {
            return app.UseMiddleware<<%= name %>AuthenticationMiddleware>(options);
        }

        public static IApplicationBuilder Use<%= name %>Authentication(
            [NotNull] this IApplicationBuilder app,
            [NotNull] Action<<%= name %>AuthenticationOptions> configuration) {
            var options = new <%= name %>AuthenticationOptions();
            configuration(options);

            return app.UseMiddleware<<%= name %>AuthenticationMiddleware>(options);
        }
    }
}
