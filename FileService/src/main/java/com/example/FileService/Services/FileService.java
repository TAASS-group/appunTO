package com.example.FileService.Services;

import com.example.FileService.Models.MyFile;
import com.example.FileService.Repository.FileRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@AllArgsConstructor
@Service
public class FileService {

    private final FileRepository fileRepository;

    public List<MyFile> getFiles() {
        return fileRepository.findAll();
    }

    public MyFile addFile(MyFile file) {
        return fileRepository.insert(file);
    }

    public void deleteAllFiles() {
        fileRepository.deleteAll();
    }

    public MyFile getFileById(String id) {
        return fileRepository.findById(id).orElse(null);
    }

    public void deleteFileById(String id) {
        fileRepository.deleteById(id);
    }

    public MyFile updateFile(MyFile file) {
        return fileRepository.save(file);
    }


    public ResponseEntity<Resource> downloadFile(String id,MediaType mediaType) throws Exception {
        Path path = Paths.get(fileRepository.findById(id).get().getPath());
        Resource file = new UrlResource(path.toUri());
        if (file.exists() || file.isReadable()) {
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"")
                    .contentType(mediaType)
                    .body(file);
        } else {
            throw new Exception("Il file non esiste o non è leggibile");
        }
    }
}
