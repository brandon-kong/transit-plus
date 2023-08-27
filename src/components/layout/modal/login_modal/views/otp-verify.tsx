import { InputWithLabel, PinInput } from "@/components/input/inputbox"
import { Button } from "@/components/ui/button"

import { signIn } from "next-auth/react"
import { verifyPhoneOTP, userExistsWithPhone } from "@/lib/auth/util"

import { useLoginStore } from "@/lib/state/login"

export default function OTPVerifyView () {

    const setView = useLoginStore((state) => state.setView)
    const setLoading = useLoginStore((state) => state.setLoading)

    const phone = useLoginStore((state) => state.phone)
    const countryCode = useLoginStore((state) => state.countryCode)
    
    const otp = useLoginStore((state) => state.otp)
    const setOtp = useLoginStore((state) => state.setOtp)

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
               
            <Button onClick={attemptVerifyOtp} size={'lg'} className={'my-4 bg-black hover:bg-gray-900 h-12'}>
                Continue
            </Button>

        </div>
    )
}