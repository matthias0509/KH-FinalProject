package com.kh.foodding.project.config;

import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class ProjectSchemaInitializer {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProjectSchemaInitializer(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostConstruct
    public void ensureColumns() {
        ensureRejectReasonColumn();
    }

    private void ensureRejectReasonColumn() {
        final String tableName = "PRODUCT";
        final String columnName = "REJECT_REASON";
        final String alterSql = "ALTER TABLE PRODUCT ADD (REJECT_REASON VARCHAR2(1000))";

        try {
            Integer exists = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM USER_TAB_COLUMNS WHERE TABLE_NAME = ? AND COLUMN_NAME = ?",
                Integer.class,
                tableName,
                columnName
            );

            if (exists != null && exists == 0) {
                jdbcTemplate.execute(alterSql);
                log.info("Added {} column to {} table for project review reasons.", columnName, tableName);
            }
        } catch (Exception ex) {
            log.warn("Failed to ensure {} column on {} table. Reason: {}", columnName, tableName, ex.getMessage());
        }
    }
}
