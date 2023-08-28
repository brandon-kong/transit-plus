import { Input as ShadInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import dial_codes from "@/lib/user-preferences/dial_codes";
import { cn } from "@/lib/utils";
import { useState } from "react";

import Image from "next/image";

import { AsYouType, CountryCode } from 'libphonenumber-js/min';
import { TypographyP } from "@/components/typography";

export const Input = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ShadInput>) => (
    <ShadInput
        className={cn(
            "bg-gray-100 focus:bg-white transition-all placeholder:text-gray-800 h-12",
            className
        )}
        {...props}
    />
)

export const InputWithLabel = ({ label, className, ...props }: {
    label: string;
    className?: string;
} & React.ComponentPropsWithoutRef<typeof ShadInput>) => (
    <div className={cn("flex flex-col gap-2")}>
        <Label className="text-gray-500 text-xs ml-2 select-none">{label}</Label>
        <Input className={className} {...props} />
    </div>
)

export const PhoneInput = ({ className, changed, ...props }: {
    changed?: (value: { dialCode: string, phone: string, formattedPhone: string }) => void;
} & React.ComponentPropsWithoutRef<typeof ShadInput>) => {
    const [phoneInput, setPhoneInput] = useState<string>('');
    const [selectionValue, setSelectionValue] = useState<string>('United States:+1:US');
    const [dialCode, setDialCode] = useState<string>('+1');
    const [country, setCountry] = useState<string>('United States');
    const [countryCode, setCountryCode] = useState<CountryCode>('US');
    const [formattedPhoneInput, setFormattedPhoneInput] = useState<string>('');
    
    const handleDialCodeChange = (value: string) => {

        const [country, dialCode, country_code] = value.split(':');

        setSelectionValue(value);
        setDialCode(dialCode);
        setCountry(country);
        setCountryCode(country_code as CountryCode);

        // get rid of spaces and parenthesis and dashes
        const phone = phoneInput.replace(/[\s\(\)\-]/g, '');
        const formatted = formatPhoneInput(phone, country_code as CountryCode);

        changed && changed({ dialCode, phone: formatted, formattedPhone: formattedPhoneInput });
    };

    const handlePhoneInputChange = (e: any) => {
        const value: string = e.target.value;

        setPhoneInput(value);
        const formatted = formatPhoneInput(value);

        changed && changed({ dialCode, phone: formatted, formattedPhone: formatted });
    };

    const formatPhoneInput = (value: string, country_code?: CountryCode) => {
        const formatter = new AsYouType(country_code || countryCode);

        if (!value) {
            setFormattedPhoneInput('');
            return '';
        }

        value = value.toString();
        if (value.includes('(') && !value.includes(')')) {
            const rem = value.replace('(', '');

            setFormattedPhoneInput(rem);
            return rem;
        }

        const formattedValue = formatter.input(value);
        setPhoneInput(formattedValue);
        setFormattedPhoneInput(formattedValue);

        changed && changed({ dialCode, phone: formattedValue, formattedPhone: formattedValue });
        return formattedValue;
    };

    return (
        <div>
            <Select onValueChange={handleDialCodeChange}>
                <SelectTrigger className="bg-gray-100 px-4 z-50 h-12 transition-all rounded-b-none data-[state=open]:z-10 data-[state=open]:bg-white data-[state=open]:ring-2 data-[state=open]:ring-black">
                    <SelectValue className="text-gray-800">
                        {country} ({dialCode})
                    </SelectValue>
                </SelectTrigger>

                    
                <SelectContent >
                    <ScrollArea className={'h-[400px]'}>
                        { dial_codes.map((code => (
                            <SelectItem
                            key={code.dial_code + code.country}
                            className="text-gray-800"
                            value={`${code.country}:${code.dial_code}:${code.code}`}
                            >
                                {code.country} ({code.dial_code})
                            </SelectItem>
                        )))
                        }
                    </ScrollArea>
                    
                </SelectContent>
                
            </Select>
            <div className="flex">
                <div className="flex bg-gray-100 border rounded-bl-md border-r-0 border-t-0 items-center justify-center px-4">
                    <TypographyP className="text-gray-500 text-xs w-full select-none">
                        { dialCode }
                    </TypographyP>
                </div>
                
                
                <ShadInput
                onChange={handlePhoneInputChange}
                value={formattedPhoneInput}
                placeholder="Phone Number"
                className={cn(
                    "bg-gray-100 focus:bg-white rounded-t-none transition-all border-t-0 border-l-0 rounded-bl-none placeholder:text-gray-800 h-12",
                    className
                )}
                {...props}
            />
            </div>
            
        </div>
    )
}

export const PinInput = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ShadInput>) => (
    <ShadInput
        className={cn(
            "bg-gray-100 focus:bg-white placeholder:text-gray-800 h-12",
            className
        )}
        {...props}
    />
)

export const MapSearchOverlay = () => {
    const [search, setSearch] = useState<string>('');
    const [results, setResults] = useState<string[]>([]);

    const [focused, setFocused] = useState<boolean>(false);

    return (
        <div className="flex flex-col">
            <Input 
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}

            placeholder="Search for a location"
            className="w-full bg-white drop-shadow-md pointer-events-auto focus:rounded-b-none focus:z-10"
            />

            {
                focused && (
                    <div className="drop-shadow-md">

                        <LocationSearch
                        isLast
                        >
                            <Image
                            src="/icons/nav/navigation.svg"
                            width={18}
                            height={18}
                            alt="Use my current location"
                            />

                            <TypographyP>
                                Use my current location
                            </TypographyP>
                        </LocationSearch>
                    </div>
                )
            }
        </div>
        
    )
}

const LocationSearch = ({ children, isLast }: { children: React.ReactNode, isLast: boolean }) => {
    return (
        <div className={`pointer-events-auto transition-colors font-mono flex gap-2 bg-white p-4 cursor-pointer ${isLast ? 'rounded-b-lg' : 'rounded-b-none'} hover:bg-gray-50`}>
            { children }
        </div>
    )
}