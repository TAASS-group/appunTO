package com.appunto.forumservice.Repository;

import com.appunto.forumservice.Models.Forum;
import org.springframework.data.repository.ListCrudRepository;

public interface ForumRepository extends ListCrudRepository<Forum, Long> {


}
