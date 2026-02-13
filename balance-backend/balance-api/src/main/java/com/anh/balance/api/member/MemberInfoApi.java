package com.anh.balance.api.member;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.anh.balance.api.member.input.MemberProfileEditForm;
import com.anh.balance.api.member.output.MemberDetails;
import com.anh.balance.api.member.service.MemberProfileService;
import com.anh.balance.common.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("member/{username}")
public class MemberInfoApi {
	
	private final MemberProfileService profileService;
	
	@PutMapping("info")
	@PreAuthorize("authentication.name eq #username")
	ModificationResult<Long> update(
					@PathVariable String username, 
					@Validated MemberProfileEditForm form ) {
		 return profileService.update(username, form);
	}
	
	@GetMapping("info")
	@PreAuthorize("authentication.name eq #username")
	MemberDetails findByUserName(
				@PathVariable String username) {
		return profileService.findByUserName(username);
	}
	
}