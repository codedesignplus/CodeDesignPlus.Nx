namespace CodeDesignPlus.Net.Library.Test.Helpers;

public static class ConfigurationUtil
{
    public static readonly LibraryOptions LibraryOptions = new()
    {
        Enable = true,
        Name = nameof(Library.Options.LibraryOptions.Name),
        Email = $"{nameof(Library.Options.LibraryOptions.Name)}@codedesignplus.com"
    };

    public static IConfiguration GetConfiguration()
    {
        return GetConfiguration(new AppSettings()
        {
            Library = LibraryOptions
        });
    }

    public static IConfiguration GetConfiguration(object? appSettings = null)
    {
        var json = JsonSerializer.Serialize(appSettings);

        var memoryStream = new MemoryStream(Encoding.UTF8.GetBytes(json));

        return new ConfigurationBuilder().AddJsonStream(memoryStream).Build();
    }

}
