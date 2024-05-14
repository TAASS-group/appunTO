package com.appunto.fileservice;


import com.appunto.fileService.Utils.FileSystemUtils;
import com.appunto.fileService.Utils.GitUtils;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.Repository;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

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
        /*try {*/
            // FileSystemUtils.writeToFile("test/file.txt", "Hello, World!\nThis is a new line!\nnew line");
            // GitUtils.addFile(repository, "test/file.txt");
            // GitUtils.commit(repository, "Changed file.txt");

            // ObjectId oldHead = repository.resolve("HEAD^");
            // ObjectId head = repository.resolve("HEAD");
            ObjectId oldHead = ObjectId.fromString("6f7b96253f21e58f77daca5aed96655ced186133");
            ObjectId head = ObjectId.fromString("d78dffc04bb52e2b49794da5e8c3979c6128391a");
            System.out.println(oldHead.getName());
            System.out.println(head);
            if(oldHead == null || head == null) throw new RuntimeException("Could not resolve HEAD");

            GitUtils.diffFile(repository, oldHead, head);
        /*} catch (IOException e) {
            throw new RuntimeException(e);
        }*/
    }

    @Test
    void commitHistory() {
        Repository repository = GitUtils.openExistingRepository("test\\.git");
        GitUtils.commitHistory(repository);
    }



}


