package gcu.backend.dreank.controller.calendar;

import gcu.backend.dreank.domain.calendar.Calendar;
import gcu.backend.dreank.domain.study.Study;
import gcu.backend.dreank.domain.study.enums.Day;
import gcu.backend.dreank.dto.CalendarRequest;
import gcu.backend.dreank.service.Calendar.CalendarService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/user/{userId}/calendar")
@RequiredArgsConstructor
public class CalendarController {

    private final CalendarService calendarService;

    @Operation(summary = "캘린더 생성 API", description = "회원의 새로운 캘린더 항목을 생성한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "캘린더 항목 생성 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "404", description = "사용자 ID를 찾을 수 없음")
    })
    @PostMapping
    public ResponseEntity<Calendar> createCalendarEntry(@PathVariable Long userId, @RequestBody CalendarRequest request) {
        request.setUserId(userId);
        Calendar calendar = calendarService.createCalendarEntry(request);
        return ResponseEntity.ok(calendar);
    }

    @Operation(summary = "캘린더 항목 수정 API", description = "기존 캘린더 항목을 수정한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "캘린더 항목 수정 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "404", description = "캘린더 항목 또는 사용자 ID를 찾을 수 없음")
    })
    @PatchMapping("/{id}")
    public ResponseEntity<Calendar> updateCalendarEntry(@PathVariable Long userId, @PathVariable Long id, @RequestBody CalendarRequest request) {
        request.setUserId(userId);
        Calendar calendar = calendarService.updateCalendarEntry(id, request);
        return ResponseEntity.ok(calendar);
    }

    @Operation(summary = "캘린더 항목 삭제 API", description = "지정한 ID를 가진 캘린더 항목을 삭제한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "캘린더 항목 삭제 성공"),
            @ApiResponse(responseCode = "404", description = "캘린더 항목 또는 사용자 ID를 찾을 수 없음")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalendarEntry(@PathVariable Long userId, @PathVariable Long id) {
        calendarService.deleteCalendarEntry(id);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "회원의 모든 캘린더 조회 API", description = "회원의 전체 캘린더 항목을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "캘린더 항목 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자 ID를 찾을 수 없음")
    })
    @GetMapping
    public ResponseEntity<List<Calendar>> getUserCalendar(@PathVariable Long userId) {
        List<Calendar> calendar = calendarService.getUserCalendar(userId);
        return ResponseEntity.ok(calendar);
    }

    @Operation(summary = "겹치는 스터디 그룹 조회 API", description = "회원의 캘린더에 겹치는 스터디 그룹을 검색한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "겹치는 스터디 그룹 조회 성공"),
            @ApiResponse(responseCode = "204", description = "겹치는 스터디 그룹이 없음"),
            @ApiResponse(responseCode = "404", description = "사용자 ID를 찾을 수 없음")
    })
    @GetMapping("/searchGroupUsingCalendar")
    public ResponseEntity<List<Study>> findOverlappingStudyGroups(@PathVariable Long userId) {
        List<Study> overlappingStudies = calendarService.findOverlappingStudyGroups(userId);
        if (overlappingStudies.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(overlappingStudies);
    }

    @Operation(summary = "태그와 시간으로 스터디 필터링 API", description = "사용자가 선호하는 태그와 시간에 따라 스터디를 필터링한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "조건에 맞는 스터디 조회 성공"),
            @ApiResponse(responseCode = "204", description = "조건에 맞는 스터디가 없음"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "404", description = "사용자 ID를 찾을 수 없음")
    })
    @GetMapping("/filterByTagAndTime")
    public ResponseEntity<?> filterByTagAndTime(@PathVariable Long userId, @RequestParam String tagContent, @RequestParam Day preferredDay, @RequestParam String preferredStartTime, @RequestParam String preferredEndTime) {
        List<Study> matchingStudies = calendarService.findMatchingStudyGroups(userId, tagContent, preferredDay, LocalTime.parse(preferredStartTime), LocalTime.parse(preferredEndTime));
        if (matchingStudies.isEmpty()) {
            return ResponseEntity.ok("조건에 맞는 스터디가 없습니다");
        }
        return ResponseEntity.ok(matchingStudies);
    }
}
