package appunTo.backendAppunTo.Repository;

import appunTo.backendAppunTo.Models.MyUser;
import org.springframework.data.repository.ListCrudRepository;

public interface UserRepository extends ListCrudRepository<MyUser, Integer> {
    MyUser findByEmail(String email);
}
