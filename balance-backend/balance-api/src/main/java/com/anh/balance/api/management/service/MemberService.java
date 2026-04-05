package com.anh.balance.api.management.service;

import java.util.function.Function;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import static com.anh.balance.common.utils.EntityOperations.safeCall;
import com.anh.balance.api.management.input.MemberSearch;
import com.anh.balance.api.management.output.MemberListItem;
import com.anh.balance.common.dto.ModificationResult;
import com.anh.balance.domain.PageResult;
import com.anh.balance.domain.entity.Member;
import com.anh.balance.domain.repo.LedgerEntryRepo;
import com.anh.balance.domain.repo.LedgerRepo;
import com.anh.balance.domain.repo.MemberRepo;
import com.anh.balance.domain.repo.SubscriptionRepo;
import com.anh.balance.domain.entity.Account_;
import com.anh.balance.domain.entity.Member_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@PreAuthorize("hasAuthority('Admin')")
public class MemberService {
	
	private final MemberRepo memberRepo;
	private final SubscriptionRepo subscriptionRepo;
	private final LedgerRepo ledgerRepo;
	private final LedgerEntryRepo ledgerEntryRepo;

	public PageResult<MemberListItem> search(MemberSearch search, int page, int size) {
		return memberRepo.search(queryFunc(search), countFunc(search), page, size);
	}
	
	private Function<CriteriaBuilder, CriteriaQuery<MemberListItem>> queryFunc(MemberSearch search) {
		return cb -> {
			var cq = cb.createQuery(MemberListItem.class);
			var root = cq.from(Member.class);
			MemberListItem.select(cq, root);
			cq.where(search.where(cb, root));
			cq.orderBy(cb.desc(root.get(Member_.account).get(Account_.expiredAt)));
			return cq;
		};
	}

	private Function<CriteriaBuilder, CriteriaQuery<Long>> countFunc(MemberSearch search) {
		return cb -> {
			var cq = cb.createQuery(Long.class);
			var root = cq.from(Member.class);
			cq.where(search.where(cb, root));
			cq.select(cb.count(root.get(Member_.id)));
			return cq;
		};
	}

	@Transactional
	public ModificationResult<Boolean> activate(long memberId) {
		var member = safeCall(memberRepo.findById(memberId), "Member", memberId);
		
		var deleted = member.getAccount().isDeleted();
		member.getAccount().setDeleted(!deleted);
		
		return ModificationResult.success(!deleted);
	}

	@Transactional
	public ModificationResult<String> delete(long memberId) {
		var member = safeCall(memberRepo.findById(memberId), "Member", memberId);
		
		member.setSubscription(null);
		memberRepo.save(member);
		ledgerEntryRepo.deleteByIdMemberId(memberId);
		ledgerRepo.deleteByIdMemberId(memberId);
		
	
		subscriptionRepo.deleteByIdMemberId(memberId);
		
		memberRepo.delete(member);
		
		return ModificationResult.success("Successfully Deleted");
	}
}
