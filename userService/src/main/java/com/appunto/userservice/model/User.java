package com.appunto.userservice.model;

import com.google.firebase.auth.UserRecord;
import lombok.*;

@Builder @Getter @Setter
public class User {
  private String displayName;
  private String email;
  private String phoneNumber;
  private String photoUrl;
  private @NonNull String uid;

  public static User fromUserRecord(UserRecord userRecord) {
    return User.builder()
        .displayName(userRecord.getDisplayName())
        .email(userRecord.getEmail())
        .phoneNumber(userRecord.getPhoneNumber())
        .photoUrl(userRecord.getPhotoUrl())
        .uid(userRecord.getUid())
        .build();
  }
}
