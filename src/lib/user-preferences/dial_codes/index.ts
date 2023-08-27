import codes from 'country-calling-code';
import type { ICountryCodeItem } from 'country-calling-code';

import type { CountryCode as PhoneCountryCodeType } from 'libphonenumber-js';

type CountryCode = {
    country: string;
    code: PhoneCountryCodeType;
    dial_code: string;
};

const dial_codes: CountryCode[] = [];

codes.forEach((code: ICountryCodeItem) => {
    code.countryCodes.forEach((countryCode: string) => {
        dial_codes.push({
            country: code.country,
            code: code.isoCode2 as PhoneCountryCodeType,
            dial_code: `+${countryCode}`,
        });
    });
});

export default dial_codes;
