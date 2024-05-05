package com.appunTO.messageService;

import com.appunTO.messageService.Services.RabbitMQService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableDiscoveryClient
public class MessageServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MessageServiceApplication.class, args);
	}

//	@Bean
//	CommandLineRunner runner(RabbitMQService rabbitMQService) {
//		return (args) -> {
//			rabbitMQService.createExchange();
//			rabbitMQService.createQueue("test1", RabbitMQService.EXCHANGE, "notification.test1");
//		};
//	}

}
