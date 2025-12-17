package com.anh.balance.api.management;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.anh.balance.api.management.input.SubscriptionPlanForm;
import com.anh.balance.api.management.input.SubscriptionPlanSearch;
import com.anh.balance.api.management.output.SubscriptionPlanDetails;
import com.anh.balance.api.management.output.SubscriptionPlanListItem;
import com.anh.balance.api.management.service.SubscriptionPlanService;
import com.anh.balance.common.dto.ModificationResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("management/plan")
public class SubscrptionPlanApi {
	
	private final SubscriptionPlanService service;

	@GetMapping
	List<SubscriptionPlanListItem> search(SubscriptionPlanSearch search) {
		return service.search(search);
	}
	
	@PostMapping
	ModificationResult<Integer> create(@Validated @RequestBody SubscriptionPlanForm form) {
		return service.create(form);
	}
	
	@PutMapping("{id}")
	ModificationResult<Integer> update(@PathVariable int id, @Validated @RequestBody SubscriptionPlanForm form) {
		return service.update(id, form);
	}
	
	@GetMapping("{id}")
	SubscriptionPlanDetails findById(@PathVariable int id) {
		return service.findById(id);
	}
}
