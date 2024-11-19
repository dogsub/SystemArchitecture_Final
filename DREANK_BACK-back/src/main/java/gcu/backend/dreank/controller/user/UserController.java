package gcu.backend.dreank.controller.user;

import gcu.backend.dreank.dto.request.user.UserCreateRequest;
import gcu.backend.dreank.dto.request.user.UserUpdateRequest;
import gcu.backend.dreank.domain.user.User;
import gcu.backend.dreank.service.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    // CREATE - 회원가입
    @Operation(summary = "회원가입 API", description = "회원가입을 진행한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "회원 가입이 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "400", description = "이미 가입된 이메일 또는 사용 중인 닉네임입니다.")
    })
    @PostMapping
    public ResponseEntity<String> saveUser(@RequestBody UserCreateRequest request) {
        // 이메일 중복 체크
        if (userService.isEmailDuplicated(request.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 가입된 이메일입니다.");
        }
        // 닉네임 중복 체크
        if (userService.isNicknameDuplicated(request.getNickname())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("이미 사용 중인 닉네임입니다.");
        }

        userService.saveUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
    }

    // 닉네임 중복 여부 확인
    @Operation(summary = "닉네임 중복 여부 확인 API", description = "사용자의 닉네임의 중복 여부를 확인한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "중복 여부 확인 성공")
    })
    @GetMapping("/check-nickname")
    public ResponseEntity<Boolean> checkNickname(@RequestParam String nickname) {
        boolean exists = userService.isNicknameDuplicated(nickname);
        return ResponseEntity.ok(exists);
    }

    // 이메일 중복 여부 확인
    @Operation(summary = "이메일 중복 여부 확인 API", description = "사용자의 이메일의 중복 여부를 확인한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "중복 여부 확인 성공")
    })
    @GetMapping("/check-email")
    public ResponseEntity<Boolean> checkEmail(@RequestParam String email) {
        boolean exists = userService.isEmailDuplicated(email);
        return ResponseEntity.ok(exists);
    }


// 비밀번호 확인 - 마이페이지 진입
    @Operation(summary = "마이페이지 진입 API with pw 확인", description = "해당 사용자의 마이페이지로 이동한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "비밀번호 확인 성공"),
            @ApiResponse(responseCode = "401", description = "비밀번호 불일치")
    })
    @PostMapping("/{userId}/mypage")
    public ResponseEntity<String> checkPwd(@PathVariable Long userId, @RequestBody UserUpdateRequest request) {
        boolean isPasswordCorrect = userService.chkPwd(request, userId);
        if (isPasswordCorrect) {
            return ResponseEntity.ok("Password is correct");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }
    }

    // UPDATE - 사용자 정보 수정
    @Operation(summary = "사용자 정보 수정 API", description = "사용자의 정보(마이페이지)를 수정(정보 갱신)한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "정보 갱신이 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @PatchMapping("/{userId}/update")
    public ResponseEntity<String> updateUser(@PathVariable Long userId, @RequestBody UserUpdateRequest request) {
        userService.updateUser(request, userId);
        return ResponseEntity.ok("User updated successfully");
    }

    // DELETE - 사용자 탈퇴
    @Operation(summary = "사용자 탈퇴 API", description = "사용자의 회원 탈퇴를 진행한다. - InActive")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "회원 탈퇴가 성공적으로 완료되었습니다."),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @DeleteMapping("/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return ResponseEntity.ok("User deleted successfully");
    }

    // GET - 사용자 정보 조회
    @Operation(summary = "사용자 정보 조회 API", description = "사용자의 정보를 조회(Get)한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "사용자 정보 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없습니다.")
    })
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        User user = userService.getUser(userId);
        return ResponseEntity.ok(user);
    }
}
