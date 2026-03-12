package com.qlvmb.airticket.controller;

import com.qlvmb.airticket.domain.dto.CmsHomepageResponse;
import com.qlvmb.airticket.service.DemoDataService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cms")
public class CmsController {

  private final DemoDataService demoDataService;

  public CmsController(DemoDataService demoDataService) {
    this.demoDataService = demoDataService;
  }

  @GetMapping("/homepage")
  public CmsHomepageResponse getHomepageContent() {
    return demoDataService.getCmsHomepage();
  }
}
