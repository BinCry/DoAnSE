package com.qlvmb.airticket.repository;

import com.qlvmb.airticket.domain.entity.FlightEntity;
import java.time.OffsetDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FlightRepository extends JpaRepository<FlightEntity, Long> {

  @Query("""
      select distinct flight from FlightEntity flight
      join fetch flight.originAirport
      join fetch flight.destinationAirport
      left join fetch flight.fareInventories fareInventory
      where flight.originAirport.code = :from
        and flight.destinationAirport.code = :to
        and flight.departureAt >= :start
        and flight.departureAt < :end
      order by flight.departureAt asc
      """)
  List<FlightEntity> searchRoute(
      @Param("from") String from,
      @Param("to") String to,
      @Param("start") OffsetDateTime start,
      @Param("end") OffsetDateTime end
  );
}
