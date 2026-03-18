package com.qlvmb.airticket.repository;

import com.qlvmb.airticket.domain.entity.UserAccountEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccountEntity, Long> {

  Optional<UserAccountEntity> findByEmailIgnoreCase(String email);

  boolean existsByEmailIgnoreCase(String email);

  @EntityGraph(attributePaths = "roles")
  Optional<UserAccountEntity> findOneWithRolesByEmailIgnoreCase(String email);

  @EntityGraph(attributePaths = "roles")
  Optional<UserAccountEntity> findOneWithRolesById(Long id);
}
