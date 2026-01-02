package com.kh.foodding.common;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public final class FileStorageUtils {

    private static final String ENV_KEY = "FOODDING_STORAGE_DIR";
    private static final String PROP_KEY = "foodding.storage.baseDir";
    private static final Path BASE_DIR = initBaseDir();

    private FileStorageUtils() {
    }

    private static Path initBaseDir() {
        String propertyDir = System.getProperty(PROP_KEY);
        if (propertyDir != null && !propertyDir.trim().isEmpty()) {
            return createDirectory(Paths.get(propertyDir.trim()));
        }

        String envDir = System.getenv(ENV_KEY);
        if (envDir != null && !envDir.trim().isEmpty()) {
            return createDirectory(Paths.get(envDir.trim()));
        }

        Path defaultDir = Paths.get(System.getProperty("user.home"), "foodding");
        return createDirectory(defaultDir);
    }

    private static Path createDirectory(Path path) {
        try {
            Files.createDirectories(path);
        } catch (Exception ignored) {
        }
        return path;
    }

    public static Path getBaseDir() {
        return BASE_DIR;
    }

    public static Path getUploadsDir() {
        return createDirectory(BASE_DIR.resolve("uploads"));
    }

    public static Path getProfileImagesDir() {
        return createDirectory(BASE_DIR.resolve("profile_images"));
    }
}
