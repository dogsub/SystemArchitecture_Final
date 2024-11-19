package gcu.backend.dreank.controller.user;

import gcu.backend.dreank.domain.study.Study;
import gcu.backend.dreank.domain.study.enums.StudyStatus;
import gcu.backend.dreank.dto.request.study.StudyCreateRequest;
import gcu.backend.dreank.dto.request.study.StudyCreateResponse;
import gcu.backend.dreank.dto.request.study.StudyResponse;
import gcu.backend.dreank.dto.request.study.StudyUpdateRequest;
import gcu.backend.dreank.dto.request.login.SessionConst;
import gcu.backend.dreank.dto.request.login.SessionInfo;
import gcu.backend.dreank.service.StudyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/study")
@Slf4j
public class StudyController {
    private final StudyService studyService;

    //Create
    //스터디 생성
    @Operation(summary = "스터디 생성 API", description = "사용자(리더)가 스터디를 생성한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스터디 생성 성공"),
            @ApiResponse(responseCode = "400", description = "잘못된 요청 데이터"),
            @ApiResponse(responseCode = "404", description = "리더 ID를 찾을 수 없음")
    })
    @PostMapping("/post/{leader}")
    @ResponseBody
    public StudyCreateResponse createStudy(@PathVariable("leader") Long leader, @RequestBody StudyCreateRequest request) {
        request.setLeader(leader);
        return studyService.save(request.toEntity());
    }

    //Read
    //스터디 전체 조회
    @Operation(summary = "스터디 전체 조회 API", description = "모든 스터디를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스터디 전체 조회 성공"),
            @ApiResponse(responseCode = "404", description = "스터디 데이터를 찾을 수 없음")
    })
    @GetMapping(value = "/search")
    @ResponseBody
    public List<Study> getStudy() {
        return studyService.find();
    }

    //스터디 id 통해 모임 찾기
    @Operation(summary = "모임 찾기 by 스터디 ID API", description = "스터디 ID를 통해 모임을 찾는다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스터디 조회 성공"),
            @ApiResponse(responseCode = "404", description = "스터디 ID를 찾을 수 없음")
    })
    @GetMapping(value = "/search/{id}")
    @ResponseBody
    public StudyResponse getStudy(@PathVariable("id") Long id) {
        return studyService.findById(id);
    }

    //스터디 name 통해 모임 찾기
    @Operation(summary = "모임 찾기 by 스터디 이름 API", description = "스터디 이름을 통해 모임을 찾는다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스터디 조회 성공"),
            @ApiResponse(responseCode = "404", description = "스터디 이름을 찾을 수 없음")
    })
    @GetMapping(value = "/search/{name}")
    @ResponseBody
    public List<StudyResponse> getStudy(@PathVariable("name") String name) {
        return studyService.findByName(name);
    }

    //스터디 태그로 가져오기
    @Operation(summary = "스터디 태그로 가져오기 API", description = "스터디의 태그를 통해 모임을 찾는다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스터디 조회 성공"),
            @ApiResponse(responseCode = "404", description = "해당 태그를 가진 스터디를 찾을 수 없음")
    })
    @GetMapping(value = "/search/tag")
    @ResponseBody
    public List<Study> getStudyByTag(@RequestParam("tag") String tag) {
        return studyService.findByTag(tag);
    }

    //내가 만든 스터디
    @Operation(summary = "내가 만든 스터디 조회 API", description = "내가 만든 스터디를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "내가 만든 스터디 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자 ID를 찾을 수 없음")
    })
    @GetMapping(value="/search/my/{userid}")
    @ResponseBody
    public List<Study> getMakeStudy(@PathVariable("userid") Long userid) {
        return studyService.findMakeStudy(userid);
    }

    //내가 가입한 스터디
    @Operation(summary = "내가 가입한 스터디 조회 API", description = "내가 가입한 스터디를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "내가 가입한 스터디 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자 ID를 찾을 수 없음")
    })
    @GetMapping(value = "/search/study/{userid}")
    @ResponseBody
    public HashSet<Study> getMyStudy(@PathVariable("userid") Long userid) {
        return studyService.findMyStudy(userid);
    }

    //신청한 스터디
    @Operation(summary = "내가 신청한 스터디 조회 API", description = "내가 신청한 스터디를 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "내가 신청한 스터디 조회 성공"),
            @ApiResponse(responseCode = "404", description = "사용자 ID를 찾을 수 없음")
    })
    @GetMapping(value="/search/wating/{userid}")
    @ResponseBody
    public HashSet<Study> getWatingStudy(@PathVariable("userid") Long userid) {
        return studyService.findWatingStudy(userid);
    }

    //스터디 랭킹 조회
    @Operation(summary = "스터디 랭킹 조회 API", description = "스터디의 랭킹을 조회한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스터디 랭킹 조회 성공"),
            @ApiResponse(responseCode = "404", description = "스터디 랭킹을 찾을 수 없음")
    })
    @GetMapping(value = "/search/rank")
    @ResponseBody
    //response에서 필요한 정보만 따오기
    public List<StudyResponse> getStudyByRank() {
        return studyService.findThreeRank();
    }

    //모집중,마감여부 필터링
    @Operation(summary = "스터디의 모집 중/마감여부 필터링 API", description = "스터디들의 상태: 모집중or마감여부를 필터링한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스터디 상태별 조회 성공"),
            @ApiResponse(responseCode = "404", description = "스터디 상태를 찾을 수 없음")
    })
    @GetMapping(value = "/{status}")
    @ResponseBody
    public List<StudyResponse> getStudyByStatus(@PathVariable("status") StudyStatus status) {
        return studyService.findByStatus(status);
    }


    //Update
    //구성원 승인 - joinstudy 수정 필요
    @Operation(summary = "구성원 승인 API", description = "사용자(리더)가 자신의 스터디에 신청한 다른 사용자를 승인해준다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "구성원 승인 성공"),
            @ApiResponse(responseCode = "404", description = "스터디 ID 또는 사용자 ID를 찾을 수 없음")
    })
    @PatchMapping("/{studyid}/accept/{userid}")
    @ResponseBody
    public StudyResponse update(@PathVariable Long studyid, @PathVariable Long userid) {
        return studyService.accept(studyid, userid);
    }

    //스터디 가입
    @Operation(summary = "다른 사용자가 만든 스터디 가입 API", description = "다른 사용자가 만든 스터디에 가입한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스터디 가입 성공"),
            @ApiResponse(responseCode = "404", description = "스터디 ID 또는 사용자 ID를 찾을 수 없음")
    })
    @PostMapping(value = "/{studyid}/apply/{userid}", produces = "application/json")
    @ResponseBody
    public StudyResponse apply(@PathVariable Long studyid, @PathVariable Long userid) {
        return studyService.apply(studyid, userid);
    }

    @Operation(summary = "스터디 상태 업데이트", description = "특정 스터디의 상태를 완료로 업데이트한다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스터디 상태 업데이트 성공"),
            @ApiResponse(responseCode = "404", description = "스터디 ID를 찾을 수 없음")
    })
    @PatchMapping("/{studyid}/status")
    @ResponseBody
    public StudyResponse updateStatus(@PathVariable Long studyid) {
        return studyService.completeStatus(studyid);
    }

    //delete
    //@DeleteMapping("/{id}")
    //public void delete(@PathVariable Long id) {
     //   return studyService.delete();
    //}


}
