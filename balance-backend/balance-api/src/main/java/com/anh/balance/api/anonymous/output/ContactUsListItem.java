package com.anh.balance.api.anonymous.output;

import java.time.LocalDateTime;

import com.anh.balance.domain.entity.ContactUs;
import com.anh.balance.domain.entity.ContactUs_;

import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Root;

public record ContactUsListItem(
	Long id,
	String fullName,
	String email,
	String phone,
	String message,
	LocalDateTime createdAt) {

	public static void select(CriteriaQuery<ContactUsListItem> cq, Root<ContactUs> root) {
		cq.multiselect(
		   root.get(ContactUs_.id),
		   root.get(ContactUs_.fullName),
		   root.get(ContactUs_.email),
		   root.get(ContactUs_.phone),
		   root.get(ContactUs_.message),
		   root.get(ContactUs_.createdAt));
		
	}

}
