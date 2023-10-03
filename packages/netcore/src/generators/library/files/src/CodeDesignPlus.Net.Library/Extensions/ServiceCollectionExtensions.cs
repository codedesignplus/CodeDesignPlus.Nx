using CodeDesignPlus.Net.Library.Abstractions;
using CodeDesignPlus.Net.Library.Exceptions;
using CodeDesignPlus.Net.Library.Options;
using CodeDesignPlus.Net.Library.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CodeDesignPlus.Net.Library.Extensions;

/// <summary>
/// Provides a set of extension methods for CodeDesignPlus.EFCore
/// </summary>
public static class ServiceCollectionExtensions
{
    /// <summary>
    /// Add CodeDesignPlus.EFCore configuration options
    /// </summary>
    /// <param name="services">The Microsoft.Extensions.DependencyInjection.IServiceCollection to add the service to.</param>
    /// <param name="configuration">The configuration being bound.</param>
    /// <returns>The Microsoft.Extensions.DependencyInjection.IServiceCollection so that additional calls can be chained.</returns>
    public static IServiceCollection AddLibrary(this IServiceCollection services, IConfiguration configuration)
    {
        if (services == null)
            throw new ArgumentNullException(nameof(services));

        if (configuration == null)
            throw new ArgumentNullException(nameof(configuration));

        var section = configuration.GetSection(LibraryOptions.Section);

        if (!section.Exists())
            throw new LibraryException($"The section {LibraryOptions.Section} is required.");

        services
            .AddOptions<LibraryOptions>()
            .Bind(section)
            .ValidateDataAnnotations();

        services.AddSingleton<ILibraryService, LibraryService>();

        return services;
    }

}
