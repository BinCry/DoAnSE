package com.qlvmb.airticket.controller;

import com.qlvmb.airticket.domain.dto.MyPassengerResponse;
import com.qlvmb.airticket.domain.dto.MyProfileResponse;
import com.qlvmb.airticket.domain.dto.UpdateMyProfileRequest;
import com.qlvmb.airticket.domain.dto.UpsertMyPassengerRequest;
import com.qlvmb.airticket.exception.UnauthorizedException;
import com.qlvmb.airticket.security.AuthenticatedUser;
import com.qlvmb.airticket.service.AuthService;
import com.qlvmb.airticket.service.MyAccountService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.security.core.Authentication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/me")
public class MeController {

  private final AuthService authService;
  private final MyAccountService myAccountService;

  public MeController(AuthService authService, MyAccountService myAccountService) {
    this.authService = authService;
    this.myAccountService = myAccountService;
  }

  @GetMapping("/profile")
  public MyProfileResponse getMyProfile(Authentication authentication) {
    return authService.getMyProfile(requireAuthenticatedUser(authentication));
  }

  @PatchMapping("/profile")
  public MyProfileResponse updateMyProfile(
      Authentication authentication,
      @Valid @RequestBody UpdateMyProfileRequest request
  ) {
    return myAccountService.updateMyProfile(requireAuthenticatedUser(authentication), request);
  }

  @GetMapping("/passengers")
  public List<MyPassengerResponse> getMyPassengers(Authentication authentication) {
    return myAccountService.getMyPassengers(requireAuthenticatedUser(authentication));
  }

  @PostMapping("/passengers")
  public ResponseEntity<MyPassengerResponse> createMyPassenger(
      Authentication authentication,
      @Valid @RequestBody UpsertMyPassengerRequest request
  ) {
    return ResponseEntity.status(HttpStatus.CREATED)
        .body(myAccountService.createMyPassenger(requireAuthenticatedUser(authentication), request));
  }

  @PatchMapping("/passengers/{passengerId}")
  public MyPassengerResponse updateMyPassenger(
      Authentication authentication,
      @PathVariable Long passengerId,
      @Valid @RequestBody UpsertMyPassengerRequest request
  ) {
    return myAccountService.updateMyPassenger(requireAuthenticatedUser(authentication), passengerId, request);
  }

  @DeleteMapping("/passengers/{passengerId}")
  public ResponseEntity<Void> deleteMyPassenger(
      Authentication authentication,
      @PathVariable Long passengerId
  ) {
    myAccountService.deleteMyPassenger(requireAuthenticatedUser(authentication), passengerId);
    return ResponseEntity.noContent().build();
  }

  private AuthenticatedUser requireAuthenticatedUser(Authentication authentication) {
    if (authentication == null || !(authentication.getPrincipal() instanceof AuthenticatedUser authenticatedUser)) {
      throw new UnauthorizedException("Bạn cần đăng nhập để thực hiện thao tác này.");
    }
    return authenticatedUser;
  }
}
