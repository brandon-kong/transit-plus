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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-separator";

const LoginModal = ({ open, setOpen }: LoginModalContext) => {
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogContent id="login-dialog">
                <DialogHeader className='pb-4'>
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
                    <Input placeholder="Email" name="email" className="transition-all h-12" />
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

                <Button variant={"outline"} className="flex gap-2 relative h-12">
                    <Image 
                    src={'/icons/brand/google.svg'} 
                    alt="Workflow" width={20} height={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                    Continue with Google
                </Button>

                <Button variant={"outline"} className="flex gap-2 relative h-12">
                    <Image 
                    src={'/icons/brand/apple.svg'} 
                    alt="Workflow" width={20} height={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                    Continue with Apple
                </Button>

                <Button variant={"outline"} className="flex gap-2 relative h-12">
                    <Image 
                    src={'/icons/brand/phone.svg'} 
                    alt="Workflow" width={20} height={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                    Continue with Phone
                </Button>

                <Button variant={"outline"} className="flex gap-2 relative h-12">
                    <Image 
                    src={'/icons/brand/mail.svg'} 
                    alt="Workflow" width={20} height={20}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    />
                    Continue with Email
                </Button>


                
                
               </div>
            </DialogContent>
        </Dialog>
    )
};

export default LoginModal;