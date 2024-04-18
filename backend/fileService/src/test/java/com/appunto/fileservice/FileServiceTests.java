package com.appunto.fileservice;

import com.appunto.fileService.Models.Commit;
import com.appunto.fileService.Models.MyFile;
import com.appunto.fileService.Services.FileService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FileServiceTests {
    private final FileService fileService;

    @Autowired
    public FileServiceTests(FileService fileService) {
        this.fileService = fileService;
    }
    @Test
    void addFile() {
        MyFile f = fileService.addFile("test1");
        assert (f != null);
    }

    @Test
    void updateFile(){
        MyFile f = fileService.addFile("test1");
        Commit commit = fileService.updateFile(f.getId(), "Updated note.md", "ME", "Hello, World!\n\nThis is a new line!");
        assert (commit != null);
    }

    @Test
    void getDiff() {
        MyFile f = fileService.addFile("test2");
        Commit commit1 = fileService.updateFile(f.getId(), "Updated note.md", "Me", "Hello, World!\n\nThis is a new line!");
        Commit commit2 = fileService.updateFile(f.getId(), "Updated note.md", "Me", "Hello, World!\n\nThis is a new line!\n\nThis is another new line!");
        String diff = fileService.getDiff(f.getId(), commit1.getId(), commit2.getId());
        System.out.println(diff);
        assert (diff != null);
    }


}
