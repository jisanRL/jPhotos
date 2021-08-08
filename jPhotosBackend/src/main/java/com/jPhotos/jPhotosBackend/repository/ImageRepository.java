package com.jPhotos.jPhotosBackend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jPhotos.jPhotosBackend.model.ImageTable;

@Repository
public interface ImageRepository extends JpaRepository<ImageTable, Integer> {
	Optional<ImageTable> findByName(String name);
}
