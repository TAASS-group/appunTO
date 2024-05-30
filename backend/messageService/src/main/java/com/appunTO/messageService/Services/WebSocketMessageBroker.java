package com.appunTO.messageService.Services;

import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.HashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class WebSocketMessageBroker {
    private final HashMap<Long, CopyOnWriteArrayList<WebSocketSession>> courseSessions = new HashMap<>();

    public void register(WebSocketSession session, long course) {
        courseSessions.putIfAbsent(course, new CopyOnWriteArrayList<>());
        courseSessions.get(course).addIfAbsent(session);
    }

    public void unregister(WebSocketSession session) {
        for (long course : courseSessions.keySet()) {
            courseSessions.get(course).remove(session);
        }
    }

    public void broadcastToCourse(String message, long course) {
        if (courseSessions.containsKey(course)) {
            for (WebSocketSession session : courseSessions.get(course)) {
                try {
                    if (session.isOpen()) {
                        session.sendMessage(new TextMessage(message));
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

}
