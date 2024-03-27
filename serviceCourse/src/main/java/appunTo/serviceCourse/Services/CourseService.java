package appunTo.serviceCourse.Services;

import appunTo.serviceCourse.Models.Course;
import appunTo.serviceCourse.Repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course createCourse(Course course) {
        Optional<Course> courseOptional = courseRepository.findByCourseAndDepartment(course.getName(), course.getDepartment());
        if (courseOptional.isPresent()) {
            throw new IllegalStateException("Course already exists");
        }
        return courseRepository.save(course);
    }

    public Course createRandomUser() {
        Course course = new Course("User" + Math.random(), "user" + Math.random() , "Calcolabilità e complessità", "Informatica");
        return courseRepository.save(course);
    }

    public void deleteCourse(int courseId) {
        boolean exists = courseRepository.existsById(courseId);
        if (!exists) {
            throw new IllegalStateException("Course with id " + courseId + " does not exist");
        }
        courseRepository.deleteById(courseId);
    }
    @Transactional
    public void updateCourse(int courseId, String name, String professor, String description, String department) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new IllegalStateException("Course with id " + courseId + " does not exist"));

        if (name != null && !name.isEmpty() && !name.equals(course.getName())) {
            if (department != null && !department.isEmpty() && !department.equals(course.getDepartment())) {
                Optional<Course> courseOptional = courseRepository.findByCourseAndDepartment(name, department);
                if (courseOptional.isPresent()) {
                    throw new IllegalStateException("Course already exists with name " + name + " and department " + department);
                } else {
                    course.setName(name);
                    course.setDepartment(department);
                }
            }

        }
        if (name != null && !name.isEmpty() && !name.equals(course.getName())) {
            if (department == null || department.isEmpty()) {
                Optional<Course> courseOptional = courseRepository.findByCourseAndDepartment(name, course.getDepartment());
                if (courseOptional.isPresent()) {
                    throw new IllegalStateException("Course already exists with name " + name + " and department " + course.getDepartment());
                } else {
                    course.setName(name);

                }
            }
        }
        if (department != null && !department.isEmpty() && !department.equals(course.getDepartment())) {
            if (name == null || name.isEmpty()) {
                Optional<Course> courseOptional = courseRepository.findByCourseAndDepartment(course.getName(), department);
                if (courseOptional.isPresent()) {
                    throw new IllegalStateException("Course already exists with name " + course.getName() + " and department " + department);
                } else {
                    course.setDepartment(department);
                }
            }
        }
        if (professor != null && !professor.isEmpty() && !professor.equals(course.getProfessor())) {
            course.setProfessor(professor);
        }
        if (description != null && !description.isEmpty() && !description.equals(course.getDescription())) {
            course.setDescription(description);
        }

    }


    public List<Course> findCourse(String name) {
        List<Course> courses = courseRepository.findCourse(name);
        if (courses.isEmpty()) {
            throw new IllegalStateException("No course found with name " + name);
        }
        return courses;

    }
}
