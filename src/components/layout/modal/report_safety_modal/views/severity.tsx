import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button"

import { useReportSafetyStore } from "@/lib/state/report_safety"
import { TypographyH4, TypographyP } from "@/components/typography"

import { DialogFooter } from "@/components/ui/dialog";
import { Input, InputWithLabel, TextareaWithLabel, } from "@/components/input/inputbox";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CloseButton } from "@/components/input/buttons";


export default function ReportSafetySeverityView () {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const setView = useReportSafetyStore((state) => state.setView)
    
    const severity = useReportSafetyStore((state) => state.severity)
    const setSeverity = useReportSafetyStore((state) => state.setSeverity)

    const additionalDetails = useReportSafetyStore((state) => state.additional_info)
    const setAdditionalDetails = useReportSafetyStore((state) => state.setAdditionalInfo)

    const files = useReportSafetyStore((state) => state.files)
    const setFiles = useReportSafetyStore((state) => state.setFiles)

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

            <input ref={fileInputRef} type="file" multiple name="file" id="file" accept="image/png, image/jpg, image/jpeg" className="hidden"
            onChange={(e) => {
                if (e.target.files) {
                    for (let i = 0; i < e.target.files.length; i++) {
                        const file = e.target.files[i];
                        const newFile = {
                            name: file.name,
                            url: URL.createObjectURL(file),
                        }

                        if (file.size > 10000000) {
                            alert('File size must be less than 10MB')
                            continue;
                        }

                        setFiles([...files, newFile])
                    }
                }
            }}
            />
            
                <ScrollArea className="max-h-[200px] md:max-h-[300px]">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 border rounded-md p-4 border-dashed">
                    
                <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col gap-3 items-center justify-center border py-3 px-2 rounded-md border-gray-500 hover:bg-gray-100 cursor-pointer h-32">
                        <div className="flex items-center justify-center">
                            <Image
                            src={'/icons/action/camera.svg'}
                            alt="Transit+ Logo"
                            width={20}
                            height={20}
                            className="select-none"
                            />
                        </div>

                        <TypographyP className="text-gray-500 text-xs">
                            Add a photo
                        </TypographyP>
                    </div>
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
                                <CloseButton 
                                onClick={() => {
                                    const newFiles = [...files]
                                    newFiles.splice(index, 1)
                                    setFiles(newFiles)
                                }}

                                className="absolute top-1 right-1 scale-75" />
                            </div>
                            <TypographyP className="text-xs text-gray-500">
                                {file.name}
                            </TypographyP>
                        </div>
                        ))
                    }

                    
                </div>
                
                </ScrollArea>
                <TypographyP className="text-sm">
                    Photos are optional, but may help us better understand the situation.
                </TypographyP>
                
            

            <DialogFooter>
                
                <Button 
                onClick={() => setView('incident')}
                variant={'ghost'}>
                    Back
                </Button>

                <Button
                disabled={!severity}
                onClick={() => setView('review')}
                >
                    Continue
                </Button>
            </DialogFooter>
            
        </div>
    )
}