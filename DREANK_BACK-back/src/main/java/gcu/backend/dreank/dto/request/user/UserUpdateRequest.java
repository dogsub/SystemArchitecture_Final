package gcu.backend.dreank.dto.request.user;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class UserUpdateRequest {
    @Schema(description = "닉네임", example = "동동")
    private String nickname;

    @Schema(description = "원래 비밀번호", example = "1234")
    private String password;

    @Schema(description = "새 비밀번호", example = "new1234")
    private String new_password;

    @Schema(description = "한줄 소개", example = "하이 모두들 안녕 내가 누군지 아늬?")
    private String introduce; // 한줄 소개

    // 객체를 JSON 문자열로 변환하는 메서드
    public String toJson() {
        try {
            return new ObjectMapper().writeValueAsString(this);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Fail to convert object to JSON string", e);
        }
    }
}