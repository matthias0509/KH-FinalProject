package com.kh.foodding.common.scheduler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import com.kh.foodding.admin.model.service.ProjectManagementService;

@Component
public class ProjectScheduler {

    @Autowired
    private ProjectManagementService projectService;

    // 매일 자정(00:00:00)에 실행
    @Scheduled(cron = "0 0 0 * * *") 
    public void updateProjectStatus() {
        System.out.println("[Scheduler] 프로젝트 마감 처리 시작...");
        
        // 1. 성공 처리 (기간 끝남 && 목표금액 달성)
        int successCount = projectService.updateProjectSuccess();
        
        // 2. 실패 처리 (기간 끝남 && 목표금액 미달)
        int failCount = projectService.updateProjectFail();
        
        System.out.println("[Scheduler] 성공 처리: " + successCount + "건 / 실패 처리: " + failCount + "건");
    }
}