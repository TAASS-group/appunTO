package com.appunTO.messageService.Repository;

import com.appunTO.messageService.Model.Seen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SeenRepository extends JpaRepository<Seen, Long> {

}
