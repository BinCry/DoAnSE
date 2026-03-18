package com.qlvmb.airticket.repository;

import com.qlvmb.airticket.domain.entity.PermissionEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PermissionRepository extends JpaRepository<PermissionEntity, Long> {

  Optional<PermissionEntity> findByCode(String code);
}
