package com.anh.balance.api.anonymous.input;

import jakarta.validation.constraints.NotBlank;

public record ContactUsForm(
	@NotBlank(message = "Please enter your full name.")
	String fullName,
	@NotBlank(message = "Please enter your email.")
	String email,
	String phone,
	@NotBlank(message = "Please enter your message.")
	String message) {

}
