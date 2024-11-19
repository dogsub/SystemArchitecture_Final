package gcu.backend.dreank.controller.chat;


import gcu.backend.dreank.domain.calendar.Calendar;
import gcu.backend.dreank.domain.chat.Chatting;
import gcu.backend.dreank.dto.CalendarRequest;
import gcu.backend.dreank.dto.request.chat.ChattingRequest;
import gcu.backend.dreank.service.chat.ChattingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chatting/{userId}")
@RequiredArgsConstructor
public class ChattingController {
    private final ChattingService chattingService;

    @Operation(summary = "채팅 생성 API", description = "특정 사용자가 새로운 채팅을 생성한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "채팅 생성 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "404", description = "사용자를 찾을 수 없음"),
            @ApiResponse(responseCode = "500", description = "서버 오류")
    })
    @PostMapping
    public ResponseEntity<Chatting> createChatting(@PathVariable Long userId, @RequestBody ChattingRequest request) {
        request.setUserId(userId);
        Chatting chatting = chattingService.createChatting(request);
        return ResponseEntity.ok(chatting);
    }
}