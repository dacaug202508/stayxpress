package com.stayxpress.hotelandroom.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stayxpress.hotelandroom.entities.ImageEntity;

@Repository
public interface ImageRepository extends JpaRepository<ImageEntity, Integer>{
	List<ImageEntity> findByEntityTypeAndEntityId(ImageEntity.EntityType entityType, Integer entityId);

    List<ImageEntity> findByEntityTypeAndEntityIdAndIsPrimaryTrue(ImageEntity.EntityType entityType, Integer entityId);
}
