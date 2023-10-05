using Confluent.Kafka;
using Newtonsoft.Json;

namespace NotifyService.Services
{
    public class KafkaConsumer: IHostedService
    {
        private readonly IConfiguration config;
        private readonly ILogger<KafkaConsumer> logger;

        public KafkaConsumer(IConfiguration config, ILogger<KafkaConsumer> logger)
        {
            this.config = config;
            this.logger = logger;
        }
        public Task StartAsync(CancellationToken cancellationToken)
        {
            ConsumerConfig cconfig = new ConsumerConfig
            {
                BootstrapServers = config["Kafka:Server"],
                GroupId = "Group1"
            };

            using (var consumer = new ConsumerBuilder<Null, string>(cconfig).Build())
            {
                consumer.Subscribe(config["Kafka:Topic"]);

                var canceltoken = new CancellationTokenSource();

                try
                {
                    while (true)
                    {
                        var topicconsumer = consumer.Consume(canceltoken.Token);

                        var userdata = JsonConvert.DeserializeObject<User>(topicconsumer.Message.Value);
                        
                        //logger.LogInformation($"{userdata.UserEmailId}  {userdata.Name} {userdata.MobileNo}");
                    }
                }
                catch (OperationCanceledException ex)
                {
                    //logger.LogError(ex.Message);
                    consumer.Close();
                }
            };
            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}