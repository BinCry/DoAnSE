package com.qlvmb.airticket.exception;

import com.qlvmb.airticket.domain.dto.ApiErrorResponse;
import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
public class ApiExceptionHandler {

  @ExceptionHandler(ApiException.class)
  public ResponseEntity<ApiErrorResponse> handleApiException(ApiException exception) {
    return ResponseEntity.status(exception.getStatus())
        .body(new ApiErrorResponse(
            exception.getStatus().value(),
            exception.getMessage(),
            Map.of(),
            OffsetDateTime.now()
        ));
  }

  @ExceptionHandler({MethodArgumentNotValidException.class, BindException.class})
  public ResponseEntity<ApiErrorResponse> handleValidationException(Exception exception) {
    Map<String, String> errors = new LinkedHashMap<>();
    if (exception instanceof MethodArgumentNotValidException methodArgumentNotValidException) {
      methodArgumentNotValidException.getBindingResult().getFieldErrors().forEach((fieldError) ->
          errors.put(fieldError.getField(), buildFieldMessage(fieldError))
      );
    }
    if (exception instanceof BindException bindException) {
      bindException.getBindingResult().getFieldErrors().forEach((fieldError) ->
          errors.put(fieldError.getField(), buildFieldMessage(fieldError))
      );
    }
    return ResponseEntity.badRequest()
        .body(new ApiErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "Du lieu gui len khong hop le.",
            errors,
            OffsetDateTime.now()
        ));
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<ApiErrorResponse> handleTypeMismatch(MethodArgumentTypeMismatchException exception) {
    return ResponseEntity.badRequest()
        .body(new ApiErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "Gia tri tham so '" + exception.getName() + "' khong hop le.",
            Map.of(),
            OffsetDateTime.now()
        ));
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<ApiErrorResponse> handleUnreadableBody(HttpMessageNotReadableException exception) {
    return ResponseEntity.badRequest()
        .body(new ApiErrorResponse(
            HttpStatus.BAD_REQUEST.value(),
            "Khong doc duoc noi dung yeu cau.",
            Map.of(),
            OffsetDateTime.now()
        ));
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ApiErrorResponse> handleUnexpectedException(Exception exception) {
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(new ApiErrorResponse(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "He thong tam thoi gap su co.",
            Map.of(),
            OffsetDateTime.now()
        ));
  }

  private String buildFieldMessage(FieldError fieldError) {
    return fieldError.getDefaultMessage() == null ? "Gia tri khong hop le." : fieldError.getDefaultMessage();
  }
}
