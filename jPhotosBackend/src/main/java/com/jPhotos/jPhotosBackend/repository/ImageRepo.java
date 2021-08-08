package com.jPhotos.jPhotosBackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jPhotos.jPhotosBackend.model.ImageTable;

@Repository
public interface ImageRepo extends JpaRepository<ImageTable, Integer> {

}
