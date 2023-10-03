using Newtonsoft.Json;

namespace CodeDesignPlus.Net.Library.Test.Exceptions;

public class LibraryExceptionTest
{
    [Fact]
    public void LibraryException_DefaultValues_EmptyLibraryException()
    {
        // Arrange & Act
        var exception = new LibraryException();

        // Assert 
        Assert.Null(exception.Errors);
        Assert.Equal("Exception of type 'CodeDesignPlus.Net.Library.Exceptions.LibraryException' was thrown.", exception.Message);
    }

    [Fact]
    public void LibraryException_Errors()
    {
        // Arrange & Act
        var errors = new List<string>() { Guid.NewGuid().ToString() };
        var exception = new LibraryException(errors);

        // Assert 
        Assert.Equal(errors, exception.Errors);
        Assert.Equal("Exception of type 'CodeDesignPlus.Net.Library.Exceptions.LibraryException' was thrown.", exception.Message);
    }

    [Fact]
    public void LibraryException_CheckMessage()
    {
        // Arrange 
        var message = Guid.NewGuid().ToString();

        // Act
        var exception = new LibraryException(message);

        // Assert 
        Assert.Null(exception.Errors);
        Assert.Equal(message, exception.Message);
    }

    [Fact]
    public void LibraryException_CheckMessageAndErrors()
    {
        // Arrange 
        var message = Guid.NewGuid().ToString();
        var errors = new List<string>() { Guid.NewGuid().ToString() };

        // Act
        var exception = new LibraryException(message, errors);

        // Assert 
        Assert.Equal(errors, exception.Errors);
        Assert.Equal(message, exception.Message);
    }

    [Fact]
    public void LibraryException_CheckMessageAndInnerException()
    {
        // Arrange 
        var message = Guid.NewGuid().ToString();
        var innerException = new System.Exception("This is inner exception");

        // Act
        var exception = new LibraryException(message, innerException);

        // Assert 
        Assert.Null(exception.Errors);
        Assert.Equal(message, exception.Message);
        Assert.Equal(innerException, exception.InnerException);

    }

    [Fact]
    public void LibraryException_CheckMessageErrorsAndInnerException()
    {
        // Arrange 
        var message = Guid.NewGuid().ToString();
        var errors = new List<string>() { Guid.NewGuid().ToString() };
        var innerException = new System.Exception("This is inner exception");

        // Act
        var exception = new LibraryException(message, errors, innerException);

        // Assert 
        Assert.Equal(errors, exception.Errors);
        Assert.Equal(message, exception.Message);
        Assert.Equal(innerException, exception.InnerException);

    }

    [Fact]
    public void LibraryException_SerializationInfo_Call_Method()
    {
        // Arrange
        var errors = new List<string>() { Guid.NewGuid().ToString() };
        var message = Guid.NewGuid().ToString();

        var exception = new LibraryException(message, errors);

        // Act 
        var serialize = JsonConvert.SerializeObject(exception);

        var deserialize = JsonConvert.DeserializeObject(serialize, typeof(LibraryException)) as LibraryException;

        //Assert
        Assert.NotNull(deserialize);
        Assert.Equal(exception.Message, deserialize.Message);
        Assert.Equal(exception.Errors, deserialize.Errors);
    }
}
