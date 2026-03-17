package com.qlvmb.airticket.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(
    controllers = ApiMetaController.class,
    properties = {
        "spring.application.name=airticket-api",
        "app.title=Vietnam Airlines API"
    }
)
class ApiMetaControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  void shouldReturnApiHealthMetadata() throws Exception {
    mockMvc.perform(get("/api/meta/health"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.service").value("airticket-api"))
        .andExpect(jsonPath("$.title").value("Vietnam Airlines API"))
        .andExpect(jsonPath("$.status").value("ok"))
        .andExpect(jsonPath("$.javaVersion").isNotEmpty())
        .andExpect(jsonPath("$.serverTime").isNotEmpty());
  }
}
