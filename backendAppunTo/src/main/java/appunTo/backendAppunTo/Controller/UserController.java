package appunTo.backendAppunTo.Controller;

import appunTo.backendAppunTo.Models.MyUser;
import appunTo.backendAppunTo.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping ("api/user")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping ("/getAll")
    public List<MyUser> getAllUsers() {
        return userService.getAllUsers();
    }

    // CREATE RANDOM USER
    @GetMapping ("/createRandom")
    public MyUser createRandomUser() {
        return userService.createRandomUser();
    }
}
