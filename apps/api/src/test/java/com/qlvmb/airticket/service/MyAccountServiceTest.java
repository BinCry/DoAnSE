package com.qlvmb.airticket.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.qlvmb.airticket.domain.dto.MyPassengerResponse;
import com.qlvmb.airticket.domain.dto.MyProfileResponse;
import com.qlvmb.airticket.domain.dto.UpdateMyProfileRequest;
import com.qlvmb.airticket.domain.dto.UpsertMyPassengerRequest;
import com.qlvmb.airticket.domain.entity.SavedPassengerEntity;
import com.qlvmb.airticket.domain.entity.UserAccountEntity;
import com.qlvmb.airticket.repository.SavedPassengerRepository;
import com.qlvmb.airticket.repository.UserAccountRepository;
import com.qlvmb.airticket.security.AuthenticatedUser;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MyAccountServiceTest {

  @Mock
  private UserAccountRepository userAccountRepository;

  @Mock
  private SavedPassengerRepository savedPassengerRepository;

  @InjectMocks
  private MyAccountService myAccountService;

  @Test
  void updateMyProfile_shouldTrimDisplayNameAndClearBlankPhone() {
    UserAccountEntity userAccount = createUserAccount();
    AuthenticatedUser authenticatedUser = new AuthenticatedUser(
        userAccount.getId(),
        userAccount.getEmail(),
        userAccount.getDisplayName(),
        List.of("customer"),
        List.of("customer.self_service")
    );
    when(userAccountRepository.findOneWithRolesById(userAccount.getId())).thenReturn(Optional.of(userAccount));

    MyProfileResponse response = myAccountService.updateMyProfile(
        authenticatedUser,
        new UpdateMyProfileRequest("  Trần Minh Anh  ", "   ")
    );

    assertThat(response.displayName()).isEqualTo("Trần Minh Anh");
    assertThat(response.phone()).isNull();
  }

  @Test
  void createMyPassenger_shouldClearPrimaryFlagOfExistingPassenger() {
    UserAccountEntity userAccount = createUserAccount();
    SavedPassengerEntity existingPrimaryPassenger = SavedPassengerEntity.create(
        userAccount,
        "Nguyễn Văn A",
        "adult",
        LocalDate.of(1991, 5, 20),
        "CCCD",
        "012345678901",
        true,
        OffsetDateTime.now(ZoneOffset.UTC).minusDays(2)
    );
    AuthenticatedUser authenticatedUser = new AuthenticatedUser(
        userAccount.getId(),
        userAccount.getEmail(),
        userAccount.getDisplayName(),
        List.of("customer"),
        List.of("customer.self_service")
    );
    when(userAccountRepository.findOneWithRolesById(userAccount.getId())).thenReturn(Optional.of(userAccount));
    when(savedPassengerRepository.findAllByUserAccountIdOrderByPrimaryDescCreatedAtDesc(userAccount.getId()))
        .thenReturn(List.of(existingPrimaryPassenger));
    when(savedPassengerRepository.save(any(SavedPassengerEntity.class)))
        .thenAnswer(invocation -> invocation.getArgument(0));

    MyPassengerResponse response = myAccountService.createMyPassenger(
        authenticatedUser,
        new UpsertMyPassengerRequest(
            "  Trần Bé Bông  ",
            "ADULT",
            LocalDate.of(2015, 9, 14),
            "hộ chiếu",
            " ab123456 ",
            true
        )
    );

    assertThat(existingPrimaryPassenger.isPrimary()).isFalse();
    assertThat(response.fullName()).isEqualTo("Trần Bé Bông");
    assertThat(response.passengerType()).isEqualTo("adult");
    assertThat(response.documentType()).isEqualTo("HỘ CHIẾU");
    assertThat(response.documentNumber()).isEqualTo("AB123456");
    assertThat(response.isPrimary()).isTrue();
    verify(savedPassengerRepository).save(any(SavedPassengerEntity.class));
  }

  private UserAccountEntity createUserAccount() {
    UserAccountEntity userAccount = UserAccountEntity.register(
        "khach@example.com",
        "hashed-password",
        "Khách Hàng",
        "0909123456",
        "active",
        OffsetDateTime.now(ZoneOffset.UTC)
    );
    setField(userAccount, "id", 101L);
    return userAccount;
  }

  private void setField(Object target, String fieldName, Object value) {
    try {
      java.lang.reflect.Field field = target.getClass().getDeclaredField(fieldName);
      field.setAccessible(true);
      field.set(target, value);
    } catch (ReflectiveOperationException exception) {
      throw new IllegalStateException("Không thể chuẩn bị dữ liệu kiểm thử.", exception);
    }
  }
}
