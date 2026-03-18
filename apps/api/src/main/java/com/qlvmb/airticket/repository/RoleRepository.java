package com.qlvmb.airticket.repository;

import com.qlvmb.airticket.domain.entity.RoleEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<RoleEntity, Long> {

  Optional<RoleEntity> findByCode(String code);
}
