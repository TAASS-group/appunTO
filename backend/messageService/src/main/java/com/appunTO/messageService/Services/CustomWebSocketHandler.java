package com.appunTO.messageService.Services;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.WebSocketSession;

import org.springframework.web.socket.TextMessage;
import java.io.IOException;


@Slf4j
public class CustomWebSocketHandler extends TextWebSocketHandler {

    private WebSocketMessageBroker broker;

    public CustomWebSocketHandler(WebSocketMessageBroker broker) {
        log.info("CustomWebSocketHandler created");
        this.broker = broker;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("New connection established");
        //broker.register(session);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        log.info("Connection closed");
        broker.unregister(session);
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
        log.info("Binary message received: " + message.getPayload());
        String[] courses = message.getPayload().split(" ");
        for (String course : courses) {
            broker.register(session, course);
        }
    }
}
