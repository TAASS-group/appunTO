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
import org.springframework.web.client.RestTemplate;

import java.util.Set;

@Log
@RestController @RequestMapping("/user")
public class UserServiceRESTController {
  private final UserServiceRepositrory repositrory;
  private final RestTemplate restTemplate;

  @Autowired
  public UserServiceRESTController(UserServiceRepositrory repositrory, RestTemplate restTemplate) {
    this.repositrory = repositrory;
    this.restTemplate = restTemplate;
  }

  @GetMapping("/info")
  public User getUserById(@RequestParam String uid) throws FirebaseAuthException {
    UserRecord firebaseData = FirebaseAuth.getInstance().getUser(uid);
    User dbData = repositrory.findUserByUid(uid);
    if(dbData == null) dbData = createUser(uid);

    log.info("User " + uid + " fetched");

    return dbData.populateFromFirebase(firebaseData);
  }

  @GetMapping("/create")
  public User createUser(@RequestParam String uid) {
    User user = User.builder().uid(uid).bio("").build();

    log.info("User " + uid + " created");

    return repositrory.save(user);
  }

  @GetMapping("/delete")
  public void deleteUser(@RequestParam String uid) throws FirebaseAuthException {
    FirebaseAuth.getInstance().deleteUser(uid);
    repositrory.deleteById(uid);

    log.info("User " + uid + " deleted");
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

    log.info("User " + user.getUid() + " updated");

    return repositrory.save(user);
  }

  @GetMapping("/enroll")
  public User enroll(@RequestParam String uid, @RequestParam long courseId) throws FirebaseAuthException {
    User user = getUserById(uid);
    user.getEnrolledCourses().add(courseId);

    log.info("User " + uid + " enrolled in course " + courseId);

    return repositrory.save(user);
  }

  @GetMapping("/leave")
  public User leave(@RequestParam String uid, @RequestParam long courseId) throws FirebaseAuthException {
    User user = getUserById(uid);
    user.getEnrolledCourses().remove(courseId);

    log.info("User " + uid + " left course " + courseId);

    return repositrory.save(user);
  }

  @GetMapping("/enrolledCourses")
  public Set<Long> getEnrolledCourses(@RequestParam String uid) {
    Set<Long> enrolledCourses = repositrory.findUserByUid(uid).getEnrolledCourses();

    log.info("Enrolled courses " + enrolledCourses + " for user " + uid + " fetched");

    return enrolledCourses;
  }


  @ExceptionHandler
  @ResponseStatus(HttpStatus.BAD_REQUEST) @ResponseBody
  public String handleFirebaseAuthException(FirebaseAuthException fae) {
    String message = "Error " + fae.getErrorCode() + ": " + fae.getMessage();

    log.warning(message);

    return message;
  }
}
