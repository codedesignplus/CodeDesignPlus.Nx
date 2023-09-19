using CodeDesignPlus.Net.Library.Abstractions;
using CodeDesignPlus.Net.Library.Options;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace CodeDesignPlus.Net.Library.Services;

public class LibraryService: ILibraryService
{
    private readonly ILogger<LibraryService> logger;

    private readonly LibraryOptions options;

    public LibraryService(ILogger<LibraryService> logger, IOptions<LibraryOptions> options)
    {
        this.logger = logger;
        this.options = options.Value;
    }

    public Task<string> EchoAsync(string value)
    {
        this.logger.LogDebug("{section}, Echo {enable}", options.Enable);

        return Task.FromResult(value);
    }
}
