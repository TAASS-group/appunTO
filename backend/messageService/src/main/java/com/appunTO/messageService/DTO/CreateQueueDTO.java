package com.appunTO.messageService.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class CreateQueueDTO {
    private String queueName;
    private String exchangeName;
    private String routingKey;

    public CreateQueueDTO(String queueName, String exchangeName, String routingKey) {
        this.queueName = queueName;
        this.exchangeName = exchangeName;
        this.routingKey = routingKey;
    }
}
