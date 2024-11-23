package gcu.backend.dreank.repository;

import gcu.backend.dreank.domain.study.Study;
import gcu.backend.dreank.domain.study.enums.StudyStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudyRepository extends JpaRepository<Study, Long> {
    List<Study> findByName(String name);
    List<Study> findTop3ByOrderByScoreDesc();
    List<Study> findByStatus(StudyStatus status);
    List<Study> findByTag(String tag);
    List<Study> findByUser_Id(Long userId);
    List<Study> findAllByLeader(Long leaderId);
    void deleteByUserId(Long userId);
}
