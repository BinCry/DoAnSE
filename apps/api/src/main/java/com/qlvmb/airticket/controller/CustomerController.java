package com.qlvmb.airticket.controller;

import com.qlvmb.airticket.domain.dto.CustomerOverviewResponse;
import com.qlvmb.airticket.security.PermissionCode;
import com.qlvmb.airticket.service.DemoDataService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

  private final DemoDataService demoDataService;

  public CustomerController(DemoDataService demoDataService) {
    this.demoDataService = demoDataService;
  }

  @PreAuthorize("hasAuthority('" + PermissionCode.CUSTOMER_SELF_SERVICE + "')")
  @GetMapping("/me/overview")
  public CustomerOverviewResponse getOverview() {
    return demoDataService.getCustomerOverview();
  }
}
