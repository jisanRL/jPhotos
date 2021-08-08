package com.jPhotos.jPhotosBackend.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.RequestEntity.BodyBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jPhotos.jPhotosBackend.model.ImageTable;
import com.jPhotos.jPhotosBackend.repository.ImageRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/image")
public class UploadController {
	
	@Autowired
	ImageRepository imageRepo;
	
	@GetMapping("/test")
	public List<String> testMapper(){
		String arr[] = {"James", "John", "Joel", "Jacob", "Joseph", "Jose"};
		List<String> tst = new ArrayList<String>();
		tst.addAll(Arrays.asList(arr));
		return tst;
	}
	// posts the image to the database (POST method)
	@PostMapping("/upload")
	public BodyBuilder uploadImage(@RequestParam("imageFile") MultipartFile file) throws IOException {
		System.out.println("Original size of image: " + file.getBytes().length);
		ImageTable img = new ImageTable(file.getOriginalFilename(),file.getContentType(), compressByte(file.getBytes()));
		imageRepo.save(img);
		return (BodyBuilder) ResponseEntity.status(HttpStatus.OK);
	}
	
	@GetMapping(path = { "/get/{imageName}" })
	public ImageTable getImage(@PathVariable("imageName") String imageName) throws DataFormatException {
		final Optional<ImageTable> rtvImage = imageRepo.findByName(imageName);
		ImageTable img = new ImageTable(rtvImage.get().getName(), rtvImage.get().getType(), decompressByte(rtvImage.get().getPicByte()));
		return img;
	}
	
	// compression-> algorithm compress the image bytes before storing in the database
	public static byte[] compressByte(byte[] data) {
		Deflater dfl = new Deflater();
		dfl.setInput(data);
		dfl.finish();
		
		ByteArrayOutputStream os = new ByteArrayOutputStream(data.length);
		byte[] bfr = new byte[1024];
		while (!dfl.finished()) {
			int cnt = dfl.deflate(bfr);
			os.write(bfr,0, cnt);
		}
		try {
			os.close();
		} catch (Exception e) {}
		System.out.println("Compressed Image byte size: " + os.toByteArray().length);
		return os.toByteArray();
	}
	
	// decompression algorithm->  uncompress the image before returning to the front-end 
	public static byte[] decompressByte(byte[] data) throws DataFormatException {
		Inflater inf = new Inflater();
		inf.setInput(data);
		ByteArrayOutputStream os = new ByteArrayOutputStream(data.length);
		byte[] bfr = new byte[1024];
		try {
			while (!inf.finished()) {
				int cnt = inf.inflate(bfr);
				os.write(bfr, 0, cnt);
			}
			os.close();
		} catch (Exception e) {}
		return os.toByteArray();
	}
}
