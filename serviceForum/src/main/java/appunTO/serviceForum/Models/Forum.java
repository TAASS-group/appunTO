package appunTO.serviceForum.Models;



import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Forum {
    @Id
    @GeneratedValue
    private long id;
    @Column(name = "idCourse")
    private Long idCourse;
    private String name;


    public Forum(String name, long idCourse) {
        this.name = name;
        this.idCourse = idCourse;

    }

    public Forum() {

    }
    public void addQuestion(Question question){
        question.setForum(this);
    }

    public String getName() {
        return name;
    }

    public Long getIdCourse() {
        return idCourse;
    }

    public long getIdForum() {
        return id;
    }
}
