package com.example.FileService.Utils;

import lombok.extern.slf4j.Slf4j;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.nio.charset.StandardCharsets;
import java.util.Comparator;
import java.util.stream.Stream;
@Slf4j
public class FileSystemUtils  {
    public static File createDirectory(String path) {
        try {
            Path fspath = Paths.get(path);
            if(!Files.exists(fspath)) return Files.createDirectories(fspath).toFile();
        } catch (IOException e) {
            log.error("Error creating directory", e);
        }
        return null;
    }
    
    public static void deleteDirectory(String path) {
        Path directory = Paths.get(path);
        if(!Files.exists(directory)) return;
        try (Stream<Path> paths = Files.walk(directory)) {
            paths.sorted(Comparator.reverseOrder())
                    .forEach(p -> {
                        try {
                            Files.delete(p);
                        } catch (IOException e) {
                            log.error("Error deleting directory", e);
                        }
                    });
        } catch (IOException e) {
            log.error("Error deleting directory", e);
        }
    }


    
    public static void createFile(String path) {
        try {
            Path fspath = Paths.get(path);
            if(!Files.exists(fspath)) Files.createFile(fspath);
        } catch (IOException e) {
            log.error("Error creating file", e);
        }
    }
    
    public static void deleteFile(String path) {
        try {
            Path fspath = Paths.get(path);
            if(Files.exists(fspath)) Files.deleteIfExists(fspath);
        } catch (IOException e) {
            log.error("Error deleting file", e);
        }
    }
    
    public static void writeToFile(String path, String content) {
        try {
            Files.write(Paths.get(path), content.getBytes(StandardCharsets.UTF_8));
        } catch (IOException e) {
            log.error("Error writing to file", e);
        }
    }
    
    public static String readFromFile(String path) {
        try {
            return new String(Files.readAllBytes(Paths.get(path)), StandardCharsets.UTF_8);
        } catch (IOException e) {
            log.error("Error reading from file", e);
            return null;
        }
    }
    
    public static void copyFile(String sourcePath, String destinationPath) {
        try {
            Files.copy(Paths.get(sourcePath), Paths.get(destinationPath), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("Error copying file", e);
        }
    }
    
    public static void moveFile(String sourcePath, String destinationPath) {
        try {
            Files.move(Paths.get(sourcePath), Paths.get(destinationPath), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            log.error("Error moving file", e);
        }
    }
    
    public static void copyDirectory(String sourcePath, String destinationPath) {
        Path sourceDir = Paths.get(sourcePath);
        Path destinationDir = Paths.get(destinationPath);

        try (Stream<Path> paths = Files.walk(destinationDir)) {
           paths.forEach(source -> {
                        Path destination = destinationDir.resolve(sourceDir.relativize(source));
                        try {
                            Files.copy(source, destination, StandardCopyOption.REPLACE_EXISTING);
                        } catch (IOException e) {
                            log.error("Error copying directory", e);
                        }
                    });
        } catch (IOException e) {
            log.error("Error copying directory", e);
        }
    }
    
    public static void moveDirectory(String sourcePath, String destinationPath) {
        copyDirectory(sourcePath, destinationPath);
        deleteDirectory(sourcePath);
    }

    public static boolean resourceExists(String path) {
        return Files.exists(Paths.get(path));
    }

    public static File getResource(String path) {
        return Paths.get(path).toFile();

    }
}
