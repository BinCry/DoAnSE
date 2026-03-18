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
import java.time.LocalDate;
import java.time.OffsetDateTime;

@Entity
@Table(name = "saved_passenger")
public class SavedPassengerEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "user_id", nullable = false)
  private UserAccountEntity userAccount;

  @Column(name = "full_name", nullable = false, length = 160)
  private String fullName;

  @Column(name = "passenger_type", nullable = false, length = 32)
  private String passengerType;

  @Column(name = "date_of_birth", nullable = false)
  private LocalDate dateOfBirth;

  @Column(name = "document_type", nullable = false, length = 40)
  private String documentType;

  @Column(name = "document_number", nullable = false, length = 64)
  private String documentNumber;

  @Column(name = "is_primary", nullable = false)
  private boolean primary;

  @Column(name = "created_at", nullable = false)
  private OffsetDateTime createdAt;

  @Column(name = "updated_at", nullable = false)
  private OffsetDateTime updatedAt;

  protected SavedPassengerEntity() {
  }

  public Long getId() {
    return id;
  }

  public UserAccountEntity getUserAccount() {
    return userAccount;
  }

  public String getFullName() {
    return fullName;
  }

  public String getPassengerType() {
    return passengerType;
  }

  public LocalDate getDateOfBirth() {
    return dateOfBirth;
  }

  public String getDocumentType() {
    return documentType;
  }

  public String getDocumentNumber() {
    return documentNumber;
  }

  public boolean isPrimary() {
    return primary;
  }

  public OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public OffsetDateTime getUpdatedAt() {
    return updatedAt;
  }

  public static SavedPassengerEntity create(
      UserAccountEntity userAccount,
      String fullName,
      String passengerType,
      LocalDate dateOfBirth,
      String documentType,
      String documentNumber,
      boolean primary,
      OffsetDateTime createdAt
  ) {
    SavedPassengerEntity savedPassenger = new SavedPassengerEntity();
    savedPassenger.userAccount = userAccount;
    savedPassenger.fullName = fullName;
    savedPassenger.passengerType = passengerType;
    savedPassenger.dateOfBirth = dateOfBirth;
    savedPassenger.documentType = documentType;
    savedPassenger.documentNumber = documentNumber;
    savedPassenger.primary = primary;
    savedPassenger.createdAt = createdAt;
    savedPassenger.updatedAt = createdAt;
    return savedPassenger;
  }

  public void update(
      String fullName,
      String passengerType,
      LocalDate dateOfBirth,
      String documentType,
      String documentNumber,
      boolean primary,
      OffsetDateTime updatedAt
  ) {
    this.fullName = fullName;
    this.passengerType = passengerType;
    this.dateOfBirth = dateOfBirth;
    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.primary = primary;
    this.updatedAt = updatedAt;
  }

  public void clearPrimary(OffsetDateTime updatedAt) {
    if (primary) {
      primary = false;
      this.updatedAt = updatedAt;
    }
  }
}
