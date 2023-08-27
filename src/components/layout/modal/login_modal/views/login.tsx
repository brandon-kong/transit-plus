import { InputWithLabel, PhoneInput } from "@/components/input/inputbox"
import { SocialButton } from "@/components/input/buttons"
import { Button } from "@/components/ui/button"

import { signIn } from "next-auth/react"

import { useLoginStore } from "@/lib/state/login"
import { sendPhoneOTP, userExistsWithEmail } from "@/lib/auth/util"

export default function LoginModalLoginView () {
    const signInWithGoogle = () => {
        // TODO: callback url should be dynamic

        signIn('google', { callbackUrl: 'http://localhost:3000/' })
    }

    const setView = useLoginStore((state) => state.setView)
    const emailOrPhone = useLoginStore((state) => state.emailOrPhone)
    const setEmailOrPhone = useLoginStore((state) => state.setEmailOrPhone)
    const setLoading = useLoginStore((state) => state.setLoading)
    const email = useLoginStore((state) => state.email)
    const setEmail = useLoginStore((state) => state.setEmail)

    const phone = useLoginStore((state) => state.phone)
    const setPhone = useLoginStore((state) => state.setPhone)
    const countryCode = useLoginStore((state) => state.countryCode)
    const setCountryCode = useLoginStore((state) => state.setCountryCode)

    const attemptEmailLogin = async () => {
        setLoading(true)
       
        const userExists = await userExistsWithEmail(email)
        if (userExists.status_code === 200) {
            const detail = userExists.detail as { exists: boolean, user_id: string }
            if (detail.exists) {
                setView('email-verify');
            }
            else {
                setView('email-register');
            }
            
            return;
        }

        // TODO: handle error

        setLoading(false)
    }

    const attemptPhoneSendOTP = async () => {
        setLoading(true)
       
        const sentOTP = await sendPhoneOTP(phone, countryCode)
        if (sentOTP.status_code === 200) {
            setView('otp-verify');
            return;
        }

        // TODO: handle error

        setLoading(false)
    }

    const handleContinue = () => {
        if (emailOrPhone === 'email') {
            attemptEmailLogin()
        } else {
            attemptPhoneSendOTP()
        }
    }

    return (
        <div className="flex flex-col gap-4 mt-4">

            {
                emailOrPhone === 'email' ? (
                <InputWithLabel
                label="Email"
                placeholder="Email"
                name="email"
                className="transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                ) : (
                    <PhoneInput
                    changed={({ dialCode, phone }) => {
                        setPhone(phone)
                        setCountryCode(dialCode)
                    }}
                    />
                )
            }
            

            <Button onClick={handleContinue} size={'lg'} className={'my-4 bg-black hover:bg-gray-900 h-12'}>
                Continue
            </Button>

            <div className="flex mb-4 justify-center items-center gap-4 w-full">
                <hr className="w-full" />
                or
                <hr className="w-full" />
            </div>

            <SocialButton
            onClick={signInWithGoogle}
            src={'/icons/brand/google.svg'}
            >
            Continue with Google
            </SocialButton>

            {
                emailOrPhone === 'email' ? (
                    <SocialButton
                    onClick={() => setEmailOrPhone('phone')}
                    src={'/icons/brand/phone.svg'}
                    >
                    Continue with Phone
                    </SocialButton>
                ) : (
                    <SocialButton
                    onClick={() => setEmailOrPhone('email')}
                    src={'/icons/brand/mail.svg'}
                    >
                    Continue with Email
                    </SocialButton>
                )
            }

        </div>
    )
}