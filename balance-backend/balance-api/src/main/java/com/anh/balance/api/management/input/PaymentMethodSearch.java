package com.anh.balance.api.management.input;

import static com.anh.balance.common.utils.EntityOperations.likeString;

import java.util.ArrayList;

import org.springframework.util.StringUtils;

import com.anh.balance.domain.entity.PaymentMethod;
import com.anh.balance.domain.entity.PaymentMethod_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public record PaymentMethodSearch(
		Boolean active,
		String keyword) {

	public Predicate[] where(CriteriaBuilder cb, Root<PaymentMethod> root) {
		
		var predicates = new ArrayList<Predicate>();
		
		if(null != active) {
			predicates.add(cb.equal(root.get(PaymentMethod_.active), active));
		}
		
		if(StringUtils.hasLength(keyword)) {
			predicates.add(cb.or(
				cb.like(cb.lower(root.get(PaymentMethod_.name)), likeString(keyword)),
				cb.like(cb.lower(root.get(PaymentMethod_.accountNo)), likeString(keyword)),
				cb.like(cb.lower(root.get(PaymentMethod_.accountName)), likeString(keyword))
			));
		}
		
		return predicates.toArray(size -> new Predicate[size]);
	}

}
