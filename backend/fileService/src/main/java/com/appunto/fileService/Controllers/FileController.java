package com.appunto.fileService.Controllers;

import com.appunto.fileService.Services.FileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
