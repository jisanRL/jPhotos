package com.jPhotos.jPhotosBackend.controller;

//import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import com.jPhotos.jPhotosBackend.model.ImageTable;
import com.jPhotos.jPhotosBackend.repository.ImageRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200", maxAge=3600)
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
	

	// posts image to the database
	@PostMapping("/upload")
	public ResponseEntity<ImageTable> createImage(@RequestBody ImageTable image) {
		try {
			ImageTable it = imageRepo.save(image);
			return new ResponseEntity<>(it, HttpStatus.CREATED);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	//
	 @GetMapping("/get/{name}")
	public ResponseEntity<List<ImageTable>> getAllImages(@PathVariable("name") String name){
		try {
			List<ImageTable> img = new ArrayList<>(imageRepo.findByNameLike("%" + name + "%"));
//			img.addAll(imageRepo.findAll());
//			log.info(img);
			if (img.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(img, HttpStatus.OK);
		} catch (Exception e) {
			// TODO: handle exception
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	/*
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
	*/
}
