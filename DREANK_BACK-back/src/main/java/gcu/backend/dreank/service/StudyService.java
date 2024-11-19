package gcu.backend.dreank.service;

import gcu.backend.dreank.domain.mapping.ChatRoom;
import gcu.backend.dreank.domain.mapping.UserStudy;
import gcu.backend.dreank.domain.study.Study;
import gcu.backend.dreank.domain.study.enums.StudyStatus;
import gcu.backend.dreank.domain.study.enums.Verify;
import gcu.backend.dreank.domain.user.User;
import gcu.backend.dreank.dto.request.study.StudyCreateResponse;
import gcu.backend.dreank.dto.request.study.StudyResponse;
import gcu.backend.dreank.exception.NoStudyForTagException;
import gcu.backend.dreank.exception.StudyNotFoundException;
import gcu.backend.dreank.exception.UserNotFoundException;
import gcu.backend.dreank.exception.UserStudyMappingNotFoundException;
import gcu.backend.dreank.repository.ChatRoomRepository;
import gcu.backend.dreank.repository.StudyRepository;
import gcu.backend.dreank.repository.UserRepository;
import gcu.backend.dreank.repository.UserStudyRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class StudyService {
    private final StudyRepository studyRepository;
    private final UserRepository userRepository;
    private final UserStudyRepository userStudyRepository;
    private final ChatRoomRepository chatRoomRepository;

    // 스터디 생성 시 채팅방도 생성
    public StudyCreateResponse save(final Study study) {
        Study savedStudy = studyRepository.save(study);
        ChatRoom chatRoom = ChatRoom.builder()
                .study(savedStudy)
                .build();
        chatRoomRepository.save(chatRoom);
        return StudyCreateResponse.of(savedStudy);
    }

    public List<Study> find() {
        return studyRepository.findAll();
    }

    public StudyResponse findById(Long id) {
        Study study = studyRepository.findById(id)
                .orElseThrow(StudyNotFoundException::new);
        return new StudyResponse(study);
    }

    public List<StudyResponse> findByName(String name) {
        List<Study> studyList = studyRepository.findByName(name);
        if (studyList.isEmpty()) {
            throw new StudyNotFoundException();
        }
        List<StudyResponse> studyResponseList = new ArrayList<>();
        for (Study study : studyList) {
            studyResponseList.add(new StudyResponse(study));
        }
        return studyResponseList;
    }

    public List<Study> findByTag(String tag) {
        List<Study> studyList = studyRepository.findByTag(tag);
        if (studyList.isEmpty()) {
            throw new NoStudyForTagException(tag);
        }
        return studyList;
    }

    public List<Study> findMakeStudy(Long userId) {
        return studyRepository.findAllByLeader(userId);
    }

    public HashSet<Study> findMyStudy(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        List<UserStudy> userStudyList = userStudyRepository.findByUser(user);
        HashSet<Study> studySet = new HashSet<>();
        for (UserStudy userStudy : userStudyList) {
            if (userStudy.getVerify() == Verify.ACCEPT) {
                studySet.add(userStudy.getStudy());
            }
        }
        return studySet;
    }

    public HashSet<Study> findWatingStudy(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        List<UserStudy> userStudyList = userStudyRepository.findByUser(user);
        HashSet<Study> studySet = new HashSet<>();
        for (UserStudy userStudy : userStudyList) {
            if (userStudy.getVerify() == Verify.WAITING) {
                studySet.add(userStudy.getStudy());
            }
        }
        return studySet;
    }

    public List<StudyResponse> findThreeRank() {
        List<Study> studyList = studyRepository.findTop3ByOrderByScoreDesc();
        List<StudyResponse> studyResponseList = new ArrayList<>();
        if (studyList.isEmpty()) {
            throw new StudyNotFoundException();
        }
        for (Study study : studyList) {
            studyResponseList.add(new StudyResponse(study));
        }
        return studyResponseList;
    }

    public List<StudyResponse> findByStatus(StudyStatus status) {
        List<Study> studyList = studyRepository.findByStatus(status);
        List<StudyResponse> studyResponseList = new ArrayList<>();
        if (studyList.isEmpty()) {
            throw new StudyNotFoundException();
        }
        for (Study study : studyList) {
            studyResponseList.add(new StudyResponse(study));
        }
        return studyResponseList;
    }

    public StudyResponse apply(Long studyId, Long userId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(StudyNotFoundException::new);
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        UserStudy userStudy = new UserStudy(user, study);
        userStudyRepository.save(userStudy);
        return new StudyResponse(study);
    }

    public StudyResponse accept(Long studyId, Long userId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(StudyNotFoundException::new);
        User user = userRepository.findById(userId)
                .orElseThrow(UserNotFoundException::new);
        UserStudy userStudy = userStudyRepository.findByUserAndStudy(user, study)
                .orElseThrow(UserStudyMappingNotFoundException::new);
        userStudy.setVerify(Verify.ACCEPT);
        userStudyRepository.save(userStudy);
        return new StudyResponse(study);
    }

    public StudyResponse completeStatus(Long studyId) {
        Study study = studyRepository.findById(studyId)
                .orElseThrow(StudyNotFoundException::new);
        study.setStatus(StudyStatus.COMPLETED);
        studyRepository.save(study);
        return new StudyResponse(study);
    }
}
