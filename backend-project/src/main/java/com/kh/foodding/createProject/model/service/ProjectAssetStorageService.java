package com.kh.foodding.createProject.model.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

/**
 * 프로젝트 생성 중 업로드되는 에셋(썸네일 등)을 로컬에 저장하는 단순 서비스.
 */
@Service
public class ProjectAssetStorageService {

    private static final String DEFAULT_THUMBNAIL_DIR = "uploads/thumbnails";

    private final Path thumbnailRoot;

    public ProjectAssetStorageService() {
        this(DEFAULT_THUMBNAIL_DIR);
    }

    ProjectAssetStorageService(String thumbnailDir) {
        this.thumbnailRoot = Paths.get(System.getProperty("user.dir"), thumbnailDir).toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.thumbnailRoot);
        } catch (Exception e) {
            throw new IllegalStateException("썸네일 디렉토리를 생성할 수 없습니다.", e);
        }
    }

    public String storeThumbnail(MultipartFile thumbnail) {
        if (thumbnail == null || thumbnail.isEmpty()) {
            throw new IllegalArgumentException("썸네일 파일이 비어 있습니다.");
        }

        String extension = StringUtils.getFilenameExtension(thumbnail.getOriginalFilename());
        String filename = UUID.randomUUID().toString().replaceAll("-", "");
        if (StringUtils.hasText(extension)) {
            filename += "." + extension;
        }

        Path target = this.thumbnailRoot.resolve(filename);

        try {
            thumbnail.transferTo(target);
        } catch (IOException e) {
            throw new RuntimeException("썸네일 저장 중 오류가 발생했습니다.", e);
        }

        return target.toString();
    }
}
