import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ButtonProps } from "@/components/ui/button";

export const SocialButton = ({ src, children, className, ...props }: {
    src: string;
    children: React.ReactNode;
    className?: string;
} & ButtonProps) => (
    <Button
     variant={"outline"} className={`flex gap-2 relative h-12 ${className}`}
     {...props}
     >
        <Image 
        src={src} 
        alt="Google Logo"
        width={24}
        height={24}
        className="absolute left-4 top-1/2 transform -translate-y-1/2"
        
        />
        <span className="flex-1 flex justify-center items-center">
            {children}
        </span>
    </Button>
)