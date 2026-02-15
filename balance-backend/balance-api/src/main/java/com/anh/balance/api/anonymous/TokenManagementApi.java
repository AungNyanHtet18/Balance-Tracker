package com.anh.balance.api.anonymous;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anh.balance.api.anonymous.input.SignInForm;
import com.anh.balance.api.anonymous.input.TokenRefreshForm;
import com.anh.balance.api.anonymous.output.AuthResult;
import com.anh.balance.common.security.token.JwtTokenProvider;
import com.anh.balance.domain.repo.AccountRepo;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/anonymous/token")
public class TokenManagementApi {
	
	private final AuthenticationManager authenticationManager;
	private final AccountRepo accountRepo;
	private final JwtTokenProvider tokenProvider;

	@PostMapping("generate")
	AuthResult generate(@Validated @RequestBody SignInForm form) {
		var authentication = authenticationManager.authenticate(form.getAuthentication());
		return getResult(authentication);
	}

	@PostMapping("refresh")
	AuthResult refresh(@Validated @RequestBody TokenRefreshForm form) {
		var authentication = tokenProvider.parseRefreshToken(form.token());
		return getResult(authentication);
	}
	
	private AuthResult getResult(Authentication authentication) {
		SecurityContextHolder.getContext()
			.setAuthentication(authentication);
	
		var account = accountRepo.findById(authentication.getName()).orElseThrow();
		
		return AuthResult.builder()
				.name(account.getName())
				.email(account.getEmail())
				.role(account.getRole())
				.expired(account.isExpired())
				.deleted(account.isDeleted())
				.accessToken(tokenProvider.generateAccessToken(authentication))
				.refreshToken(tokenProvider.generateRefreshToken(authentication))
				.build();
	}
}
