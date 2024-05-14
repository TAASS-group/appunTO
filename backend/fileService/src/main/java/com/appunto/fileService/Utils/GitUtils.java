package com.appunto.fileService.Utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.diff.DiffFormatter;
import org.eclipse.jgit.lib.*;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevTree;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.treewalk.AbstractTreeIterator;
import org.eclipse.jgit.treewalk.CanonicalTreeParser;

@Slf4j
public class GitUtils {
    public static Repository createRepository(String path) {
        try {
            Repository repository = FileRepositoryBuilder.create(new File(path, ".git"));
            repository.create();
            return repository;
        } catch (IOException e) {
            log.error("Error creating repository", e);
        }

        return null;
    }

    public static Repository openExistingRepository(String path) {
        try {
        File repoDir = FileSystemUtils.getResource(path);

        FileRepositoryBuilder builder = new FileRepositoryBuilder();
        return builder.setGitDir(repoDir)
                .readEnvironment() // scan environment GIT_* variables
                .findGitDir() // scan up the file system tree
                .build();

        } catch (IOException e) {
            log.error("Error opening repository", e);
        }
        return null;
    }

    public static void deleteRepository(String path) {
            FileSystemUtils.deleteDirectory(path);
    }


    public static void addFile(Repository repository, String filePath) {
        try {
            if (repository == null) {
                throw new IOException("Could not open repository at " + repository.getDirectory());
            }

            try (Git git = new Git(repository)) {
                File myFile = FileSystemUtils.getResource(filePath);
                System.out.println("Adding file " + myFile + " to repository at " + repository.getDirectory());
                if (!myFile.exists()) {
                    throw new IOException("File " + myFile + " does not exist");
                }

                // run the add-call
                git.add()
                        .addFilepattern(".")
                        .call();

                System.out.println("Added file " + myFile + " to repository at " + repository.getDirectory());
            }
        } catch (IOException | GitAPIException e) {
            log.error("Error adding file", e);
        }

    }

    public void removeFile(String repositoryPath, String filePath) {

    }

    public static ObjectId commit(Repository repository, String message) {
        try {
            if (repository == null) {
                throw new IOException("Could not open repository at " + repository.getDirectory());
            }

            try (Git git = new Git(repository)) {
                // and then commit the changes
                 RevCommit commit = git.commit()
                        .setMessage(message)
                        .call();
                 return commit.getId();
            }
        } catch (IOException | GitAPIException e) {
            log.error("Error adding file", e);
        }
        return null;
    }

    public static void commitHistory(Repository repository) {
        try (Git git = new Git(repository)) {
            Iterable<RevCommit> commits = git.log().all().call();
            int count = 0;
            for (RevCommit commit : commits) {
                System.out.println("LogCommit: " + commit);
                count++;
            }
            System.out.println(count);
        } catch (IOException | GitAPIException e) {
            log.error("Error getting commit history", e);
        }
    }

    public static String diffFile(Repository repository, ObjectId oldCommit, ObjectId newCommit) {
        try (RevWalk revWalk = new RevWalk(repository)) {

            RevCommit oldCommitObj = revWalk.parseCommit(oldCommit);
            RevCommit newCommitObj = revWalk.parseCommit(newCommit);

            try (Git git = new Git(repository)) {
                List<DiffEntry> diff = git.diff()
                        .setOldTree(prepareTreeParser(repository, oldCommitObj))
                        .setNewTree(prepareTreeParser(repository, newCommitObj))
                        .call();
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                StringBuilder diffText = new StringBuilder();
                try (DiffFormatter formatter = new DiffFormatter(out)) {
                    formatter.setRepository(repository);
                    formatter.setContext(0); // 0 = no context, only changed lines

                    for (DiffEntry entry : diff) {
                        formatter.format(entry);
                       //  String diffText = out.toString(StandardCharsets.UTF_8);
                        diffText.append(out.toString(StandardCharsets.UTF_8));
                        out.reset(); // clear the buffer for the next entry
                    }
                }
                return diffText.toString();
            }
        } catch (IOException | GitAPIException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static AbstractTreeIterator prepareTreeParser(Repository repository, RevCommit commit) throws IOException {
        try (RevWalk walk = new RevWalk(repository)) {
            RevTree tree = walk.parseTree(commit.getTree().getId());

            CanonicalTreeParser treeParser = new CanonicalTreeParser();
            try (ObjectReader reader = repository.newObjectReader()) {
                treeParser.reset(reader, tree.getId());
            }

            walk.dispose();
            return treeParser;
        }
    }

    public static void printDiff(DiffEntry diff) {
        System.out.printf("Diff: %-6s: %s%6s -> %6s: %s%n",
                diff.getChangeType(),
                diff.getDiffAttribute() != null ? diff.getDiffAttribute() + "-" : "",
                diff.getOldMode(), diff.getNewMode(),
                diff.getOldPath().equals(diff.getNewPath()) ? diff.getNewPath() : diff.getOldPath() + " -> " + diff.getNewPath());
    }


}
