package appunTo.backendAppunTo.Service;


import appunTo.backendAppunTo.Models.MyUser;
import appunTo.backendAppunTo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<MyUser> getAllUsers() {
        return userRepository.findAll();
    }

    public MyUser createRandomUser() {
        MyUser user = new MyUser("User" + Math.random(), "user" + Math.random() + "@mail.com", "password", "user");
        return userRepository.save(user);
    }
}
