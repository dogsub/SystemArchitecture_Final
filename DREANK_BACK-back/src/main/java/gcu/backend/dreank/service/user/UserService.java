package gcu.backend.dreank.service.user;

import gcu.backend.dreank.domain.user.User;
import gcu.backend.dreank.dto.request.user.UserCreateRequest;
import gcu.backend.dreank.dto.request.user.UserUpdateRequest;
import gcu.backend.dreank.exception.EmailAlreadyExistsException;
import gcu.backend.dreank.exception.NicknameExistsException;
import gcu.backend.dreank.exception.UserNotFoundException;
import gcu.backend.dreank.repository.CalendarRepository;
import gcu.backend.dreank.repository.StudyRepository;
import gcu.backend.dreank.repository.UserRepository;
import gcu.backend.dreank.repository.UserStudyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import gcu.backend.dreank.domain.user.enums.UserStatus;


@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final CalendarRepository calendarRepository;
    private final UserStudyRepository userStudyRepository;
    private final StudyRepository studyRepository;

    // 닉네임 중복 여부 확인
    @Transactional(readOnly = true)
    public boolean isNicknameDuplicated(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    // 이메일 중복 여부 확인
    @Transactional(readOnly = true)
    public boolean isEmailDuplicated(String email) {
        return userRepository.existsByEmail(email);
    }

    // CREATE - 회원가입
    @Transactional
    public void saveUser(UserCreateRequest request) {
        if (isEmailDuplicated(request.getEmail())) {
            throw new EmailAlreadyExistsException();
        }
        if (isNicknameDuplicated(request.getNickname())) {
            throw new NicknameExistsException(); // 닉네임 중복 예외 처리
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setNickname(request.getNickname());
        user.setPhone(request.getPhone());
        user.setIntroduce(request.getIntroduce());
        user.setPassword(request.getPassword());
        user.setStatus(UserStatus.ACTIVATE);  // 기본 상태 설정

        userRepository.save(user);
    }

    // 나머지 서비스 로직은 변경 없음


// READ - 비밀번호 확인
    @Transactional(readOnly = true)
    public boolean chkPwd(UserUpdateRequest request, Long id){
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        // 평문 비밀번호 비교 (추후 암호화 필요)
        return user.getPassword().equals(request.getPassword());
    }

    // READ - 사용자 정보 가져오기
    @Transactional(readOnly = true)
    public User getUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);
    }

    // UPDATE - 사용자 정보 수정
    @Transactional
    public void updateUser(UserUpdateRequest request, Long id){
        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        if (request.getNickname() != null) {
            user.setNickname(request.getNickname());
        }
        if (request.getIntroduce() != null) {
            user.setIntroduce(request.getIntroduce());
        }
        if (request.getNew_password() != null) {
            user.setPassword(request.getNew_password());  // 평문 비밀번호 저장 (추후 암호화 필요)
        }

        userRepository.save(user);
    }

    // DELETE - 사용자 삭제
    @Transactional
    public void deleteUser(long id){
        // 관련된 엔티티(캘린더, 스터디 등) 먼저 삭제
        calendarRepository.deleteByUserId(id);
        studyRepository.deleteByUserId(id);
        userStudyRepository.deleteByUserId(id);

        User user = userRepository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        userRepository.delete(user);
    }
}
