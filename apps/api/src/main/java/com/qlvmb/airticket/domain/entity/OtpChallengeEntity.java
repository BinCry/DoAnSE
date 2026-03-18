package com.qlvmb.airticket.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;

@Entity
@Table(name = "otp_challenge")
public class OtpChallengeEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id")
  private UserAccountEntity userAccount;

  @Column(nullable = false, length = 32)
  private String channel;

  @Column(nullable = false, length = 64)
  private String purpose;

  @Column(name = "target_value", nullable = false, length = 190)
  private String targetValue;

  @Column(name = "otp_hash", nullable = false, length = 255)
  private String otpHash;

  @Column(name = "expires_at", nullable = false)
  private OffsetDateTime expiresAt;

  @Column(name = "verified_at")
  private OffsetDateTime verifiedAt;

  @Column(name = "consumed_at")
  private OffsetDateTime consumedAt;

  @Column(name = "attempt_count", nullable = false)
  private int attemptCount;

  @Column(name = "created_at", nullable = false)
  private OffsetDateTime createdAt;

  protected OtpChallengeEntity() {
  }

  public Long getId() {
    return id;
  }

  public UserAccountEntity getUserAccount() {
    return userAccount;
  }

  public String getChannel() {
    return channel;
  }

  public String getPurpose() {
    return purpose;
  }

  public String getTargetValue() {
    return targetValue;
  }

  public String getOtpHash() {
    return otpHash;
  }

  public OffsetDateTime getExpiresAt() {
    return expiresAt;
  }

  public OffsetDateTime getVerifiedAt() {
    return verifiedAt;
  }

  public OffsetDateTime getConsumedAt() {
    return consumedAt;
  }

  public int getAttemptCount() {
    return attemptCount;
  }

  public OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public static OtpChallengeEntity issue(
      UserAccountEntity userAccount,
      String channel,
      String purpose,
      String targetValue,
      String otpHash,
      OffsetDateTime expiresAt,
      OffsetDateTime createdAt
  ) {
    OtpChallengeEntity otpChallenge = new OtpChallengeEntity();
    otpChallenge.userAccount = userAccount;
    otpChallenge.channel = channel;
    otpChallenge.purpose = purpose;
    otpChallenge.targetValue = targetValue;
    otpChallenge.otpHash = otpHash;
    otpChallenge.expiresAt = expiresAt;
    otpChallenge.createdAt = createdAt;
    otpChallenge.attemptCount = 0;
    return otpChallenge;
  }

  public void incrementAttempt() {
    attemptCount += 1;
  }

  public void markVerified(OffsetDateTime verifiedAt) {
    this.verifiedAt = verifiedAt;
  }

  public void consume(OffsetDateTime consumedAt) {
    this.consumedAt = consumedAt;
  }

  public boolean isExpired(OffsetDateTime now) {
    return expiresAt.isBefore(now);
  }

  public boolean isConsumed() {
    return consumedAt != null;
  }
}
