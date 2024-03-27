package appunTO.serviceForum.Repository;

import appunTO.serviceForum.Models.Forum;
import appunTO.serviceForum.Models.Question;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface QuestionRepository extends ListCrudRepository<Question, Long> {
    @Query("SELECT q FROM Question q WHERE q.forum.id = ?1")
    public List<Question> findByForumId(Long forumId);

}
