package com.anh.balance.api.member.service;

import java.util.function.Function;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anh.balance.api.member.input.BalanceReportSearch;
import com.anh.balance.api.member.output.BalanceReportListItem;
import com.anh.balance.domain.PageResult;
import com.anh.balance.domain.entity.LedgerEntry;
import com.anh.balance.domain.repo.LedgerEntryRepo;
import com.anh.balance.domain.entity.LedgerEntry_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ReportingService {
	
	private final LedgerEntryRepo repo;
	
	public PageResult<BalanceReportListItem> search(String username, BalanceReportSearch search, int page, int size) {
		return repo.search(
				queryFunc(username, search), 
				countFunc(username, search), 
				page, size);
	}

	private Function<CriteriaBuilder, CriteriaQuery<BalanceReportListItem>> queryFunc(String username, BalanceReportSearch search) {
		return cb -> {
			var cq = cb.createQuery(BalanceReportListItem.class);
			var root = cq.from(LedgerEntry.class);
			
			BalanceReportListItem.select(cb, cq, root);
			cq.where(search.where(username, cb, root));
			
			cq.orderBy(cb.asc(root.get(LedgerEntry_.createdAt)));
			
			return cq;
		};
	}

	private Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc(String username, BalanceReportSearch search) {
		return cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(LedgerEntry.class);
			
			cq.select(cb.count(root.get(LedgerEntry_.id)));
			cq.where(search.where(username, cb, root));
			
			return cq;
		};
	}
}
