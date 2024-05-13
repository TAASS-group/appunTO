package com.appunTO.messageService.Config;

import com.appunTO.messageService.Repository.NotificationRepository;
import com.appunTO.messageService.Services.CustomWebSocketHandler;
import com.appunTO.messageService.Services.WebSocketMessageBroker;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private WebSocketMessageBroker broker;
    @Autowired
    private NotificationRepository notificationRepository;
    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(new CustomWebSocketHandler(broker,notificationRepository), "/ws").setAllowedOrigins("*");
    }
}
