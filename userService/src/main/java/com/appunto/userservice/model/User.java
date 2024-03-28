package com.appunto.userservice.model;

import com.google.firebase.auth.UserRecord;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity @Table(name = "users")
@Data @Builder @AllArgsConstructor(access = AccessLevel.PRIVATE) @NoArgsConstructor
public class User {
  private @NonNull @Id String uid;
  private @Transient String displayName;
  private @Transient String email;
  private @Transient String phoneNumber;
  private @Transient String photoUrl;
  private String bio;
  private @Singular @ElementCollection Set<Long> enrolledCourses;

  public User populateFromFirebase(UserRecord userRecord) {
    uid = userRecord.getUid();
    displayName = userRecord.getDisplayName();
    email = userRecord.getEmail();
    phoneNumber = userRecord.getPhoneNumber();
    photoUrl = userRecord.getPhotoUrl();

    return this;
  }
}
