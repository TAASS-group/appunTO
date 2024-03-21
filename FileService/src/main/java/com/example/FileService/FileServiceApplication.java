package com.example.FileService;

import com.example.FileService.Models.Comment;
import com.example.FileService.Models.Commit;
import com.example.FileService.Models.MyFile;
import com.example.FileService.Repository.CommentRepository;
import com.example.FileService.Repository.CommitRepository;
import com.example.FileService.Repository.FileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class FileServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(FileServiceApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(FileRepository fileRepository, CommitRepository commitRepository, CommentRepository commentRepository) {
		return (args) -> {
			MyFile file = new MyFile("TestPDF", "txt", "1KB", "D:\\Download\\CV5720132.pdf");
			MyFile file2 = new MyFile("TestMD", "txt", "1KB", "D:\\Download\\provamd.md");
			Commit commit1 = new Commit("Initial commit", "2021-07-01", "John Doe", file);
			Commit commit2 = new Commit("Update README.md", "2021-07-02", "John Doe", file);

			fileRepository.save(file);
			fileRepository.save(file2);

			commitRepository.saveAll(List.of(commit1, commit2));
		};
	}

}
