package com.qlvmb.airticket.controller;

import com.qlvmb.airticket.domain.dto.SupportOverviewResponse;
import com.qlvmb.airticket.service.DemoDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/support")
public class SupportController {

  private final DemoDataService demoDataService;

  public SupportController(DemoDataService demoDataService) {
    this.demoDataService = demoDataService;
  }

  @GetMapping("/overview")
  public SupportOverviewResponse getSupportOverview() {
    return demoDataService.getSupportOverview();
  }
}
