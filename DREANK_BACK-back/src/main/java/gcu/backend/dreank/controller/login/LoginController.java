package gcu.backend.dreank.controller.login;

import gcu.backend.dreank.domain.user.User;
import gcu.backend.dreank.dto.request.login.LoginForm;
import gcu.backend.dreank.dto.request.login.LoginResponse;
import gcu.backend.dreank.service.login.LoginService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    @Operation(summary = "로그인 API", description = "사용자가 로그인한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인 성공"),
            @ApiResponse(responseCode = "401", description = "로그인 실패: 인증되지 않은 사용자"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터")
    })
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginForm form, HttpServletRequest request) {
        User user = loginService.login(form, request);
        if (user != null) {
            LoginResponse response = new LoginResponse(user.getId(), user.getEmail(), user.getNickname());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @Operation(summary = "로그아웃 API", description = "사용자가 로그아웃한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그아웃 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "404", description = "로그인되지 않은 사용자")
    })
    @GetMapping("/logout")
    public void logout(HttpServletRequest request) {
        loginService.logout(request);
    }
}
