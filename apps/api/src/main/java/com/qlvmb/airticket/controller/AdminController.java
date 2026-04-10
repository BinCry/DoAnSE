package com.qlvmb.airticket.controller;

import com.qlvmb.airticket.domain.dto.AdminDashboardResponse;
import com.qlvmb.airticket.security.PermissionCode;
import com.qlvmb.airticket.service.DemoDataService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

  private final DemoDataService demoDataService;

  public AdminController(DemoDataService demoDataService) {
    this.demoDataService = demoDataService;
  }

  @PreAuthorize("hasAuthority('" + PermissionCode.BACKOFFICE_ADMIN + "')")
  @GetMapping("/dashboard")
  public AdminDashboardResponse getDashboard() {
    return demoDataService.getAdminDashboard();
  }
}
