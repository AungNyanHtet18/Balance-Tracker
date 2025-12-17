package com.anh.balance.api.management.input;

import com.anh.balance.domain.entity.Subscription.Status;

import jakarta.validation.constraints.NotNull;

public record SubscriptionStatusUpdateForm(
		@NotNull(message = "Please select status.")
		Status status,
		String message) {

}
