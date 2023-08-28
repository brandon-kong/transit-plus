import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button"

import { useReportSafetyStore } from "@/lib/state/report_safety"
import { TypographyH4, TypographyP } from "@/components/typography"

import { DialogFooter } from "@/components/ui/dialog";
import { Input, } from "@/components/input/inputbox";


export default function ReportSafetyDateTimeView () {

    const { setView } = useReportSafetyStore((state) => ({ setView: state.setView }))

    return (
        <div className="flex flex-col gap-4 mt-4">

            <div className="flex justify-between">
                <TypographyH4>
                    When did this happen?
                </TypographyH4>
            </div>

            <DialogFooter>
                
                <Button 
                onClick={() => setView('location')}
                variant={'ghost'}>
                    Back
                </Button>

                <Button>
                    Continue
                </Button>
            </DialogFooter>
            
        </div>
    )
}