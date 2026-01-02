package com.kh.foodding.createProject.model.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.kh.foodding.common.FileStorageUtils;

/**
 * 프로젝트 생성 중 업로드되는 에셋(썸네일 등)을 로컬에 저장하는 단순 서비스.
 */
@Service
public class ProjectAssetStorageService {

    private final Path thumbnailRoot;
    private final Path storyImageRoot;

    public ProjectAssetStorageService() {
        Path baseUploads = FileStorageUtils.getUploadsDir();
        this.thumbnailRoot = createDirectory(baseUploads.resolve("thumbnails"));
        this.storyImageRoot = createDirectory(baseUploads.resolve("stories"));
    }

    private Path createDirectory(Path path) {
        try {
            Files.createDirectories(path);
        } catch (Exception e) {
            throw new IllegalStateException("에셋 디렉토리를 생성할 수 없습니다.", e);
        }
        return path;
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

        return "/uploads/thumbnails/" + filename;
    }

    public String storeStoryImage(MultipartFile image) {
        if (image == null || image.isEmpty()) {
            throw new IllegalArgumentException("이미지 파일이 비어 있습니다.");
        }

        String extension = StringUtils.getFilenameExtension(image.getOriginalFilename());
        String filename = UUID.randomUUID().toString().replaceAll("-", "");
        if (StringUtils.hasText(extension)) {
            filename += "." + extension;
        }

        Path target = this.storyImageRoot.resolve(filename);

        try {
            image.transferTo(target.toFile());
        } catch (IOException e) {
            throw new RuntimeException("스토리 이미지 저장 중 오류가 발생했습니다.", e);
        }

        return "/uploads/stories/" + filename;
    }
}
