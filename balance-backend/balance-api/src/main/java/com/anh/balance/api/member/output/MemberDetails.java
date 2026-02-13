package com.anh.balance.api.member.output;

import com.anh.balance.domain.entity.Member;

public record MemberDetails(
	String name,
	String email,
	String phone,
	String address,
	String profileImage) {

	public static MemberDetails from(Member entity) {
		return new MemberDetails(
				entity.getAccount().getName(), 
				entity.getAccount().getEmail(), 
				entity.getPhone(), 
				entity.getAddress(), 
				entity.getProfileImage());
	}

}
