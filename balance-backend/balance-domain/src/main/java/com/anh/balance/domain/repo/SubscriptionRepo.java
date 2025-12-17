package com.anh.balance.domain.repo;

import java.util.Optional;

import com.anh.balance.domain.BaseRepository;
import com.anh.balance.domain.embeddable.SubscriptionPk;
import com.anh.balance.domain.entity.Subscription;

public interface SubscriptionRepo extends BaseRepository<Subscription, SubscriptionPk>{

	Optional<Subscription> findFirstByOrderByCreatedAt();
}
