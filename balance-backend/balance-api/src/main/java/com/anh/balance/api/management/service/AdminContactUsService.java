package com.anh.balance.api.management.service;

import java.util.function.Function;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anh.balance.api.anonymous.output.ContactUsListItem;
import com.anh.balance.api.management.input.ContactUsSearch;
import com.anh.balance.domain.PageResult;
import com.anh.balance.domain.entity.ContactUs;
import com.anh.balance.domain.entity.ContactUs_;
import com.anh.balance.domain.repo.ContactUsRepo;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@PreAuthorize("hasAuthority('Admin')")
public class AdminContactUsService {
	
	private final ContactUsRepo contactUsRepo;
	
	public PageResult<ContactUsListItem> search(ContactUsSearch search, int page, int size) {
		return contactUsRepo.search(queryFunc(search), countFunc(search), page, size);
	}

    private Function<CriteriaBuilder, CriteriaQuery<ContactUsListItem>> queryFunc(ContactUsSearch search) {
    	 return cb -> {
    		  var cq = cb.createQuery(ContactUsListItem.class);
    		  var root = cq.from(ContactUs.class);
    		  ContactUsListItem.select(cq, root);
    		  cq.where(search.where(cb, root));
    		  cq.orderBy(cb.desc(root.get(ContactUs_.createdAt)));
    		  return cq;
    	 };
    }
	
    
    private Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc(ContactUsSearch search) {
    	 return cb -> {
    		var cq = cb.createQuery(Long.class);
    		var root = cq.from(ContactUs.class);
    		cq.where(search.where(cb, root));
    		cq.select(cb.count(root.get(ContactUs_.id)));
    		return cq;
    	 };
    }
}
