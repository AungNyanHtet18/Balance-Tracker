package com.anh.balance.api.management.input;

import java.time.LocalDate;
import java.util.ArrayList;
import static com.anh.balance.common.utils.EntityOperations.likeString;
import org.springframework.util.StringUtils;
import com.anh.balance.domain.entity.ContactUs;
import com.anh.balance.domain.entity.ContactUs_;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record ContactUsSearch(
	LocalDate createFrom,
	LocalDate createTo,
	String keyword){

	public Predicate[] where(CriteriaBuilder cb, Root<ContactUs> root) {
		
		var list = new ArrayList<Predicate>();
		
		if(null != createFrom) {
			 list.add(cb.greaterThanOrEqualTo(root.get(ContactUs_.createdAt), createFrom.atStartOfDay()));
		}
		
		if(null != createTo) {
			 list.add(cb.lessThanOrEqualTo(root.get(ContactUs_.createdAt), createTo.plusDays(1).atStartOfDay()));
		}
		
		
		if(StringUtils.hasLength(keyword)) {
			 list.add(cb.or(
				cb.like(cb.lower(root.get(ContactUs_.fullName)),likeString(keyword)),
				cb.like(cb.lower(root.get(ContactUs_.email)), likeString(keyword)),
				cb.like(cb.lower(root.get(ContactUs_.message)), likeString(keyword))	 
			 ));
			 
		}
				
		return list.toArray(size -> new Predicate[size]);
	}

}
