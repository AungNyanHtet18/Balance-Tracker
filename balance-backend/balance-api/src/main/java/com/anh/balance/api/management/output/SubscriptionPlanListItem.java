package com.anh.balance.api.management.output;

import com.anh.balance.domain.entity.SubscriptionPlan;
import com.anh.balance.domain.embeddable.SubscriptionPk_;
import com.anh.balance.domain.entity.Member_;
import com.anh.balance.domain.entity.SubscriptionPlan_;
import com.anh.balance.domain.entity.Subscription_;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Root;

public record SubscriptionPlanListItem(
		int id,
		String name,
		int months,
		int fees,
		Integer maxLedgers,
		Integer dailyEntry,
		Integer monthlyEntry,
		boolean defaultPlan,
		boolean active,
		long subscription,
		long member) {

	public static void select(CriteriaBuilder cb, CriteriaQuery<SubscriptionPlanListItem> cq,
			Root<SubscriptionPlan> root) {

		var subscription = root.join(SubscriptionPlan_.subscription, JoinType.LEFT);
		var member = root.join(SubscriptionPlan_.member, JoinType.LEFT);
		
		cq.multiselect(
			root.get(SubscriptionPlan_.id),
			root.get(SubscriptionPlan_.name),
			root.get(SubscriptionPlan_.months),
			root.get(SubscriptionPlan_.fees),
			root.get(SubscriptionPlan_.maxLedgers),
			root.get(SubscriptionPlan_.dailyEntry),
			root.get(SubscriptionPlan_.monthlyEntry),
			root.get(SubscriptionPlan_.defaultPlan),
			root.get(SubscriptionPlan_.active),
			cb.countDistinct(subscription.get(Subscription_.id).get(SubscriptionPk_.planId)),
			cb.countDistinct(member.get(Member_.id))
		);
		
		cq.groupBy(
			root.get(SubscriptionPlan_.id),
			root.get(SubscriptionPlan_.name),
			root.get(SubscriptionPlan_.months),
			root.get(SubscriptionPlan_.fees),
			root.get(SubscriptionPlan_.maxLedgers),
			root.get(SubscriptionPlan_.dailyEntry),
			root.get(SubscriptionPlan_.monthlyEntry),
			root.get(SubscriptionPlan_.defaultPlan),
			root.get(SubscriptionPlan_.active)				
		);
	}

}
