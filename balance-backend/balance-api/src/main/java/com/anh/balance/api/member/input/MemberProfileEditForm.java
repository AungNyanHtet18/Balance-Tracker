package com.anh.balance.api.member.input;

import org.springframework.web.multipart.MultipartFile;

import com.anh.balance.domain.entity.Member;

import jakarta.validation.constraints.NotBlank;

public record MemberProfileEditForm(
		@NotBlank(message = "Please enter your name.")
		String name,
		String address,
		String phone,
		MultipartFile profileImage) {

	public void update(Member entity) {
		entity.getAccount().setName(name);
		entity.setAddress(address);
		entity.setPhone(phone);
	}
}
