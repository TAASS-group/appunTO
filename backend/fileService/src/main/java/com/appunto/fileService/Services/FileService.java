package com.appunto.fileService.Services;

import com.appunto.fileService.Models.Commit;
import com.appunto.fileService.Models.MyFile;
import com.appunto.fileService.Repository.CommitRepository;
import com.appunto.fileService.Repository.FileRepository;
import com.appunto.fileService.Utils.FileSystemUtils;
import com.appunto.fileService.Utils.GitUtils;
import lombok.AllArgsConstructor;
import org.eclipse.jgit.lib.ObjectId;
import org.eclipse.jgit.lib.Repository;
import org.springframework.stereotype.Service;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@Service
public class FileService {

    private final FileRepository fileRepository;
    private final CommitRepository commitRepository;

    public List<MyFile> getFiles() {
        return fileRepository.findAll();
    }

    public MyFile addFile(String courseId) {
        if(!FileSystemUtils.getResource(courseId).exists()) {
            Repository repository =  GitUtils.createRepository(courseId);
            String path = courseId + "/note.md";

            FileSystemUtils.createFile(path);
            FileSystemUtils.writeToFile(path, "Hello, World!");
            GitUtils.addFile(repository, path);
            GitUtils.commit(repository, "Added note.md");

            MyFile file = new MyFile(courseId, path);
            return fileRepository.insert(file);

            }
        return null;
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
    public Commit updateFile(String fileId, String message, String author,  String text) {
        MyFile file = fileRepository.findById(fileId).orElseThrow(() -> new IllegalArgumentException("Invalid file ID: " + fileId));
        return updateFile(file, message, author, text);
    }
    private Commit updateFile(MyFile file, String message, String author, String text) {
        String path = file.getCourseId();
        if(!FileSystemUtils.getResource(path).exists()) {
           return null;
        }
        Repository repository = GitUtils.openExistingRepository(path + "/.git");
        FileSystemUtils.writeToFile(path + "/note.md", text);

        GitUtils.addFile(repository, path + "/note.md");
        ObjectId commitid =  GitUtils.commit(repository, message);
        if(commitid == null) {
            return null;
        }

        Commit commit = new Commit(message, new Date(), author, file);
        commit.setGitCommitId(commitid.getName());

        return commitRepository.save(commit);
    }


    public ResponseEntity<Resource> downloadFile(String id, MediaType mediaType) throws Exception {
        String pathString = fileRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Invalid file ID: " + id)).getCourseId();
        Path path = Paths.get(pathString);
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

    public String getDiff(String fileId, String selectedCommitId, String previousCommitId) {
        MyFile file = fileRepository.findById(fileId).orElseThrow(() -> new IllegalArgumentException("Invalid file ID: " + fileId));
        Commit selected = commitRepository.findById(selectedCommitId).orElseThrow(() -> new IllegalArgumentException("Invalid commit ID: " + selectedCommitId));
        Commit previous = commitRepository.findById(previousCommitId).orElseThrow(() -> new IllegalArgumentException("Invalid commit ID: " + previousCommitId));
        return getDiff(file, selected, previous);
    }

    public String getDiff(MyFile file, Commit selected, Commit previous) {
        String path = file.getCourseId();
        if(!FileSystemUtils.getResource(path).exists()) {
           return null;
        }
        Repository repository = GitUtils.openExistingRepository(path + "/.git");
        return GitUtils.diffFile(repository, ObjectId.fromString(previous.getGitCommitId()), ObjectId.fromString(selected.getGitCommitId()));
    }
}
