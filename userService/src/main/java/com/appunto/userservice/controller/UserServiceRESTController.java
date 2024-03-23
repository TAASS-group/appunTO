package com.appunto.userservice.controller;

import com.appunto.userservice.model.User;
import com.appunto.userservice.repository.UserServiceRepositrory;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Log
@RestController @RequestMapping("/user")
public class UserServiceRESTController {

  @Autowired
  private UserServiceRepositrory repositrory;

  @GetMapping("/info")
  public User getUserById(@RequestParam String uid) throws FirebaseAuthException {
    UserRecord firebaseData = FirebaseAuth.getInstance().getUser(uid);
    User dbData = repositrory.findUserByUid(uid);
    if(dbData == null) dbData = createUser(uid);

    log.info(STR."User \{uid} fetched");

    return dbData.populateFromFirebase(firebaseData);
  }

  @GetMapping("/create")
  public User createUser(@RequestParam String uid) {
    User user = User.builder().uid(uid).bio("").build();
    repositrory.save(user);

    log.info(STR."User \{uid} created");

    return user;
  }

  @GetMapping("/delete")
  public void deleteUser(@RequestParam String uid) throws FirebaseAuthException {
    FirebaseAuth.getInstance().deleteUser(uid);
    repositrory.deleteById(uid);

    log.info(STR."User \{uid} deleted");
  }

  @PostMapping("/update")
  public User updateUser(@RequestBody User user) throws FirebaseAuthException {
    UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(user.getUid())
        .setEmail(user.getEmail())
        .setPhoneNumber(user.getPhoneNumber())
        .setDisplayName(user.getDisplayName())
        .setPhotoUrl(user.getPhotoUrl());
    UserRecord firebaseData = FirebaseAuth.getInstance().updateUser(request);
    user.populateFromFirebase(firebaseData);
    repositrory.save(user);

    log.info(STR."User \{user.getUid()} updated");

    return user;
  }

  @ExceptionHandler
  @ResponseStatus(HttpStatus.BAD_REQUEST) @ResponseBody
  public String handleFirebaseAuthException(FirebaseAuthException fae) {
    String message = STR."Error \{fae.getErrorCode()}: \{fae.getMessage()}";
    log.warning(message);
    return message;
  }
}
