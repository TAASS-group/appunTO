package com.appunto.forumservice.Service;

import com.appunto.forumservice.DTO.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class ClientService {
    private final UserServiceClient userServiceClient;



    public ClientService(UserServiceClient userServiceClient) {
        this.userServiceClient = userServiceClient;

    }
    public UserDTO getUserInfo(String uid) {
        return userServiceClient.getUserInfo(uid);
    }
}
