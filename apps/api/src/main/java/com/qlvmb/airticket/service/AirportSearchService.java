package com.qlvmb.airticket.service;

import com.qlvmb.airticket.domain.dto.AirportOptionResponse;
import com.qlvmb.airticket.repository.AirportRepository;
import java.util.List;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AirportSearchService {

  private final AirportRepository airportRepository;

  public AirportSearchService(AirportRepository airportRepository) {
    this.airportRepository = airportRepository;
  }

  @Transactional(readOnly = true)
  public List<AirportOptionResponse> search(String query) {
    String keyword = query == null ? "" : query.trim();
    return airportRepository.search(keyword, PageRequest.of(0, 10))
        .stream()
        .map(airport -> new AirportOptionResponse(
            airport.getCode(),
            airport.getCityName(),
            airport.getAirportName(),
            airport.getTerminalLabel()
        ))
        .toList();
  }
}
