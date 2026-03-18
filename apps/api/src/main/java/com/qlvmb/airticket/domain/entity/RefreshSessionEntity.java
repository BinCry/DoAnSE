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
@Table(name = "refresh_session")
public class RefreshSessionEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private UserAccountEntity userAccount;

  @Column(name = "token_key", nullable = false, unique = true, length = 120)
  private String tokenKey;

  @Column(name = "expires_at", nullable = false)
  private OffsetDateTime expiresAt;

  @Column(name = "revoked_at")
  private OffsetDateTime revokedAt;

  @Column(name = "created_at", nullable = false)
  private OffsetDateTime createdAt;

  @Column(name = "last_used_at")
  private OffsetDateTime lastUsedAt;

  @Column(name = "user_agent", length = 255)
  private String userAgent;

  @Column(name = "ip_address", length = 64)
  private String ipAddress;

  protected RefreshSessionEntity() {
  }

  public Long getId() {
    return id;
  }

  public UserAccountEntity getUserAccount() {
    return userAccount;
  }

  public String getTokenKey() {
    return tokenKey;
  }

  public OffsetDateTime getExpiresAt() {
    return expiresAt;
  }

  public OffsetDateTime getRevokedAt() {
    return revokedAt;
  }

  public OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public OffsetDateTime getLastUsedAt() {
    return lastUsedAt;
  }

  public String getUserAgent() {
    return userAgent;
  }

  public String getIpAddress() {
    return ipAddress;
  }

  public static RefreshSessionEntity create(
      UserAccountEntity userAccount,
      String tokenKey,
      OffsetDateTime expiresAt,
      OffsetDateTime createdAt,
      String userAgent,
      String ipAddress
  ) {
    RefreshSessionEntity refreshSession = new RefreshSessionEntity();
    refreshSession.userAccount = userAccount;
    refreshSession.tokenKey = tokenKey;
    refreshSession.expiresAt = expiresAt;
    refreshSession.createdAt = createdAt;
    refreshSession.userAgent = userAgent;
    refreshSession.ipAddress = ipAddress;
    return refreshSession;
  }

  public void revoke(OffsetDateTime revokedAt) {
    this.revokedAt = revokedAt;
  }
}
