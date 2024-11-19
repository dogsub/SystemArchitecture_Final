package gcu.backend.dreank.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;
import gcu.backend.dreank.domain.study.enums.Day;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CalendarRequest {

    @Schema(description = "User ID", example = "1")
    private Long userId;

    @Schema(description = "활동명", example = "영어 스터디하기")
    private String activityName;

    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime startTime;

    @DateTimeFormat(pattern = "HH:mm:ss")
    private LocalTime endTime;

    @Schema(description = "색상", example = "Blue")
    private String color;

    @Schema(description = "요일", example = "Mon")
    private Day dayOfWeek;
}