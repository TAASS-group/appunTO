package com.appunto.fileService.Controllers;

import com.appunto.fileService.DTO.UpdateFileDTO;
import com.appunto.fileService.Models.Commit;
import com.appunto.fileService.Models.MyFile;
import com.appunto.fileService.Services.FileService;
import com.appunto.fileService.Utils.FileSystemUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path = "api/v1/file")
public class FileController {
    private final FileService fileService;

    @Autowired
    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping(path = "/downloadpdf/{id}")
    public ResponseEntity<Resource> downloadPdf(@PathVariable("id") String id) {
        try {
            return fileService.downloadFile(id, MediaType.APPLICATION_PDF);
        } catch (Exception e) {
            e.printStackTrace();
        }
    return null;

    }

    @GetMapping(path = "/downloadmd/{id}")
    public ResponseEntity<Resource> downloadMd(@PathVariable("id") String id) {
        try {
            return fileService.downloadFile(id, MediaType.TEXT_MARKDOWN);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping(path = "/getFileContent/{courseId}")
    public ResponseEntity<String> getFileContent(@PathVariable("courseId") String courseId) {
        try {
            MyFile file = fileService.getFileByCourseId(courseId);
            if (file == null) return ResponseEntity.notFound().build();

            String path = file.getPath();
            String content = FileSystemUtils.readFromFile(path);
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping(path = "/addfile/{courseId}")
    public ResponseEntity<String> addFile(@PathVariable("courseId") String courseId) {
        try {
            String path = fileService.addFile(courseId).getPath();
            String content = FileSystemUtils.readFromFile(path);
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @PostMapping(path = "/updatefile/{courseId}")
    public ResponseEntity<Commit> updateFile(@PathVariable("courseId") String courseId, @RequestBody UpdateFileDTO updateFileDTO) {
        try {
            MyFile file = fileService.getFileByCourseId(courseId);
            if (file == null) return ResponseEntity.notFound().build();


            String message = updateFileDTO.getMessage();
            String author = updateFileDTO.getAuthor();
            String content = updateFileDTO.getContent();

            Commit commit = fileService.updateFile(file.getId(), message, author, content);
            if(commit == null) return ResponseEntity.notFound().build();


            return ResponseEntity.ok(commit);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
