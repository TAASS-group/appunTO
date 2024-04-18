package com.appunto.fileService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class FileServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(FileServiceApplication.class, args);
	}

/*	@Bean
	CommandLineRunner runner(FileRepository fileRepository, CommitRepository commitRepository, CommentRepository commentRepository) {
		return (args) -> {
			MyFile file = new MyFile("1", "D:\\Download\\CV5720132.pdf");
			MyFile file2 = new MyFile("1", "D:\\Download\\provamd.md");
			Commit commit1 = new Commit("Initial commit SIUUUUUUUM", new Date(), "John Doe", file);
			Commit commit2 = new Commit("Update README.md", new Date(), "John Doe", file);

			Comment comment1 = new Comment("John Doe", "text", commit1);
			Comment comment2 = new Comment("John Doe", "text", commit1);

			fileRepository.save(file);
			fileRepository.save(file2);

			commitRepository.saveAll(List.of(commit1, commit2));

			commentRepository.saveAll(List.of(comment1, comment2));
		};
	}
	*/


}
