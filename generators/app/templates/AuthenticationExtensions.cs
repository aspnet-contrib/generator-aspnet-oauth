/*
 * Licensed under the Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 * See https://github.com/aspnet-contrib/AspNet.Security.OAuth.Providers
 * for more information concerning the license and the contributors participating to this project.
 */

using System;
using AspNet.Security.OAuth.<%= name %>;
using Microsoft.Framework.DependencyInjection;
using Microsoft.Framework.Internal;
using Microsoft.Framework.OptionsModel;

namespace Microsoft.AspNet.Builder {
    public static class <%= name %>AuthenticationExtensions {
        public static IServiceCollection Configure<%= name %>Authentication(
            [NotNull] this IServiceCollection services,
            [NotNull] Action<<%= name %>AuthenticationOptions> configuration) {
            return services.Configure(configuration);
        }

        public static IApplicationBuilder Use<%= name %>Authentication([NotNull] this IApplicationBuilder app) {
            return app.UseMiddleware<<%= name %>AuthenticationMiddleware>();
        }

        public static IApplicationBuilder Use<%= name %>Authentication(
            [NotNull] this IApplicationBuilder app,
            [NotNull] Action<<%= name %>AuthenticationOptions> configuration) {
            return app.UseMiddleware<<%= name %>AuthenticationMiddleware>(
                new ConfigureOptions<<%= name %>AuthenticationOptions>(configuration));
        }
    }
}
