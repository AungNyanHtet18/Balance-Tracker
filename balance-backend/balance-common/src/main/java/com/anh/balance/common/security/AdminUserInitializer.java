package com.anh.balance.common.security;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.anh.balance.domain.entity.Account;
import com.anh.balance.domain.entity.Account.Role;
import com.anh.balance.domain.repo.AccountRepo;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class AdminUserInitializer {
	
	private final AccountRepo repo;
	private final PasswordEncoder passwordEncoder;

	@Bean
	ApplicationRunner applicationRunner() {
		return args -> {
			if(repo.count() == 0L) {
				var admin = new Account();
				admin.setEmail("admin@gmail.com");
				admin.setName("Admin User");
				admin.setPassword(passwordEncoder.encode("admin@123"));
				admin.setRole(Role.Admin);
				repo.create(admin);
			}
		};
	}
}