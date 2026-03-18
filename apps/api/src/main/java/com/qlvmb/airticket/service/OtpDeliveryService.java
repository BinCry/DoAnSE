package com.qlvmb.airticket.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class OtpDeliveryService {

  private static final Logger LOGGER = LoggerFactory.getLogger(OtpDeliveryService.class);

  public void sendForgotPasswordOtp(String email, String otp) {
    LOGGER.info("Ma OTP dat lai mat khau cho {} la {}", maskEmail(email), otp);
  }

  private String maskEmail(String email) {
    int atIndex = email.indexOf("@");
    if (atIndex <= 1) {
      return "***" + email.substring(Math.max(0, atIndex));
    }
    return email.substring(0, 1) + "***" + email.substring(atIndex);
  }
}
