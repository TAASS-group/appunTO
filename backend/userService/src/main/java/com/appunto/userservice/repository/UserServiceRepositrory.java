package com.appunto.userservice.repository;

import com.appunto.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserServiceRepositrory extends JpaRepository<User, String> {
  User findUserByUid(String uid);

  // given an courseId count the number of users enrolled in that course
  long countByEnrolledCoursesContains(Long courseId);
}
