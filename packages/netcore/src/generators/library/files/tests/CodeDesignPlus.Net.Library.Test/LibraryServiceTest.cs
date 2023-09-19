using CodeDesignPlus.Net.Library.Options;
using CodeDesignPlus.Net.Library.Services;
using Microsoft.Extensions.Logging;
using Moq;

namespace CodeDesignPlus.Net.Library.Test;

public class LibraryServiceTest
{
    [Fact]
    public async Task Echo_ReturnSameValue_Equals()
    {
        // Arrange
        var expected = Guid.NewGuid().ToString();
        var logger = Mock.Of<ILogger<LibraryService>>();
        var options = Microsoft.Extensions.Options.Options.Create(new LibraryOptions());

        // Act
        var actual = await new LibraryService(logger, options).EchoAsync(expected);

        // Assert
        Assert.Equal(expected, actual); 
    }
}