import { Input as ShadInput } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import dial_codes from "@/lib/user-preferences/dial_codes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

import Image from "next/image";

import { AsYouType, CountryCode } from 'libphonenumber-js/min';
import { TypographyP } from "@/components/typography";

import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
import { BlackSpinner } from "@/components/spinner";
import { Textarea as ShadTextarea } from "@/components/ui/textarea";

export const Input = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ShadInput>) => (
    <ShadInput
        className={cn(
            "bg-gray-100 focus:bg-white transition-all placeholder:text-gray-400 h-12",
            className
        )}
        {...props}
    />
)

export const Textarea = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ShadTextarea>) => (
    <ShadTextarea
        className={cn(
            "bg-gray-100 focus:bg-white transition-all placeholder:text-gray-400 h-12",
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

export const TextareaWithLabel = ({ label, className, ...props }: {
    label: string;
    className?: string;
} & React.ComponentPropsWithoutRef<typeof ShadTextarea>) => (
    <div className={cn("flex flex-col gap-2")}>
        <Label className="text-gray-500 text-xs ml-2 select-none">{label}</Label>
        <Textarea className={className} {...props} />
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

export const MapSearchOverlay = ({ onChange }: {
    onChange?: (placeDetails: any) => void;
}) => {

    const [placeDetails, setPlaceDetails] = useState<any>(null);
    const [text, setText] = useState<string>('');
    const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

    const [currentLocation, setCurrentLocation] = useState<any>(null);

    const { placesService, placePredictions, getPlacePredictions, isPlacePredictionsLoading } = usePlacesService({
        //apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    });

    useEffect(() => {
        // fetch place details for the first element in placePredictions array
        if (placePredictions.length > 0)
            placesService?.getDetails(
                {
                    placeId: placePredictions[0].place_id,
                },
                (placeDetails: any) => setPlaceDetails(placeDetails),
            );

        window.onclick = function (event: any) {
            if (event.target.id !== 'address-input') {
                setShowSuggestions(false);
            }
        };
    }, [placePredictions, placesService]);

    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                setCurrentLocation(pos);

                // get place details for current location

                placesService?.findPlaceFromQuery(
                    {
                        query: 'current location',
                        fields: ['formatted_address', 'geometry', 'place_id'],
                    },
                    (results: any) => {
                        placesService?.getDetails(
                            {
                                placeId: results[0].place_id,
                            },
                            (placeDetails: any) => {
                                const po2 = {
                                    lat: () => pos.lat,
                                    lng: () => pos.lng,
                                };

                                
                                placeDetails.geometry.location = po2;
                                setPlaceDetails(placeDetails);
                                onChange && onChange(placeDetails);
                                setText(placeDetails.formatted_address);
                            },
                        );
                    },
                );
            });
        }
    };

    return (
        <div className="flex flex-col pointer-events-auto" id="address-input">  

            <div className="relative w-full flex items-center">
                <Input 
                autoComplete="off"
                id="address-input"
                onFocus={() => setShowSuggestions(true)}

                placeholder="Search for a location"
                className={`w-full bg-white drop-shadow-md pr-14 pointer-events-auto ${ showSuggestions && 'rounded-b-none z-10' }`}
                
                value={text}

                onChange={evt => {
                    getPlacePredictions({ input: evt.target.value });
                    setText(evt.target.value);
                }}
                />
                {
                    isPlacePredictionsLoading && (
                        <BlackSpinner className={`absolute right-4 ${ showSuggestions && 'z-10' }`} />
                    )
                }
                
            </div>

            {showSuggestions && 
            (

                <div className=" rounded-lg rounded-t-none bg-white py-2 z-10 border-gray-300 border border-t-0 drop-shadow-md">
                    {placePredictions.map((item, index) => (
                        <LocationSearch
                        key={item.place_id}
                        isLast={index === placePredictions.length - 1}

                        onClick={() => {
                            placesService?.getDetails(
                                {
                                    placeId: item.place_id,
                                },
                                (placeDetails: any) => {
                                    setPlaceDetails(placeDetails);
                                    onChange && onChange(placeDetails);
                                    setText(placeDetails.formatted_address);

                                    setShowSuggestions(false);
                                },
                            );
                        }}
                        >
                            <div className={'p-2 rounded-full bg-accent'}>
                                <Image
                                src="/icons/nav/navigation.svg"
                                width={16}
                                height={16}
                                alt="Use my current location"
                                />
                            </div>

                            <div className={'flex flex-col'}>
                                <TypographyP className={'text-sm'}>
                                    { item.structured_formatting.main_text }
                                </TypographyP>
                                <TypographyP className={'text-gray-400 text-xs'}>
                                    { item.structured_formatting.secondary_text }
                                </TypographyP>
                            </div>
                            
                        </LocationSearch>
                    ))}

                    {
                        (placePredictions.length === 0 && !isPlacePredictionsLoading) && (
        
                                
                                <LocationSearch
                                onClick={() => getUserLocation()}
                                isLast
                                >
                                    <div className={'p-2 rounded-full bg-accent'}>
                                        <Image
                                        src="/icons/nav/navigation.svg"
                                        width={16}
                                        height={16}
                                        alt="Use my current location"
                                        />
                                    </div>
                                    
        
                                    <TypographyP>
                                        Use my current location
                                    </TypographyP>
                                </LocationSearch>
                        )
                    }
                    </div>
                )
            }

            
        </div>
        
    )
}

const LocationSearch = ({ children, isLast, onClick }: { children: React.ReactNode, isLast: boolean, onClick: () => void }) => {
    return (
        <div onClick={onClick} className={` z-20 pointer-events-auto transition-colors font-mono flex items-center gap-2 bg-white py-2 px-4 cursor-pointer ${isLast ? 'rounded-b-lg' : 'rounded-b-none'} hover:bg-gray-50`}>
            { children }
        </div>
    )
}