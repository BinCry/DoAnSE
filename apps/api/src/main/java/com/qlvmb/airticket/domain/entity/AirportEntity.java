package com.qlvmb.airticket.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "airport")
public class AirportEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false, unique = true, length = 8)
  private String code;

  @Column(name = "city_name", nullable = false, length = 120)
  private String cityName;

  @Column(name = "airport_name", nullable = false, length = 160)
  private String airportName;

  @Column(name = "terminal_label", nullable = false, length = 120)
  private String terminalLabel;

  protected AirportEntity() {
  }

  public Long getId() {
    return id;
  }

  public String getCode() {
    return code;
  }

  public String getCityName() {
    return cityName;
  }

  public String getAirportName() {
    return airportName;
  }

  public String getTerminalLabel() {
    return terminalLabel;
  }
}
