package gcu.backend.dreank.dto.request.user;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserCreateRequest {
    //    아이디
    @Email
    @NotBlank
    @Schema(description = "이메일", example = "test@gmail.com")
    private String email;

    @NotBlank
    @Schema(description = "비밀번호", example = "1234")
    private String password;

    @NotBlank
    @Schema(description = "닉네임", example = "동동")
    private String nickname;

    @Schema(description = "자기소개", example = "나는 동동이니라")
    private String introduce;

    @NotBlank
    @Schema(description = "전화번호", example = "010-0000-0000")
    private String phone;


    public void setEmail(String email) {
        // 이메일 형식이 유효한지 검사
        if (isValidEmail(email)) {
            this.email = email;
        } else {
            throw new IllegalArgumentException("Invalid email format");
        }
    }

    public void setPassword(String password) {
        // 비밀번호가 유효한지 검사 (길이 등)
        if (isValidPassword(password)) {
            this.password = password;
        } else {
            throw new IllegalArgumentException("Invalid password");
        }
    }

    // 유효한 이메일인지를 확인하는 메소드
    private boolean isValidEmail(String email) {
        // 이메일 형식을 간단하게 체크하는 정규 표현식 사용
        String emailRegex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@" +
                "(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
        return email.matches(emailRegex);
    }

    // 유효한 비밀번호인지를 확인하는 메소드
    private boolean isValidPassword(String password) {
        // 비밀번호가 6자 이상인지 확인
        return password.length() >= 6;
    }
}
