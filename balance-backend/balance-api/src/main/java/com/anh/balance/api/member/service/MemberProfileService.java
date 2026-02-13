package com.anh.balance.api.member.service;

import static com.anh.balance.common.utils.EntityOperations.safeCall;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.anh.balance.api.member.input.MemberProfileEditForm;
import com.anh.balance.api.member.output.CurrentSubscriptionPlan;
import com.anh.balance.api.member.output.MemberDetails;
import com.anh.balance.common.dto.ModificationResult;
import com.anh.balance.domain.repo.MemberRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberProfileService {
	
	private final MemberRepo memberRepo;
	private final MemberInfoStorageService storageService;
	
	
	public CurrentSubscriptionPlan getCurrentPlan(String username) {
		return safeCall(memberRepo.findByAccountEmail(username)
			.map(CurrentSubscriptionPlan::from), "Member", username);
	}

	@Transactional
	public ModificationResult<Long> update(String username, MemberProfileEditForm form) {
		
		var member = safeCall(memberRepo.findByAccountEmail(username), "Member", username );
		
		form.update(member);
		
		if(form.profileImage() != null && !form.profileImage().isEmpty() ) {
			var memberFileName = storageService.save(username, form.profileImage());
			member.setProfileImage(memberFileName);
		}
			
		return ModificationResult.success(member.getId());
	}

	public MemberDetails findByUserName(String username) {
		var entity = safeCall(memberRepo.findByAccountEmail(username), "Member", username);
		
		return MemberDetails.from(entity);
	}

}
