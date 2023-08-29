import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"

import { useReportSafetyStore } from "@/lib/state/report_safety"
import { TypographyH4, TypographyP } from "@/components/typography"

import { DialogFooter } from "@/components/ui/dialog";
import { Input, InputWithLabel, } from "@/components/input/inputbox";
import { Calendar } from "@/components/ui/calendar";


export default function ReportSafetyDateTimeView () {

    const setView = useReportSafetyStore((state) => state.setView)
    const date = useReportSafetyStore((state) => state.date)
    const setDate = useReportSafetyStore((state) => state.setDate)
    
    const time = useReportSafetyStore((state) => state.time)
    const setTime = useReportSafetyStore((state) => state.setTime)

    return (
        <div className="flex flex-col gap-4 mt-4">

            <div className="flex justify-between">
                <TypographyH4>
                    When did this happen?
                </TypographyH4>
            </div>

            <div className="flex flex-col gap-2">
                <Calendar 
                className="w-full m-auto"
                mode="single"
                selected={new Date(date as string)}
                onSelect={(date) => setDate(date?.toISOString())}

                disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                }
                />

                <div>
                    <InputWithLabel label="Time"
                    type="time"
                    placeholder="Time"

                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    />
                </div>
            </div>

            <DialogFooter>
                
                <Button 
                onClick={() => setView('location')}
                variant={'ghost'}>
                    Back
                </Button>

                <Button
                onClick={() => setView('incident')}
                disabled={!date || !time}
                >
                    Continue
                </Button>
            </DialogFooter>
            
        </div>
    )
}