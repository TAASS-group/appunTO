package appunTo.courseService.Models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Course {
    @Id
    @GeneratedValue
    private int id;
    private String name;
    private String professor;
    private String description;
    private String department;

    public Course() {

    }
    public Course(String name, String professor, String description, String department) {
        this.name = name;
        this.professor = professor;
        this.description = description;
        this.department = department;
    }

    public String getName() {
        return name;
    }

    public String getProfessor() {
        return professor;
    }

    public String getDescription() {
        return description;
    }

   public void setName(String name) {
        this.name = name;

    }
    public void setProfessor(String professor) {
        this.professor = professor;

    }
    public void setDescription(String description) {
        this.description = description;

    }

    public void setDepartment(String department) {
        this.department = department;

    }
    public String getDepartment() {
        return department;
    }

    public int getId() {
        return id;
    }
}
