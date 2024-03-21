package com.example.FileService;


import com.example.FileService.Utils.FileSystemUtils;
import com.example.FileService.Utils.GitUtils;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.Repository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class FileServiceGitTests {
    @Test
    void createRepository() {
        Repository repository = GitUtils.createRepository("test");
        System.out.println(repository.isBare());
        System.out.println(repository.getDirectory());
        assert(repository != null);
        assert repository.getDirectory().exists();
    }

    @Test
    void openExistingRepository() {
        Repository repository =  GitUtils.openExistingRepository("test\\.git");
        assert(repository != null);
        assert repository.getDirectory().exists();
    }

    @Test
    void deleteRepository() {
        GitUtils.deleteRepository("test");
    }

    @Test
    void addFile() {
        FileSystemUtils.createDirectory("test");
        FileSystemUtils.createFile("test/file.txt");
        FileSystemUtils.writeToFile("test/file.txt", "Hello, World!");
        Repository repository =  GitUtils.openExistingRepository("test\\.git"); // .git is nedeed to avoid bare repository
        GitUtils.addFile(repository, "test/file.txt");
    }

    @Test
    void commitFile() {
        Repository repository =  GitUtils.openExistingRepository("test\\.git");
        FileSystemUtils.writeToFile("test/file.txt", "Hello, World!");
        GitUtils.addFile(repository, "test/file.txt");
        GitUtils.commit(repository, "Added file.txt");
    }

    @Test
    void commitDiff() {
        Repository repository = GitUtils.openExistingRepository("test\\.git");
        try {
            FileSystemUtils.writeToFile("test/file.txt", "Hello, World!\nThis is a new line!");
            GitUtils.addFile(repository, "test/file.txt");
            GitUtils.commit(repository, "Changed file.txt");

            ObjectId oldHead = repository.resolve("HEAD^");
            ObjectId head = repository.resolve("HEAD");
            if(oldHead == null || head == null) throw new RuntimeException("Could not resolve HEAD");

            GitUtils.diffFile(repository, oldHead, head);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void commitHistory() {
        Repository repository = GitUtils.openExistingRepository("test\\.git");
        GitUtils.commitHistory(repository);
    }



}


