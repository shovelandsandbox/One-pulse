let localeNumberFormatApi = null;

export const setLocale = (locale) => {
    locale = locale ? locale : "ms-MY";
    localeNumberFormatApi = Intl.NumberFormat(locale);
};

export const getLocaleFormatCurrency = (number) => {
    if (!localeNumberFormatApi || Number.isNaN(Number(number))) {
        return number;
    }
    return localeNumberFormatApi.format(number);
};