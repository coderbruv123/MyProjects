namespace project1.Services
{
    public class LoggerServices : ILoggerServices
    {
        public void LogInfo(string message)
        {
            Console.WriteLine($"INFO: {message}");

        }

        public void LogError(string message)
        {
            Console.WriteLine($"ERROR: {message}");

        }


    }

}
