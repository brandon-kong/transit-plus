import { InputWithLabel, Input } from "@/components/input/inputbox"
import { Button } from "@/components/ui/button"

import { signIn } from "next-auth/react"

import { useLoginStore } from "@/lib/state/login"
import { registerUserWithPhone } from "@/lib/auth/util"

import { useLoginModal } from "@/lib/providers/modals/LoginModal/context"

export default function PhoneRegisterView () {
    const { setOpen } = useLoginModal()

    const setLoading = useLoginStore((state) => state.setLoading)
    const email = useLoginStore((state) => state.email)
    const setEmail = useLoginStore((state) => state.setEmail)
    const otp = useLoginStore((state) => state.otp)
    const countryCode = useLoginStore((state) => state.countryCode)
    const phone = useLoginStore((state) => state.phone)
    const birth_date = useLoginStore((state) => state.dateOfBirth)
    const setBirthDate = useLoginStore((state) => state.setDateOfBirth)

    const firstName = useLoginStore((state) => state.firstName)
    const setFirstName = useLoginStore((state) => state.setFirstName)
    const lastName = useLoginStore((state) => state.lastName)
    const setLastName = useLoginStore((state) => state.setLastName)

    const attemptPhoneRegister = async () => {
        setLoading(true)

        const registered = await registerUserWithPhone({
            email,
            firstName,
            lastName,
            birth_date,
            phone,
            countryCode,
            otp
        })

        if (registered.status_code === 201) {
            // sign in
            const signedIn = await signIn('phone-otp', {
                phone,
                token: otp,
                country_code: countryCode,

                callbackUrl: 'http://localhost:3000/'
            })

            if (!signedIn?.error) {
                setLoading(false)
                setOpen(false)
            }
            else {
                // TODO: handle error
            }
        }
        else {
            // TODO: handle error
        }


    }

    return (
        <div className="flex flex-col gap-4 mt-4">

            <div>
                <Input 
                placeholder="First Name"
                name="first_name"
                className="rounded-b-none border-b-0"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
                <Input 
                placeholder="Last Name"
                name="last_name"
                className="rounded-t-none border-t-0"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <InputWithLabel
            label="Email"
            placeholder="Email"
            name="email"
            className="transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />

            <InputWithLabel
            label="Date of Birth"
            placeholder="Date of Birth"
            name="date_of_birth"
            className="transition-all"
            type="date"
            value={birth_date}
            onChange={(e) => setBirthDate(e.target.value)}
            />
               
            <Button onClick={attemptPhoneRegister} size={'lg'} className={'my-4 bg-black hover:bg-gray-900 h-12'}>
                Finish Registration
            </Button>

        </div>
    )
}