package com.anh.balance.common.dto;

import java.math.BigDecimal;

import com.anh.balance.domain.entity.Ledger.Type;

public record LedgerEntrySummary(
		long memberId,
		String code,
		Type type,
		String ledger,
		BigDecimal total) {

}
