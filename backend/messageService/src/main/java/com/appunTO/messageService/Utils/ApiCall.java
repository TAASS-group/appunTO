package com.appunTO.messageService.Utils;

import com.appunTO.messageService.DTO.CourseDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Set;
@Slf4j
public class ApiCall {
    public static String getCourseName(long courseId, RestTemplate restTemplate) {
        ResponseEntity<CourseDTO> courseRespEntity = restTemplate.exchange(
                "http://courseservice/course/getCourseById/" + courseId,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<CourseDTO>() {}
        );

        if(courseRespEntity.getStatusCode().isError()) {
            log.error("Error getting course name");
            return "Placeholder Course Name";
        }

        CourseDTO course = courseRespEntity.getBody();
        if (course == null) {
            log.error("user has no courses");
            return "Placeholder Course Name";
        }

        return course.getName();
    }

    public static Set<Long> getUserCourses(String userId, RestTemplate restTemplate) {
        ResponseEntity<Set<Long>> responseEntity = restTemplate.exchange(
                "http://userservice/user/enrolledCourses?uid=" + userId,
                HttpMethod.GET,
                null,
                new ParameterizedTypeReference<Set<Long>>() {}
        );

        if(responseEntity.getStatusCode().isError()) {
            log.error("Error getting user courses");
            return null;
        }

        Set<Long> userCourses = responseEntity.getBody();
        if (userCourses == null) {
            log.error("user has no courses");
            return null;
        }
        return userCourses;
    }
}

















