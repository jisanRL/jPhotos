package com.jPhotos.jPhotosBackend.model;

import javax.persistence.Column;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

@Entity
@Table(name = "image_table")
public class ImageTable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column
	private String name;

	@Column
	@Size(max = 20000000) // 20MB
	private byte[] picByte;

	public ImageTable() {
	}

	public ImageTable(String name, byte[] picByte) {
		this.name = name;
		this.picByte = picByte;
	}

	public Long getId() {
		return this.id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public byte[] getPicByte() {
		return this.picByte;
	}

	public void setPicByte(byte[] picByte) {
		this.picByte = picByte;
	}
}
