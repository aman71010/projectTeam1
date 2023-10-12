using Confluent.Kafka;
using Newtonsoft.Json;

namespace NotifyService.Services
{
    public class KafkaConsumer: IHostedService
    {
        private readonly IConfiguration config;

        public KafkaConsumer(IConfiguration config)
        {
            this.config = config;
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
                        var userEmail = topicconsumer.Message.Value;
                    }
                }
                catch (OperationCanceledException ex)
                {
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