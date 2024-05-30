package com.appunTo.courseService.Repository;

import com.appunTo.courseService.Models.Course;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;


import java.util.List;
import java.util.Optional;


public interface CourseRepository extends ListCrudRepository<Course, Integer> {

    // find by course and department not case-sensitive
    @Query("SELECT c FROM Course c WHERE lower(c.name) = lower(?1) AND lower(c.department) = lower(?2)")
    Optional<Course> findByCourseAndDepartment(String course, String department);

    // find all by course by name, professor or department not case-sensitive
    @Query("SELECT c FROM Course c WHERE lower(c.name) LIKE lower(concat('%',?1,'%')) OR lower(c.professor) LIKE lower(concat('%',?1,'%')) OR lower(c.department) LIKE lower(concat('%',?1,'%'))")
    List<Course> findCourse(String name);
}
