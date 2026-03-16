package com.qlvmb.airticket.repository;

import com.qlvmb.airticket.domain.entity.AirportEntity;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AirportRepository extends JpaRepository<AirportEntity, Long> {

  @Query("""
      select airport from AirportEntity airport
      where :keyword = ''
         or upper(airport.code) like upper(concat('%', :keyword, '%'))
         or upper(airport.cityName) like upper(concat('%', :keyword, '%'))
         or upper(airport.airportName) like upper(concat('%', :keyword, '%'))
      order by airport.code asc
      """)
  List<AirportEntity> search(@Param("keyword") String keyword, Pageable pageable);
}
