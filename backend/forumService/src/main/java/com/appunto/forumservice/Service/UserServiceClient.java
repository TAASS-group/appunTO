package com.appunto.forumservice.Service;
import com.appunto.forumservice.DTO.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "userService", url = "http://userService/user")
public interface UserServiceClient {

    @GetMapping("/info")
    UserDTO getUserInfo(@RequestParam("uid") String uid);
}
