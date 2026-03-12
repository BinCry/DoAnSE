package com.qlvmb.airticket.domain.dto;

import java.util.List;

public record CmsHomepageResponse(
    List<HeroBanner> banners,
    List<ContentCard> articles,
    List<ContentCard> faqCards
) {

  public record HeroBanner(
      String title,
      String subtitle,
      String cta,
      String locale
  ) {
  }

  public record ContentCard(
      String title,
      String category,
      String summary,
      String locale
  ) {
  }
}
