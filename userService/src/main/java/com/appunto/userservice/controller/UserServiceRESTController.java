package com.appunto.userservice.controller;

import com.appunto.userservice.model.User;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@Log
@RestController @RequestMapping("/user")
public class UserServiceRESTController {
  @GetMapping("/info")
  public User getUser(@RequestParam String uid) throws FirebaseAuthException {
      UserRecord userRecord = FirebaseAuth.getInstance().getUser(uid);

      log.info(STR."User \{uid} fetched correctly");

      return User.fromUserRecord(userRecord);
  }

  @GetMapping("/delete")
  public void deleteUser(@RequestParam String uid) throws FirebaseAuthException {
    FirebaseAuth.getInstance().deleteUser(uid);

    log.info(STR."User \{uid} deleted correctly");
  }

  @PostMapping("/update")
  public User updateUser(@RequestBody User user) throws FirebaseAuthException {
    UserRecord.UpdateRequest request = new UserRecord.UpdateRequest(user.getUid())
        .setEmail(user.getEmail())
        .setPhoneNumber(user.getPhoneNumber())
        .setDisplayName(user.getDisplayName())
        .setPhotoUrl(user.getPhotoUrl());
    UserRecord userRecord = FirebaseAuth.getInstance().updateUser(request);

    log.info(STR."User \{user.getUid()} updated correctly");

    return User.fromUserRecord(userRecord);
  }

  @ExceptionHandler
  @ResponseStatus(HttpStatus.BAD_REQUEST) @ResponseBody
  public String handleFirebaseAuthException(FirebaseAuthException fae) {
    String message = STR."Error \{fae.getErrorCode()}: \{fae.getMessage()}";
    log.warning(message);
    return message;
  }
}
