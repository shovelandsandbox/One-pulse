import numbro from "numbro";
import {
  LOCALE,
  LOCALE_ID,
  LOCALE_VN,
  LOCALE_PH,
  LOCALE_MM,
  LOCALE_KH,
  LOCALE_TH,
  LOCALE_MY,
} from "./locale";

function Numbro(locale) {
  const localeAttributes = fetchLocaleAttributes(locale);
  numbro.registerLanguage({
    languageTag: localeAttributes.languageTag,
    delimiters: {
      thousands: ",",
      decimal: ".",
    },
    abbreviations: {
      thousand: "rb",
      million: "jt",
      billion: "m",
      trillion: "t",
    },
    ordinal: number => (number === 1 ? "pertama" : `ke${number}`),
    currency: {
      symbol: localeAttributes.symbol,
      position: "prefix",
      code: localeAttributes.code,
    },
    currencyFormat: {
      thousandSeparated: true,
    },
    formats: {
      fourDigits: {
        totalLength: 4,
        spaceSeparated: false,
        average: false,
      },
      fullWithTwoDecimals: {
        output: "currency",
        mantissa: 2,
        thousandSeparated: true,
        spaceSeparated: false,
      },
      fullWithTwoDecimalsNoCurrency: {
        optionalMantissa: true,
        mantissa: 2,
        thousandSeparated: true,
      },
      fullWithNoDecimals: {
        optionalMantissa: true,
        output: "currency",
        spaceSeparated: false,
        thousandSeparated: true,
        mantissa: 2,
      },
    },
  });

  numbro.setLanguage(localeAttributes.defaultTag, localeAttributes.fallbackTag);

  return numbro;
}
export function fetchLocaleAttributes(locale) {
  if (!locale) {
    locale = "en";
  }

  const localeMapper = {
    en: LOCALE,
    id: LOCALE_ID,
    vn: LOCALE_VN,
    ph: LOCALE_PH,
    mm: LOCALE_MM,
    kh: LOCALE_KH,
    th: LOCALE_TH,
    my: LOCALE_MY,
  };

  return localeMapper[locale];
}

export default Numbro;
