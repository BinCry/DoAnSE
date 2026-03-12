package com.qlvmb.airticket.controller;

import com.qlvmb.airticket.domain.dto.AuthSummaryResponse;
import com.qlvmb.airticket.service.DemoDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

  private final DemoDataService demoDataService;

  public AuthController(DemoDataService demoDataService) {
    this.demoDataService = demoDataService;
  }

  @GetMapping("/roles")
  public AuthSummaryResponse getRoleSummary() {
    return demoDataService.getAuthSummary();
  }
}
