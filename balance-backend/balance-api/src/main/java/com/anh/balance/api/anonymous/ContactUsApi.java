package com.anh.balance.api.anonymous;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.anh.balance.api.anonymous.input.ContactUsForm;
import com.anh.balance.api.anonymous.service.ContactUsService;
import com.anh.balance.common.dto.ModificationResult;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("anonymous/contact")
public class ContactUsApi {

	private final ContactUsService service;
	
	@PostMapping
	ModificationResult<Long> contact(@Validated @RequestBody ContactUsForm form) {
		return service.contact(form);
	}
	
}
