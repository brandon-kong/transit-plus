import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"

import { useReportSafetyStore } from "@/lib/state/report_safety"
import { TypographyH4, TypographyP } from "@/components/typography"

import { DialogFooter } from "@/components/ui/dialog";
import { Input, InputWithLabel, TextareaWithLabel, } from "@/components/input/inputbox";
import { Calendar } from "@/components/ui/calendar";
import GoogleMapReact from "google-map-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { IncidentTypes } from "./incident";
import { useLoginModal } from "@/lib/providers/modals/LoginModal/context";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { BlackSpinner } from "@/components/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function ReportSafetyReviewView () {

    const { data: session, status } = useSession()
    const router = useRouter()
    const { setOpen: setLoginModalOpen } = useLoginModal()
    
    const setView = useReportSafetyStore((state) => state.setView)
    const date = useReportSafetyStore((state) => state.date)
    
    const time = useReportSafetyStore((state) => state.time)

    const location = useReportSafetyStore((state) => state.location)


    const confirmed = useReportSafetyStore((state) => state.confirmed)
    const setConfirmed = useReportSafetyStore((state) => state.setConfirmed)

    const typeOfIncident = useReportSafetyStore((state) => state.typeOfIncident)
    const incidentIfOther = useReportSafetyStore((state) => state.incidentIfOther)
    
    const severity = useReportSafetyStore((state) => state.severity)
    const additionalDetails = useReportSafetyStore((state) => state.additional_info)
    const files = useReportSafetyStore((state) => state.files)
    
    return (
        <div className="flex flex-col gap-4 mt-4">

            <ScrollArea className={'max-h-[200px] md:max-h-[500px]'}>
                <div className="flex flex-col gap-4 px-4 py-2 pb-48">
                    
                <div className="flex flex-col justify-between">
                    <TypographyH4>
                        Review your report
                    </TypographyH4>
                    <TypographyP className="text-sm">
                        Please review your report before submitting to ensure all information is correct.
                    </TypographyP>
                </div>
                    <div
                    className="h-[400px] w-full rounded-xl overflow-hidden"
                    >
                        <GoogleMapReact
                        yesIWantToUseGoogleMapApiInternals
                        defaultCenter={{ lat: location?.lat || 41.7, lng: location?.lng || -87.5 }}
                        defaultZoom={17}

                        options={{
                            streetViewControl: true,
                            gestureHandling: 'none',
                        }}
                        >
                            <IndicatorMarker
                            lat={location?.lat || 41.7}
                            lng={location?.lng || -87.5}
                            />
                        </GoogleMapReact>
                    </div>

                    <hr className="border-gray-200 h-1" />

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-2">
                            <TypographyH4>
                                Date
                            </TypographyH4>
                            <InputWithLabel
                            disabled
                            label="Date"
                            type="date"
                            value={date}
                            />
                        </div>

                        
                        <div className="flex flex-col gap-2">
                            <TypographyH4>
                                Time
                            </TypographyH4>
                            <InputWithLabel
                            label="Time"
                            disabled
                            type="time"
                            value={time}
                            />
                        </div>
                    </div>

                    <hr className="border-gray-200 h-1" />
                    
                    <div className="flex flex-col gap-2">
                        <TypographyH4>
                            Type of incident
                        </TypographyH4>
                        <IncidentCard
                        title={typeOfIncident as string}
                        description={IncidentTypes.find((incident) => incident.title === typeOfIncident)?.description || ''}
                        />

                        {
                            typeOfIncident === 'Other' && (
                                <InputWithLabel
                                disabled
                                value={incidentIfOther}
                                label={'Please specify'}
                                placeholder={'Please specify'}
                                />
                            )
                        }
                    </div>

                    <hr className="border-gray-200 h-1" />

                    <div className="flex flex-col gap-4">
                        <TypographyH4>
                            Severity of Concern
                        </TypographyH4>

                        <div className="flex w-full">
                            <Button
                            className={`w-full cursor-default rounded-r-none bg-gray-200 hover:bg-gray-200 transition-all text-black ${severity === 'Low' && 'ring-2 ring-black z-10 bg-yellow-500 hover:bg-yellow-500 text-white'}`}
                            >
                                Low
                            </Button>
                            <Button
                            className={`w-full cursor-default rounded-none bg-gray-200 hover:bg-gray-200 transition-all text-black ${severity === 'Medium' && 'ring-2 ring-black z-10 bg-orange-500 hover:bg-orange-500 text-white'}`}
                            >
                                Medium
                            </Button>
                            <Button
                            className={`w-full cursor-default rounded-l-none bg-gray-200 hover:bg-gray-200 transition-all  text-black ${severity === 'High' && 'ring-2 ring-black z-10 text-white bg-red-600 hover:bg-red-600'}`}
                            >
                                High
                            </Button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <TypographyH4>
                            Additional Details
                        </TypographyH4>
                        <TextareaWithLabel
                        disabled
                        label="Additional Details"
                        placeholder="Please provide any additional details that you think may be helpful."
                        value={additionalDetails}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-4">
                        <TypographyH4>
                            Attachments
                        </TypographyH4>

                         {
                            files.map((file, index) => (
                                <div key={index} className="flex flex-col gap-2">
                                    <div className="relative w-full h-32">
                                        <Image
                                        src={file.url}
                                        alt="Transit+ Logo"
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-md"
                                        />
                                    </div>
                                    <TypographyP className="text-xs text-gray-500">
                                        {file.name}
                                    </TypographyP>
                                </div>
                                ))
                            }
                            {
                                files.length === 0 && (
                                    <TypographyP className="text-xs text-gray-500">
                                        No attachments
                                    </TypographyP>
                                )
                            }
                    </div>

                    <hr className="border-gray-200 h-1" />

                    <div className="flex flex-col gap-4">
                        <TypographyP>
                            All reports are anonymous and will be reviewed by our team.
                            If you would like to be contacted, please include your contact information in the additional details.
                        </TypographyP>

                        <TypographyP>
                            By submitting this report, you are agreeing to our <Link href="#" className="text-primary underline">Terms of Service</Link> and <Link href="#" className="text-primary underline">Privacy Policy</Link>.
                        </TypographyP>

                        <Alert variant={'destructive'} className="bg-red-50">
                            <AlertTitle>
                                This is not a substitute for emergency services.
                            </AlertTitle>
                            <AlertDescription>
                                If you or someone else is in immediate danger, please call 911.
                            </AlertDescription>
                        </Alert>

                        {
                            status === 'loading' && (
                                <BlackSpinner />
                            )
                        }

                        {
                            status === 'unauthenticated' && (
                        
                                <div className="flex flex-col gap-2">
                                    <TypographyP className="text-sm">
                                        You must be logged in to submit a report. We use this information to help prevent abuse of the system.
                                    </TypographyP>

                                    <Button 
                                    onClick={() => {
                                        router.replace('/report/safety?redirect=/report/safety?open')
                                        setLoginModalOpen(true)
                                    }}
                                    className="w-fit px-8">
                                        Login
                                    </Button>
                                </div>
                            )
                        }

                        {
                            status === 'authenticated' && (
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center space-x-2">

                                        <Checkbox
                                        id="confirm"
                                        name="confirm"
                                        checked={confirmed}
                                        onCheckedChange={(e) => setConfirmed(e.valueOf() as boolean)}
                                        />
                                        <Label 
                                        htmlFor="confirm"
                                        >
                                            I confirm that this report is accurate and true to the best of my knowledge.
                                        </Label>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </ScrollArea>

            

            <DialogFooter>
                
                <Button 
                onClick={() => setView('severity')}
                variant={'ghost'}>
                    Back
                </Button>

                <Button
                onClick={() => setView('incident')}
                disabled={!confirmed || status !== 'authenticated'}
                >
                    Submit
                </Button>
            </DialogFooter>
            
        </div>
    )
}

const IndicatorMarker = ({
    lat,
    lng
}: {
    lat: number
    lng: number
}) => {
    return (
        <div 
        className="h-10 w-10 translate-x-[-50%] translate-y-[-50%] relative flex items-center justify-center"
        >
            <div
            className="h-4 w-4 absolute z-20 rounded-full bg-red-500"
            />

           
             <div
            className="h-8 w-8 z-10 absolute rounded-full bg-red-300"
            />

            <div
            className="h-10 w-10 absolute animate-ping rounded-full bg-red-200"
            />
        </div>
    )
}

const IncidentCard = ({ title, description }: {
    title: string,
    description: string,
}) => {
    return (
        <Card className={`flex flex-col w-full items-start justify-start gap-2 p-4`}>
            <TypographyP className={'text-sm text-left w-full'}>
                {title}
            </TypographyP>
            <TypographyP className={'text-xs text-gray-500 text-left w-full'}>
                {description}
            </TypographyP>
        </Card>
    )
}