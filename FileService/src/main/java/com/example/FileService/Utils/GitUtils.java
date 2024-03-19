package com.example.FileService.Utils;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.eclipse.jgit.api.Git;
import org.eclipse.jgit.api.errors.GitAPIException;
import org.eclipse.jgit.diff.DiffConfig;
import org.eclipse.jgit.diff.DiffEntry;
import org.eclipse.jgit.diff.DiffFormatter;
import org.eclipse.jgit.lib.*;
import org.eclipse.jgit.revwalk.FollowFilter;
import org.eclipse.jgit.revwalk.RevCommit;
import org.eclipse.jgit.revwalk.RevTree;
import org.eclipse.jgit.revwalk.RevWalk;
import org.eclipse.jgit.storage.file.FileRepositoryBuilder;
import org.eclipse.jgit.treewalk.AbstractTreeIterator;
import org.eclipse.jgit.treewalk.CanonicalTreeParser;
import org.eclipse.jgit.util.io.DisabledOutputStream;

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

    public static void commit(Repository repository, String message) {
        try {
            if (repository == null) {
                throw new IOException("Could not open repository at " + repository.getDirectory());
            }

            try (Git git = new Git(repository)) {
                // and then commit the changes
                git.commit()
                        .setMessage(message)
                        .call();

                System.out.println("Committed file to repository at " + repository.getDirectory());
            }
        } catch (IOException | GitAPIException e) {
            log.error("Error adding file", e);
        }
    }

    public void getCommitHistory(String repositoryPath) {

    }

    public static void getDiff(Repository repository, ObjectId oldHead, ObjectId head) {
        // The {tree} will return the underlying tree-id instead of the commit-id itself!
        // For a description of what the carets do see e.g. http://www.paulboxley.com/blog/2011/06/git-caret-and-tilde
        // This means we are selecting the parent of the parent of the parent of the parent of current HEAD and
        // take the tree-ish of it


        // prepare the two iterators to compute the diff between
        try (ObjectReader reader = repository.newObjectReader()) {
            System.out.println("Printing diff between tree: " + oldHead + " and " + head);

            CanonicalTreeParser oldTreeIter = new CanonicalTreeParser();
            oldTreeIter.reset(reader, oldHead);

            CanonicalTreeParser newTreeIter = new CanonicalTreeParser();
            newTreeIter.reset(reader, head);

            // finally get the list of changed files
            try (Git git = new Git(repository)) {
                List<DiffEntry> diffs= git.diff()
                        .setNewTree(newTreeIter)
                        .setOldTree(oldTreeIter)
                        .call();
                System.out.println("Found: " + diffs.size() + " differences");
                for (DiffEntry diff : diffs) {
                    printDiff(diff);
                }
            } catch (GitAPIException e) {
                throw new RuntimeException(e);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    /*public static void diffFile(Repository repo, String oldCommit,
                                               String newCommit, String path) {
        Config config = new Config();
        config.setBoolean("diff", null, "renames", true);
        DiffConfig diffConfig = config.get(DiffConfig.KEY);
        try (Git git = new Git(repo)) {
            List<DiffEntry> diffList = git.diff().
                    setOldTree(prepareTreeParser(repo, oldCommit)).
                    setNewTree(prepareTreeParser(repo, newCommit)).
                    setPathFilter(FollowFilter.create(path, diffConfig)).
                    call();
            for (DiffEntry diff : diffList) {
                printDiff(diff);
            }
            System.out.println("Found: " + diffList.size() + " differences");

        } catch (IOException | GitAPIException e) {
            throw new RuntimeException(e);
        }
    }
    private static AbstractTreeIterator prepareTreeParser(Repository repository, String objectId) throws IOException {
        // from the commit we can build the tree which allows us to construct the TreeParser
        //noinspection Duplicates
        try (RevWalk walk = new RevWalk(repository)) {
            RevCommit commit = walk.parseCommit(repository.resolve(objectId));
            RevTree tree = walk.parseTree(commit.getTree().getId());

            CanonicalTreeParser treeParser = new CanonicalTreeParser();
            try (ObjectReader reader = repository.newObjectReader()) {
                treeParser.reset(reader, tree.getId());
            }

            walk.dispose();

            return treeParser;
        }
    }*/

    public static void diffFile(Repository repository, ObjectId oldCommit, ObjectId newCommit) {
        try (RevWalk revWalk = new RevWalk(repository)) {

            RevCommit oldCommitObj = revWalk.parseCommit(oldCommit);
            RevCommit newCommitObj = revWalk.parseCommit(newCommit);

            try (Git git = new Git(repository)) {
                List<DiffEntry> diff = git.diff()
                        .setOldTree(prepareTreeParser(repository, oldCommitObj))
                        .setNewTree(prepareTreeParser(repository, newCommitObj))
                        .call();
                ByteArrayOutputStream out = new ByteArrayOutputStream();
                try (DiffFormatter formatter = new DiffFormatter(out)) {
                    formatter.setRepository(repository);
                    formatter.setContext(0); // 0 = no context, only changed lines

                    for (DiffEntry entry : diff) {
                        formatter.format(entry);
                        String diffText = out.toString(StandardCharsets.UTF_8);
                        System.out.println(diffText);
                        out.reset(); // clear the buffer for the next entry
                    }
                }
            }
        } catch (IOException | GitAPIException e) {
            e.printStackTrace();
        }
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
