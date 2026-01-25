package com.stayxpress.hotelandroom.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.stayxpress.hotelandroom.entities.RoomEntity;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Integer> {

}
