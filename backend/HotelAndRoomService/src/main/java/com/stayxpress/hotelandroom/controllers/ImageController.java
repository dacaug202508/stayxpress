package com.stayxpress.hotelandroom.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.stayxpress.hotelandroom.entities.ImageEntity;
import com.stayxpress.hotelandroom.servicies.ImageService;

@RestController
@RequestMapping("/image")
//@CrossOrigin(origins = "http://localhost:5173")
public class ImageController {
	
	private final ImageService imageService;
	
	public ImageController(ImageService imageService) {
		this.imageService = imageService;
	}
	
	
	@PostMapping("/upload")
	public ResponseEntity<ImageEntity> uploadImage(
	        @RequestParam("file") MultipartFile file,
	        @RequestParam("entityType") ImageEntity.EntityType entityType,
	        @RequestParam("entityId") Integer entityId,
	        @RequestParam(value = "isPrimary", required = false) Boolean isPrimary
	) {
		
		System.out.println(file);
		
		
	    ImageEntity savedImage = imageService.uploadAndSaveImage(file, entityType, entityId, isPrimary);
	    return ResponseEntity.ok(savedImage);
	}

	@GetMapping("/get")
	public ResponseEntity<?> getImageBYEntityAndId(@RequestParam ImageEntity.EntityType entityType, Integer entityId){
		return ResponseEntity.ok(imageService.findImageByEntityTypeAndId(entityType, entityId));
	}
	
}
