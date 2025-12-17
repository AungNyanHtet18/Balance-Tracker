package com.anh.balance.api.anonymous.input;

import jakarta.validation.constraints.NotBlank;

public record TokenRefreshForm(
		@NotBlank(message = "Please enter refresh token.")
		String token) {

}
