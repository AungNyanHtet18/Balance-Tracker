package com.anh.balance.common.dto;

import com.anh.balance.domain.entity.Subscription.Status;

public record SubscriptionStatusSummary(Status status, String planName, Long count) {
}
