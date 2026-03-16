package com.qlvmb.airticket.repository;

import com.qlvmb.airticket.domain.entity.FlightFareInventoryEntity;
import jakarta.persistence.LockModeType;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FlightFareInventoryRepository extends JpaRepository<FlightFareInventoryEntity, Long> {

  @Lock(LockModeType.PESSIMISTIC_WRITE)
  @Query("""
      select inventory from FlightFareInventoryEntity inventory
      join fetch inventory.flight flight
      join fetch flight.originAirport
      join fetch flight.destinationAirport
      where inventory.id in :inventoryIds
      order by inventory.id asc
      """)
  List<FlightFareInventoryEntity> lockByIds(@Param("inventoryIds") Collection<Long> inventoryIds);
}
