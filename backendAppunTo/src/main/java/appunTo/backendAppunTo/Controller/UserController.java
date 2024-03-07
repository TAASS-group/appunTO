package appunTo.backendAppunTo.Controller;

import appunTo.backendAppunTo.Models.MyUser;
import appunTo.backendAppunTo.Repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping ("/user")
public class UserController {
    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping ("/getAll")
    public List<MyUser> getAllUsers() {
        return userRepository.findAll();
    }

    // CREATE RANDOM USER
    @GetMapping ("/createRandom")
    public MyUser createRandomUser() {
        MyUser user = new MyUser("User" + Math.random(), "user" + Math.random() + "@mail.com", "password", "user");
        return userRepository.save(user);
    }
}
