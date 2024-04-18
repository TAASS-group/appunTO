package appunTo.courseService.Controller;

import appunTo.courseService.Models.Course;
import appunTo.courseService.Services.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {


    private final CourseService courseService;

    @Autowired
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/getAll")
    public List<Course> getAllUsers() {
        return courseService.getAllCourses();
    }

    // CREATE RANDOM USER
    @GetMapping ("/createRandom")
    public Course createRandomUser() {
        return courseService.createRandomUser();
    }

    // create course from request parameters
    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        Course c = courseService.createCourse(course);
        if (c == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(c);

    }

    @DeleteMapping(path = "{courseId}")
    public void deleteCourse(@PathVariable("courseId") int courseId) {
        courseService.deleteCourse(courseId);
    }

    @PutMapping(path = "{courseId}")
    public void updateCourse(@PathVariable("courseId") int courseId, @RequestParam(required = false) String name, @RequestParam(required = false) String professor, @RequestParam(required = false) String description, @RequestParam(required = false) String department) {
        courseService.updateCourse(courseId, name, professor, description, department);
    }
    // find courses by name adn return it to client
    @GetMapping("/findCourse")
    public List<Course> findCourse(@RequestParam String name) {
        return courseService.findCourse(name);
    }

}
