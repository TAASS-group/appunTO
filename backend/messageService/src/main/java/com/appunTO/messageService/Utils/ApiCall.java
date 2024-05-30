package com.appunTO.messageService.Utils;

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
        //        ResponseEntity<String> courseRespEntity = restTemplate.exchange(
        //                "http://courseservice/course/name?cid=" + courseId, //TODO: check this url
        //                HttpMethod.GET,
        //                null,
        //                new ParameterizedTypeReference<String>() {}
        //        );
        //
        //        if(courseRespEntity.getStatusCode().isError()) {
        //            log.error("Error getting course name");
        //            return "";
        //        }
        //
        //        String courseName = courseRespEntity.getBody();
        //        if (courseName == null) {
        //            log.error("user has no courses");
        //            return "";
        //        }
        //
        //        return courseName;
        return "Intelligenza Artificiale";
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

















