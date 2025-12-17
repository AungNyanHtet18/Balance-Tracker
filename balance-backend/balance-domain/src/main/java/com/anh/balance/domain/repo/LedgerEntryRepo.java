package com.anh.balance.domain.repo;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;

import com.anh.balance.domain.BaseRepository;
import com.anh.balance.domain.embeddable.LedgerEntryPk;
import com.anh.balance.domain.entity.LedgerEntry;

public interface LedgerEntryRepo extends BaseRepository<LedgerEntry, LedgerEntryPk>{

	@Query("select count(e.id.code) from LedgerEntry e where e.id.memberId = :memberId and e.issueAt >= :dateFrom")
	Long countForCheck(long memberId, LocalDate dateFrom);

	@Query("select min(e.issueAt) from LedgerEntry e where e.id.memberId = :memberId")
	Optional<LocalDate> findStartEntry(long memberId);

}
