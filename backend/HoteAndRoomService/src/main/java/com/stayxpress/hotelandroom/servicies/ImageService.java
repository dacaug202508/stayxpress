package com.stayxpress.hotelandroom.servicies;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.stayxpress.hotelandroom.entities.ImageEntity;
import com.stayxpress.hotelandroom.entities.ImageEntity.EntityType;
import com.stayxpress.hotelandroom.repositories.ImageRepository;

@Service
public class ImageService {

    @Autowired
    private Cloudinary cloudinary;

    @Autowired
    private ImageRepository imageRepository;

    // 🔹 Upload to Cloudinary only
    public String uploadToCloudinary(MultipartFile file, String folderName) {
        try {
            HashMap<Object, Object> options = new HashMap<>();
            options.put("folder", folderName);

            Map<?, ?> uploadedFile = cloudinary.uploader().upload(file.getBytes(), options);
            String publicId = (String) uploadedFile.get("public_id");

            return cloudinary.url().secure(true).generate(publicId);

        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    // 🔹 Upload + Save in DB
    public ImageEntity uploadAndSaveImage(
            MultipartFile file,
            EntityType entityType,
            Integer entityId,
            Boolean isPrimary
    ) {

        String folder = entityType.name().toLowerCase(); // hotel / room
        String imageUrl = uploadToCloudinary(file, folder);

        if (imageUrl == null) {
            throw new RuntimeException("Image upload failed");
        }

        ImageEntity image = new ImageEntity();
        image.setEntityType(entityType);
        image.setEntityId(entityId);
        image.setImageUrl(imageUrl);
        image.setIsPrimary(isPrimary != null ? isPrimary : false);
        

        return imageRepository.save(image);
    }
    	
    
    public List<ImageEntity> findImageByEntityTypeAndId(EntityType entityType, Integer entityId){
    	return imageRepository.findByEntityTypeAndEntityId(entityType, entityId);
    }
    
    
    
}
