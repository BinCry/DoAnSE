package com.qlvmb.airticket.repository;

import com.qlvmb.airticket.domain.entity.SavedPassengerEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedPassengerRepository extends JpaRepository<SavedPassengerEntity, Long> {

  List<SavedPassengerEntity> findAllByUserAccountIdOrderByPrimaryDescCreatedAtDesc(Long userId);

  Optional<SavedPassengerEntity> findByIdAndUserAccountId(Long id, Long userId);
}
