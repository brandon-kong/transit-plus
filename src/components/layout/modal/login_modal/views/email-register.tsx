import { InputWithLabel, Input } from "@/components/input/inputbox"
import { Button } from "@/components/ui/button"

import { signIn } from "next-auth/react"

import { useLoginStore } from "@/lib/state/login"
import { registerUserWithEmail, registerUserWithPhone } from "@/lib/auth/util"

import { useLoginModal } from "@/lib/providers/modals/LoginModal/context"

import { useSearchParams } from "next/navigation"

export default function EmailRegisterView () {
    const searchParams = useSearchParams()
    const { setOpen } = useLoginModal()

    const setLoading = useLoginStore((state) => state.setLoading)
    const email = useLoginStore((state) => state.email)
    const setEmail = useLoginStore((state) => state.setEmail)
    const countryCode = useLoginStore((state) => state.countryCode)
    const birth_date = useLoginStore((state) => state.dateOfBirth)
    const setBirthDate = useLoginStore((state) => state.setDateOfBirth)

    const password = useLoginStore((state) => state.password)
    const setPassword = useLoginStore((state) => state.setPassword)

    const firstName = useLoginStore((state) => state.firstName)
    const setFirstName = useLoginStore((state) => state.setFirstName)
    const lastName = useLoginStore((state) => state.lastName)
    const setLastName = useLoginStore((state) => state.setLastName)

    const attemptEmailRegister = async () => {
        setLoading(true)

        const registered = await registerUserWithEmail({
            email,
            firstName,
            lastName,
            birth_date,
            password
        })

        if (registered.status_code === 201) {
            // sign in

            let callback = 'http://localhost:3000/'
            if (searchParams.has('redirect')) {
                callback = `http://localhost:3000/${searchParams.get('redirect') as string}`
            }
            const signedIn = await signIn('email-password', {
                email,
                password,

                callbackUrl: callback
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

        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-4 mt-4">

            <div className="flex flex-col">
                <Input 
                autoFocus
                placeholder="First Name"
                name="first_name"
                className="rounded-b-none border-b-0 focus:z-10"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
                <Input 
                placeholder="Last Name"
                name="last_name"
                className="rounded-t-none border-t-0 focus:z-10"
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
            type="password"
            label="Password"
            placeholder="Password"
            name="password"
            className="transition-all"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
               
            <Button onClick={attemptEmailRegister} size={'lg'} className={'my-4 bg-black hover:bg-gray-900 h-12'}>
                Finish Registration
            </Button>

        </div>
    )
}