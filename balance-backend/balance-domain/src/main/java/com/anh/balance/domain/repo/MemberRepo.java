package com.anh.balance.domain.repo;

import java.util.Optional;

import com.anh.balance.domain.BaseRepository;
import com.anh.balance.domain.entity.Member;

public interface MemberRepo extends BaseRepository<Member, Long>{

	Optional<Member> findByAccountEmail(String username);

}
