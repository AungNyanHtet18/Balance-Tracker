package com.anh.balance.api.management;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anh.balance.api.management.input.SubscriptionSearch;
import com.anh.balance.api.management.input.SubscriptionStatusUpdateForm;
import com.anh.balance.api.management.output.SubscriptionDetails;
import com.anh.balance.api.management.output.SubscriptionListItem;
import com.anh.balance.api.management.service.SubscriptionService;
import com.anh.balance.common.dto.ModificationResult;
import com.anh.balance.domain.PageResult;
import com.anh.balance.domain.embeddable.SubscriptionPk;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("management/subscription")
public class SubscriptionApi {
	
	private final SubscriptionService service;

	@GetMapping
	PageResult<SubscriptionListItem> search(SubscriptionSearch search, 
			@RequestParam(defaultValue = "0") int page, 
			@RequestParam(defaultValue = "10") int size) {
		return service.search(search, page, size);
	}
	
	@GetMapping("{code}")
	SubscriptionDetails findById(@PathVariable String code) {
		return service.findById(code);
	}
	
	@PutMapping("{code}")
	ModificationResult<SubscriptionPk> updateStatus(@PathVariable String code, 
			@Validated @RequestBody SubscriptionStatusUpdateForm form) {
		return service.update(code, form);
	}
	
}
