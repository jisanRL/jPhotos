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
@CrossOrigin(origins = "http://localhost:4200", maxAge = 3600)
@RequestMapping("/image")

public class UploadController {

	@Autowired
	ImageRepository imageRepo;

	@GetMapping("/test")
	public List<String> testMapper() {
		String arr[] = { "James", "John", "Joel", "Jacob", "Joseph", "Jose" };
		List<String> tst = new ArrayList<String>();
		tst.addAll(Arrays.asList(arr));
		return tst;
	}

	// gets the image from the database (GET method)
	@GetMapping
	public List<ImageTable> getImages() {
		return imageRepo.findAll();
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

	// gets image (for the search option)
	@GetMapping("/get/{name}")
	public ResponseEntity<List<ImageTable>> getAllImages(@PathVariable("name") String name) {
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
	
	// delete the image
	@DeleteMapping(path = {"/delete/{id}"} )
	public ImageTable deleteImage(@PathVariable("id") Long id) {
		ImageTable img = imageRepo.findById(id).get();
		imageRepo.deleteById(id);
		return img;
	}

}
