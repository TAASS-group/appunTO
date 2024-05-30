package com.appunto.fileService.Utils;

import com.appunto.fileService.Models.Commit;
import com.appunto.fileService.Models.MyFile;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

class CommitFile {
    private MyFile myFile;
    private Commit commit;

    public CommitFile(MyFile myFile, Commit commit) {
        this.myFile = myFile;
        this.commit = commit;
    }

    public MyFile getMyFile() {
        return myFile;
    }

    public void setMyFile(MyFile myFile) {
        this.myFile = myFile;
    }

    public Commit getCommit() {
        return commit;
    }

    public void setCommit(Commit commit) {
        this.commit = commit;
    }

    //comparator for sorting
    public int compareTo(CommitFile commitFile) {
        return this.commit.compareTo(commitFile.getCommit());
    }

}
@Slf4j
public class ListCommitFile {
    private List<CommitFile> commitFiles;

    public ListCommitFile() {
        this.commitFiles = new ArrayList<>();
    }

    public List<CommitFile> getCommitFiles() {
        return commitFiles;
    }

    public void add(Commit commit, MyFile myFile) {
        commitFiles.add(new CommitFile(myFile, commit));
    }

    public int size() {
        return commitFiles.size();
    }

    public void sort() {
        commitFiles.sort(CommitFile::compareTo);
    }
}
