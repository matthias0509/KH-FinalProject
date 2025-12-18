package com.kh.foodding.createProject.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.kh.foodding.createProject.model.service.ProjectAssetStorageService;
import com.kh.foodding.createProject.model.service.ProjectService;
import com.kh.foodding.createProject.model.vo.Project;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;



@Slf4j
@RequiredArgsConstructor
@Tag(name="CreateProjectController", description="프로젝트 생성용 Controller API입니다.")
@CrossOrigin(origins="http://localhost:5173")
@RestController
@RequestMapping("create")
public class ProjectController {
    
    private final ProjectService ProjectService;
    private final ProjectAssetStorageService projectAssetStorageService;



    @Operation(summary="프로젝트 제출 메소드", description="프로젝트 제출 시 상품 테이블에 저장됩니다.")
    @PostMapping("insert")
    public String insertProject(@RequestBody Project p) {

        int result = ProjectService.insertProject(p);

        return (result>0)? "제출 완료했습니다. " : "제출 실패했습니다.";
    }
    

     @Operation(summary="프로젝트 임시 저장 메소드", description="프로젝트 임시 저장 시 임시 테이블에 저장됩니다.")
    @PostMapping("imsi")
    public String imsiProject(@RequestBody Project p) {

        int result = ProjectService.imsiProject(p);

        return (result>0)? "임시저장 완료했습니다. " : "임시저장 실패했습니다.";
    }
    

    @GetMapping("drafts")
    public ArrayList<Project> selectProject(@RequestParam int userNo){

        return ProjectService.selectProject(userNo);
    } 

    @GetMapping("drafts/{tempNo}")
    public Project selectProjectDetail(@PathVariable long tempNo, @RequestParam int userNo){

        return ProjectService.selectProjectById(userNo, tempNo);
    }

    @PostMapping("thumbnail")
    public Map<String, String> uploadThumbnail(@RequestPart("file") MultipartFile file) {

        String relativePath = projectAssetStorageService.storeThumbnail(file);
        String publicUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path(relativePath)
                .toUriString();

        Map<String, String> response = new HashMap<>();
        response.put("path", relativePath);
        response.put("url", publicUrl);
        return response;
    }
    

    // 삭제 기능
    @PatchMapping("delete/{tempNo}")
    public String deleteProject(@PathVariable long tempNo, @RequestParam int userNo) {
        int result = ProjectService.deleteProject(userNo, tempNo);

        return (result>0)?"프로젝트 삭제 성공" : "프로젝트 삭제 실패";
    }
    
}
