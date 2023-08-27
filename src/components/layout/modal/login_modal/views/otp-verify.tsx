import { InputWithLabel, PinInput } from "@/components/input/inputbox"
import { Button } from "@/components/ui/button"

import { signIn } from "next-auth/react"
import { verifyPhoneOTP, userExistsWithPhone, sendPhoneOTP, callUserWithOTP } from "@/lib/auth/util"

import { useLoginStore } from "@/lib/state/login"
import { DialogFooter } from "@/components/ui/dialog"
import Image from "next/image"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"

import { useLoginModal } from "@/lib/providers/modals/LoginModal/context"
import { useState, useEffect } from "react"

export default function OTPVerifyView () {
    const { setOpen } = useLoginModal()

    const [canSendOTP, setCanSendOTP] = useState(false)
    const [secondsToResend, setSecondsToResend] = useState(30);

    const setView = useLoginStore((state) => state.setView)
    const setLoading = useLoginStore((state) => state.setLoading)

    const phone = useLoginStore((state) => state.phone)
    const countryCode = useLoginStore((state) => state.countryCode)
    
    const otp = useLoginStore((state) => state.otp)
    const setOtp = useLoginStore((state) => state.setOtp)

    useEffect(() => {
        if (!canSendOTP) {
            const b = setInterval(() => {
                if (secondsToResend > 0) {
                    const newSecond = secondsToResend - 1
                    setSecondsToResend(newSecond)
                }
                else {
                    setCanSendOTP(true)
                    setSecondsToResend(30)
                    clearInterval(b)
                }
            }, 1000)

            return () => {
                clearInterval(b)
            }
        }
    }, [canSendOTP, secondsToResend])

    const attemptPhoneSendOTP = async () => {
        setLoading(true)
        setCanSendOTP(false)
        const sentOTP = await sendPhoneOTP(phone, countryCode)
        if (sentOTP.status_code === 200) {
            //return;
        }
    };

    const attemptPhoneCallOTP = async () => {
        setLoading(true)
        setCanSendOTP(false)
        const sentOTP = await callUserWithOTP(phone, countryCode)
        if (sentOTP.status_code === 200) {
            //return;
        }
    };
    
    const attemptVerifyOtp = async () => {
        setLoading(true)

        const otpVerified = await verifyPhoneOTP({
            phone,
            country_code: countryCode,
            otp
        })

        if (otpVerified.status_code === 200) {
            // check if user exists

            const userExists = await userExistsWithPhone(phone, countryCode)

            if (!(userExists.status_code === 200)) {
                // handle error

                setLoading(false)
                return;
            }

            const detail = userExists.detail as { exists: boolean, user_id: string }
            if (detail.exists) {
                // log them in

                const signedIn = await signIn('phone-otp', {
                    phone,
                    token: otp,
                    country_code: countryCode,

                    callbackUrl: 'http://localhost:3000/'
                })

                if (!signedIn?.error) {
                    setLoading(false)
                    setOpen(false);
                    
                }
                else {
                    // TODO: handle error
                }
                return;
            }

            else {
                // register them
                setView('phone-register');
                return;
            }
        }
        
        // TODO: handle error
    }

    return (
        <div className="flex flex-col gap-4 mt-4">

            <PinInput 
            autoFocus
            placeholder="Enter your one-time password"
            type="number"
            aria-controls="otp"

            className=""
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            />
               
            <DialogFooter className="flex justify-between items-center gap-2 relative">
                <Menubar className="border-none">
                    
                    <MenubarMenu>
                        <MenubarTrigger>
                            <Button variant={'ghost'} onClick={attemptVerifyOtp} size={'lg'} className={'flex gap-2 mt-4 h-12 data-[state=open]:bg-accent'}>
                                Options
                                <Image
                                src="/icons/action/down.svg"
                                alt="Options"
                                width={20}
                                height={20}
                                />
                            </Button>
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem
                            disabled={!canSendOTP}
                            onClick={attemptPhoneSendOTP}
                            >
                                Resend OTP { !canSendOTP && `(${secondsToResend})` }
                            </MenubarItem>
                            <MenubarItem
                            disabled={!canSendOTP}
                            onClick={attemptPhoneCallOTP}
                            >
                                Call me instead { !canSendOTP && `(${secondsToResend})` }
                            </MenubarItem>
                        </MenubarContent>
                    </MenubarMenu>
                </Menubar>
                
                <Button onClick={attemptVerifyOtp} size={'lg'} className={'mt-4 bg-black hover:bg-gray-900 w-full h-12'}>
                    Continue
                </Button>
            </DialogFooter>
            

        </div>
    )
}