package com.qlvmb.airticket.repository;

import com.qlvmb.airticket.domain.entity.OtpChallengeEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpChallengeRepository extends JpaRepository<OtpChallengeEntity, Long> {

  Optional<OtpChallengeEntity> findFirstByTargetValueAndPurposeOrderByCreatedAtDesc(
      String targetValue,
      String purpose
  );

  Optional<OtpChallengeEntity> findFirstByTargetValueAndPurposeAndConsumedAtIsNullOrderByCreatedAtDesc(
      String targetValue,
      String purpose
  );
}
