package com.appunto.fileService.Controllers;

import com.appunto.fileService.DTO.*;
import com.appunto.fileService.Models.Commit;
import com.appunto.fileService.Models.MyFile;
import com.appunto.fileService.Services.FileService;
import com.appunto.fileService.Utils.FileSystemUtils;
import com.appunto.fileService.Utils.ListCommitFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

// @CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
@RestController
@RequestMapping(path = "api/v1/file")
public class FileController {
    private final FileService fileService;

    private RestTemplate restTemplate;

    @Autowired
    public FileController(FileService fileService, RestTemplate restTemplate) {
        this.fileService = fileService;
        this.restTemplate = restTemplate;
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

    @GetMapping(path = "/getUserFiles/{userId}")
    public ResponseEntity<UserFilesDTO> getUserFiles(@PathVariable("userId") String userId) {
        try {
            UserDTO user = restTemplate.getForObject("http://userservice/user/info?uid=" + userId, UserDTO.class);
            if(user == null) return null;
            List<FileContentCourseDTO> favourites = new ArrayList<>();
            List<RecentChangedDTO> changed = new ArrayList<>();
            UserFilesDTO userFilesDTO = new UserFilesDTO();
            userFilesDTO.setUid(user.getUid());
            boolean hasFavorites = !user.getEnrolledCourses().isEmpty();
            userFilesDTO.setHasFavorites(hasFavorites);

            for (Long courseId : user.getEnrolledCourses()) {
                MyFile file = fileService.getFileByCourseId(courseId.toString());
                if(file == null) continue;
                FileContentCourseDTO fileContentCourseDTO = new FileContentCourseDTO();
                fileContentCourseDTO.setFile(file);
                fileContentCourseDTO.setCourseName("Course Name");
                String content = FileSystemUtils.readFromFile(file.getPath());
                fileContentCourseDTO.setContent(content);
                favourites.add(fileContentCourseDTO);
                List<Commit> commits = fileService.getCommits(file.getId());
                if(commits.isEmpty()) continue;
                RecentChangedDTO recentChangedDTO = new RecentChangedDTO();
                UserDTO commitUser = restTemplate.getForObject("http://userservice/user/info?uid=" + commits.getFirst().getAuthor(), UserDTO.class);
                if(commitUser == null) return null;
                recentChangedDTO.setCommit(commits.getFirst());
                recentChangedDTO.setCourseName("Course Name");
                recentChangedDTO.setUser(commitUser);
                List<String> authors = new ArrayList<>();
                for (Commit commit : commits) {
                    UserDTO author = restTemplate.getForObject("http://userservice/user/info?uid=" + commit.getAuthor(), UserDTO.class);
                    authors.add(author.getPhotoUrl());
                }

                recentChangedDTO.setAuthors(authors);
                changed.add(recentChangedDTO);

            }

            if (!hasFavorites){
                List<MyFile> allFiles = fileService.getFiles();

                for (MyFile file : allFiles) {
                    FileContentCourseDTO fileContentCourseDTO = new FileContentCourseDTO();
                    fileContentCourseDTO.setFile(file);
                    fileContentCourseDTO.setCourseName("Course Name");
                    String content = FileSystemUtils.readFromFile(file.getPath());
                    fileContentCourseDTO.setContent(content);
                    favourites.add(fileContentCourseDTO);
                    List<Commit> commits = fileService.getCommits(file.getId());
                    if(commits.isEmpty()) continue;
                    RecentChangedDTO recentChangedDTO = new RecentChangedDTO();
                    UserDTO commitUser = restTemplate.getForObject("http://userservice/user/info?uid=" + commits.getFirst().getAuthor(), UserDTO.class);
                    if(commitUser == null) return null;
                    recentChangedDTO.setCommit(commits.getFirst());
                    recentChangedDTO.setCourseName("Course Name");
                    recentChangedDTO.setUser(commitUser);
                    List<String> authors = new ArrayList<>();
                    for (Commit commit : commits) {
                        UserDTO author = restTemplate.getForObject("http://userservice/user/info?uid=" + commit.getAuthor(), UserDTO.class);
                        authors.add(author.getPhotoUrl());
                    }

                    recentChangedDTO.setAuthors(authors);
                    changed.add(recentChangedDTO);
                }

            }

            userFilesDTO.setFavourites(favourites);
            changed.sort( (a, b) -> b.getCommit().compareTo(a.getCommit()));
            userFilesDTO.setRecentChanged(changed);


            return ResponseEntity.ok(userFilesDTO);
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
    public ResponseEntity<MyFile> addFile(@PathVariable("courseId") String courseId) {
        try {
            MyFile file = fileService.addFile(courseId);
            if(file == null) return ResponseEntity.notFound().build();
            String uid = "kDrhnFfbJFQBCjlltn40lqGPewG2";
            String res = restTemplate.getForObject("http://userservice/user/info?uid=" + uid, String.class);
            System.out.println(res);
            return ResponseEntity.ok(file);
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
            String title = updateFileDTO.getTitle();
            String message = updateFileDTO.getMessage();
            String author = updateFileDTO.getAuthor();
            String content = updateFileDTO.getContent();

            Commit commit = fileService.updateFile(file.getId(), title, message, author, content);
            if(commit == null) return ResponseEntity.notFound().build();

            return ResponseEntity.ok(commit);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @GetMapping(path = "/getCommmits/{courseId}")
    public ResponseEntity<List<CommitWithDiff>> getCommits(@PathVariable("courseId") String courseId) {
        MyFile file = fileService.getFileByCourseId(courseId);
        if(file == null) return ResponseEntity.notFound().build();

        List<Commit> commits = fileService.getCommits(file.getId());
        List<CommitWithDiff> commitsWithDiff = new ArrayList<>();

        if(commits.size() == 1) {
            commitsWithDiff.add(new CommitWithDiff(commits.get(0), ""));
            return ResponseEntity.ok(commitsWithDiff);
        }

        for (int i=0; i < commits.size() -1; i++) {
            String currentCommitId = commits.get(i).getId();
            String nextCommitId = commits.get(i+1).getId();
            String diff = fileService.getDiff(file.getId(), currentCommitId, nextCommitId);
            commitsWithDiff.add(new CommitWithDiff(commits.get(i), diff));
        }
        return ResponseEntity.ok(commitsWithDiff);
    }

    @GetMapping(path = "/getDiff")
    public ResponseEntity<String> getDiff(@RequestParam("courseId") String courseId, @RequestParam("previusCommitId") String commitId1, @RequestParam("newCommitId") String commitId2) {
        MyFile file = fileService.getFileByCourseId(courseId);
        if(file == null) return ResponseEntity.notFound().build();

        String diff = fileService.getDiff(file.getId(), commitId1, commitId2);
        if(diff == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(diff);
    }

}
