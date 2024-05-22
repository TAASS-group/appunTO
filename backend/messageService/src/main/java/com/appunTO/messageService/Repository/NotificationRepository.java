package com.appunTO.messageService.Repository;

import com.appunTO.messageService.Model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    Notification findNotificationById(Long id);

    // get all notification not aknowledged for a user of a courseid
    @Query("SELECT n FROM Notification n WHERE n.courseId = :courseId AND NOT EXISTS (" +
            "SELECT s FROM Seen s WHERE s.notification = n AND s.userId = :userId)")
    List<Notification> findUnseenNotificationsByCourseAndUser(@Param("courseId") String courseId, @Param("userId") String userId);
    @Query("SELECT n FROM Notification n INNER JOIN Seen s ON n.id = s.notification.id WHERE n.courseId = :courseId AND s.userId = :userId")
    List<Notification> findSeenNotificationsByCourseAndUser(@Param("courseId") String courseId, @Param("userId") String userId);
}

