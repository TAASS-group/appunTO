package com.appunTO.messageService.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AcknowledgeMessageDTO {
    private long notificationId;
    private String userId;
}
