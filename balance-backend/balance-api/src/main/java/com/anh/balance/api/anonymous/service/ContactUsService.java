package com.anh.balance.api.anonymous.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anh.balance.api.anonymous.input.ContactUsForm;
import com.anh.balance.common.dto.ModificationResult;
import com.anh.balance.domain.entity.ContactUs;
import com.anh.balance.domain.repo.ContactUsRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ContactUsService {

	private final ContactUsRepo contactUsRepo;
	
	@Transactional
	public ModificationResult<Long> contact(ContactUsForm form) {
		var contactUs= new ContactUs();
		contactUs.setFullName(form.fullName());
		contactUs.setEmail(form.email());
		contactUs.setPhone(form.phone());		
		contactUs.setMessage(form.message());
		contactUs.setCreatedAt(LocalDateTime.now());
		
		var contact = contactUsRepo.save(contactUs);
		
		return  ModificationResult.success(contact.getId());
	}

}
