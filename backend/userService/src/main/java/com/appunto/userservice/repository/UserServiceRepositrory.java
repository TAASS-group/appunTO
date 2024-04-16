package com.appunto.userservice.repository;

import com.appunto.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserServiceRepositrory extends JpaRepository<User, String> {
  User findUserByUid(String uid);
}
