'use client';

import Image from "next/image";

import {
    Dialog,
    DialogContent,
    DialogTrigger,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogClose,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { TypographyH3, TypographyP } from "@/components/typography";
import { LoginModalContext } from "@/lib/providers/modals/LoginModal/context";
import { Input } from "@/components/input/inputbox";
import { Label } from "@/components/ui/label";
import { SocialButton } from "@/components/input/buttons";

const LoginModal = ({ open, setOpen }: LoginModalContext) => {
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent id="login-dialog" className="max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>
                       <TypographyH3>
                            Sign in to Transit+
                       </TypographyH3>
                    </DialogTitle>
                    <DialogDescription>
                        <TypographyP>
                            Log in or create an account to start earning by crowdsourcing.
                        </TypographyP>
                    </DialogDescription>
                </DialogHeader>
               <div className="flex flex-col gap-4 mt-4">
                
                <div>
                    <Label htmlFor="email" className="text-[#0F172A]">Email</Label>
                    <Input placeholder="Email" name="email" className="transition-all h-12" type="email" />
                </div>

                <div>
                    <Label htmlFor="password" className="text-[#0F172A]">Password</Label>
                    <Input placeholder="Password" name="password" className="transition-all h-12" type="password" />
                </div>

                <Button size={'lg'} className={'bg-[#35927B] hover:bg-[#15826B] h-12'}>
                    Login
                </Button>

                <div className="flex my-4 justify-center items-center gap-4 w-full">
                    <hr className="w-full" />
                    or
                    <hr className="w-full" />
                </div>

                <SocialButton
                src={'/icons/brand/google.svg'}
                >
                Continue with Google
                </SocialButton>

                <SocialButton
                src={'/icons/brand/apple.svg'}
                >
                Continue with Apple
                </SocialButton>

                <SocialButton
                src={'/icons/brand/phone.svg'}
                >
                Continue with Phone
                </SocialButton>

                <SocialButton
                src={'/icons/brand/mail.svg'}
                >
                Continue with Email
                </SocialButton>

               </div>
            </DialogContent>
        </Dialog>
    )
};

export default LoginModal;