package appunTO.serviceForum.Repository;

import appunTO.serviceForum.Models.Answer;
import appunTO.serviceForum.Models.Forum;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface AnswerRepository extends ListCrudRepository<Answer, Long> {

    @Query("SELECT a FROM Answer a WHERE a.question.id = ?1")
    List<Answer> findByQuestionId(Long questionId);
}
