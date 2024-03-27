package appunTO.serviceForum.Repository;

import appunTO.serviceForum.Models.Forum;
import org.springframework.data.repository.ListCrudRepository;

import java.util.List;

public interface ForumRepository extends ListCrudRepository<Forum, Long> {


}
