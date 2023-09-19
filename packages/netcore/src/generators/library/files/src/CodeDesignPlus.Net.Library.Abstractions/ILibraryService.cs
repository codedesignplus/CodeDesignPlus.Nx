namespace CodeDesignPlus.Net.Library.Abstractions;

/// <summary>
/// This services is the example
/// </summary>
public interface ILibraryService
{
    Task<string> EchoAsync(string value);
}
