package com.qlvmb.airticket.repository;

import com.qlvmb.airticket.domain.entity.RefreshSessionEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshSessionRepository extends JpaRepository<RefreshSessionEntity, Long> {

  Optional<RefreshSessionEntity> findByTokenKey(String tokenKey);

  Optional<RefreshSessionEntity> findByTokenKeyAndRevokedAtIsNull(String tokenKey);

  List<RefreshSessionEntity> findAllByUserAccountIdAndRevokedAtIsNull(Long userId);
}
