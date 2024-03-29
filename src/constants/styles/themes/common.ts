import { Border, Spacing, Typography } from 'styled-components/native';
import { Fonts } from "../fonts";

export const typographyCommon : Typography = {
  h1: {
    fontSize: 96,
    fontFamily: Fonts.openSansLight
  },
  h2: {
    fontSize: 48,
    fontFamily: Fonts.montSerratBold
  },
  h3: {
    fontSize: 32,
    fontFamily: Fonts.montSerratBold
  },
  h4: {
    fontSize: 32,
    fontFamily: Fonts.montSerratSemiBold
  },
  h5: {
    fontSize: 24,
    fontFamily: Fonts.montSerratBold
  },
  h6: {
    fontSize: 24,
    fontFamily: Fonts.montSerratRegular
  },
  h7: {
    fontSize: 24,
    fontFamily: Fonts.montSerratSemiBold
  },
  h8: {
    fontSize: 20,
    fontFamily: Fonts.montSerratSemiBold
  },
  subTitle1: {
    fontSize: 18,
    fontFamily: Fonts.openSansRegular
  },
  subTitle2: {
    fontSize: 18,
    fontFamily: Fonts.montSerratBold
  },
  body1: {
    fontSize: 14,
    fontFamily: Fonts.openSansRegular
  },
  body2: {
    fontSize: 16,
    fontFamily: Fonts.openSansBold
  },
  body3: {
    fontSize: 14,
    fontFamily: Fonts.openSansRegular
  },
  caption: {
    fontSize: 16,
    fontFamily: Fonts.openSansRegular
  },
  overline: {
    fontSize: 14,
    fontFamily: Fonts.openSansSemiBold
  }
}

export const spacing : Spacing = {
  ty: 4,
  xs: 5,
  sm: 10,
  md: 20,
  lg: 25,
  xl: 38,
  xxl: 45,
  xxxl: 100,
}

export const borders : Border = {
  radius: {
    xs: 4,
    sm: 10
  }
}