package appunTO.serviceForum.Service;

import appunTO.serviceForum.Models.Forum;
import appunTO.serviceForum.Repository.ForumRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ForumService {

    private final ForumRepository forumRepository;

    @Autowired
    public ForumService(ForumRepository forumRepository) {
        this.forumRepository = forumRepository;
    }

    public void deleteForum(long forumId) {
        boolean exists = forumRepository.existsById(forumId);
        if (!exists) {
            throw new IllegalStateException("Forum with id " + forumId + " does not exist");
        }
        forumRepository.deleteById(forumId);
    }


    public List<Forum> getAllForum() {
        return forumRepository.findAll();
    }

    public Forum createForum(Forum forum) {
       return forumRepository.save(forum);
    }
}
