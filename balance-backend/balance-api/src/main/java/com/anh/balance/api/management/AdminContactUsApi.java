package com.anh.balance.api.management;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.anh.balance.api.anonymous.output.ContactUsListItem;
import com.anh.balance.api.management.input.ContactUsSearch;
import com.anh.balance.api.management.service.AdminContactUsService;
import com.anh.balance.common.dto.ModificationResult;
import com.anh.balance.domain.PageResult;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("management/contact")
public class AdminContactUsApi {

	private final AdminContactUsService service;
	
	@GetMapping
	PageResult<ContactUsListItem> search(ContactUsSearch search,
		  @RequestParam(defaultValue = "0") int page, 
		  @RequestParam(defaultValue = "10") int size){
	  return service.search(search, page, size);
	}	
	
	
	@DeleteMapping("{contactId}")
	ModificationResult<String> delete(@PathVariable long contactId) {
		 return service.delete(contactId);
	}
	
}
