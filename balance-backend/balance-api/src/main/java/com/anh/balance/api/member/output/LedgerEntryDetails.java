package com.anh.balance.api.member.output;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.function.Function;

import com.anh.balance.common.dto.LedgerEntryItem;
import com.anh.balance.domain.embeddable.LedgerEntryPk;
import com.anh.balance.domain.entity.LedgerEntry;
import com.anh.balance.domain.entity.Ledger.Type;

public record LedgerEntryDetails(
		LedgerEntryPk id,
		String ledgerName,
		Type type,
		LocalDate issueAt,
		String particular,
		BigDecimal lastBalance,
		BigDecimal amount,
		boolean canEdit,
		List<LedgerEntryItem> items) {

	public static LedgerEntryDetails from(
			LedgerEntry entity, 
			Function<LocalDate, Boolean> cutOffFunc, 
			Function<String, List<LedgerEntryItem>> itemMapper) {
		return new LedgerEntryDetails(
				entity.getId(),
				entity.getLedger().getName(),
				entity.getLedger().getType(),
				entity.getIssueAt(),
				entity.getParticular(),
				entity.getLastBalance(),
				entity.getAmount(),
				cutOffFunc.apply(entity.getIssueAt()),
				itemMapper.apply(entity.getItems()));
	}
}
