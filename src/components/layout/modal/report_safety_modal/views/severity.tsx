import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"

import { useReportSafetyStore } from "@/lib/state/report_safety"
import { TypographyH4, TypographyP } from "@/components/typography"

import { DialogFooter } from "@/components/ui/dialog";
import { Input, InputWithLabel, TextareaWithLabel, } from "@/components/input/inputbox";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";


export default function ReportSafetySeverityView () {

    const setView = useReportSafetyStore((state) => state.setView)
    
    const severity = useReportSafetyStore((state) => state.severity)
    const setSeverity = useReportSafetyStore((state) => state.setSeverity)

    const additionalDetails = useReportSafetyStore((state) => state.additional_info)
    const setAdditionalDetails = useReportSafetyStore((state) => state.setAdditionalInfo)

    return (
        <div className="flex flex-col gap-4 mt-4 w-full">

            <div className="flex justify-between">
                <TypographyH4>
                    Severity of Concern
                </TypographyH4>
            </div>

            <div className="flex w-full">
                <Button
                onClick={() => setSeverity('Low')}
                className={`w-full rounded-r-none bg-yellow-500 transition-all hover:bg-yellow-600 text-white ${severity === 'Low' && 'ring-2 ring-black z-10'}`}
                >
                    Low
                </Button>
                <Button
                onClick={() => setSeverity('Medium')}
                className={`w-full rounded-none bg-orange-500 transition-all hover:bg-orange-600 text-white ${severity === 'Medium' && 'ring-2 ring-black z-10'}`}
                >
                    Medium
                </Button>
                <Button
                onClick={() => setSeverity('High')}
                className={`w-full rounded-l-none bg-red-600 transition-all hover:bg-red-700 text-white ${severity === 'High' && 'ring-2 ring-black z-10'}`}
                >
                    High
                </Button>

            </div>

            <hr className="border-gray-200 h-1" />

            <div>
                <TextareaWithLabel
                label="Additional Details"
                placeholder="Please provide any additional details that you think may be helpful."
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                
                />
            </div>

            <DialogFooter>
                
                <Button 
                onClick={() => setView('location')}
                variant={'ghost'}>
                    Back
                </Button>

                <Button
                onClick={() => setView('incident')}
                >
                    Continue
                </Button>
            </DialogFooter>
            
        </div>
    )
}