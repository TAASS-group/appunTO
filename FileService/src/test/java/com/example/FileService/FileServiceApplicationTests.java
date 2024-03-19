package com.example.FileService;

import com.example.FileService.Utils.FileSystemUtils;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class FileServiceApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void createDirectory() {
		FileSystemUtils.createDirectory("./test");
		assert (FileSystemUtils.resourceExists("./test"));
	}

	@Test
	void deleteDirectory() {
		FileSystemUtils.createDirectory("./test");
		FileSystemUtils.deleteDirectory("./test");
		assert (!FileSystemUtils.resourceExists("./test"));
	}

	@Test
	void createFile() {
		FileSystemUtils.createFile("./test.txt");
		assert (FileSystemUtils.resourceExists("./test.txt"));
	}

	@Test
	void deleteFile() {
		FileSystemUtils.createFile("./test.txt");
		FileSystemUtils.deleteFile("./test.txt");
		assert (!FileSystemUtils.resourceExists("./test.txt"));
	}

	@Test
	void createFileInDirectory() {
		FileSystemUtils.createDirectory("./test");
		FileSystemUtils.createFile("./test/test.txt");
		assert (FileSystemUtils.resourceExists("./test/test.txt"));
	}

	@Test
	void deleteFileInDirectory() {
		FileSystemUtils.createDirectory("./test");
		FileSystemUtils.createFile("./test/test.txt");
		FileSystemUtils.deleteFile("./test/test.txt");
		assert (!FileSystemUtils.resourceExists("./test/test.txt"));
	}

	@Test
	void deleteNonEmptyDirectory() {
		FileSystemUtils.createDirectory("./test");
		FileSystemUtils.createFile("./test/test.txt");
		FileSystemUtils.deleteDirectory("./test");
		assert (!FileSystemUtils.resourceExists("./test"));
	}

	@Test
	void writeToFile() {
		FileSystemUtils.createFile("./test.txt");
		FileSystemUtils.writeToFile("./test.txt", "Hello, World!");
		assert (FileSystemUtils.readFromFile("./test.txt").equals("Hello, World!"));
	}



}
