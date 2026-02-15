package com.anh.balance.api.member.output;

import java.time.LocalDate;

import com.anh.balance.domain.entity.Member;
import com.anh.balance.domain.entity.Member.Gender;

public record MemberDetails(
	String name,
	String email,
	String phone,
	Gender gender,
	LocalDate dob,
	String address,
	String profileImage) {

	public static MemberDetails from(Member entity) {
		return new MemberDetails(
				entity.getAccount().getName(), 
				entity.getAccount().getEmail(), 
				entity.getPhone(),  
				entity.getGender(),
				entity.getDob(),
				entity.getAddress(),
				entity.getProfileImage());
	}

}
