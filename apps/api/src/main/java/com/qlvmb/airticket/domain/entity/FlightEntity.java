package com.qlvmb.airticket.domain.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "flight")
public class FlightEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 16)
  private String code;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "origin_airport_id", nullable = false)
  private AirportEntity originAirport;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "destination_airport_id", nullable = false)
  private AirportEntity destinationAirport;

  @Column(name = "departure_at", nullable = false)
  private OffsetDateTime departureAt;

  @Column(name = "arrival_at", nullable = false)
  private OffsetDateTime arrivalAt;

  @Column(nullable = false, length = 32)
  private String status;

  @OneToMany(mappedBy = "flight", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<FlightFareInventoryEntity> fareInventories = new ArrayList<>();

  protected FlightEntity() {
  }

  public Long getId() {
    return id;
  }

  public String getCode() {
    return code;
  }

  public AirportEntity getOriginAirport() {
    return originAirport;
  }

  public AirportEntity getDestinationAirport() {
    return destinationAirport;
  }

  public OffsetDateTime getDepartureAt() {
    return departureAt;
  }

  public OffsetDateTime getArrivalAt() {
    return arrivalAt;
  }

  public String getStatus() {
    return status;
  }

  public List<FlightFareInventoryEntity> getFareInventories() {
    return fareInventories;
  }
}
