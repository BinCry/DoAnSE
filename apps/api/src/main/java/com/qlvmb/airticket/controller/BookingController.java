package com.qlvmb.airticket.controller;

import com.qlvmb.airticket.domain.dto.BookingOverviewResponse;
import com.qlvmb.airticket.service.DemoDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

  private final DemoDataService demoDataService;

  public BookingController(DemoDataService demoDataService) {
    this.demoDataService = demoDataService;
  }

  @GetMapping("/checkout-preview")
  public BookingOverviewResponse getCheckoutPreview() {
    return demoDataService.getBookingOverview("A6C2P1");
  }

  @GetMapping("/manage/{bookingCode}")
  public BookingOverviewResponse getBooking(@PathVariable String bookingCode) {
    return demoDataService.getBookingOverview(bookingCode);
  }
}
