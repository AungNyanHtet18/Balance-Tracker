package com.anh.balance.domain.repo;

import org.springframework.data.jpa.repository.Query;

import com.anh.balance.domain.BaseRepository;
import com.anh.balance.domain.embeddable.LedgerPk;
import com.anh.balance.domain.entity.Ledger;

public interface LedgerRepo extends BaseRepository<Ledger, LedgerPk>{

	@Query("select count(l) from Ledger l where l.id.memberId = :id")
	Long countForCheck(long id);
	void deleteByIdMemberId(long memberId);
}
