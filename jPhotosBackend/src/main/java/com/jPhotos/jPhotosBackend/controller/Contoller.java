package com.jPhotos.jPhotosBackend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class Contoller {

	@GetMapping
	public String getUsers() {
		return "Welcome to jPhotoes backend";
	}
	
}
