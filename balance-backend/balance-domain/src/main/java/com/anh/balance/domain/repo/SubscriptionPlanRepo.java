package com.anh.balance.domain.repo;

import java.util.List;

import com.anh.balance.domain.BaseRepository;
import com.anh.balance.domain.entity.SubscriptionPlan;

public interface SubscriptionPlanRepo extends BaseRepository<SubscriptionPlan, Integer>{

	List<SubscriptionPlan> findByDefaultPlanAndActive(boolean defaultPlan, boolean active);
}
