package com.anh.balance.domain;

import java.util.List;

public record PageResult<T>(
		List<T> contents,
		Pager pager) {

}
