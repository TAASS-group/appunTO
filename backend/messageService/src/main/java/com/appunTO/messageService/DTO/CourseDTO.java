package com.appunTO.messageService.DTO;

import lombok.Data;

@Data
public class CourseDTO {
    private int id;
    private String name;
    private String professor;
    private String description;
    private String department;
}
