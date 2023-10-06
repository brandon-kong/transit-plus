import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ButtonProps } from '@/components/ui/button';

export const SocialButton = ({
    src,
    children,
    className,
    ...props
}: {
    src: string;
    children: React.ReactNode;
    className?: string;
} & ButtonProps) => (
    <Button variant={'outline'} className={`flex gap-2 relative h-12 ${className}`} {...props}>
        <Image
            src={src}
            alt="Google Logo"
            width={24}
            height={24}
            className="absolute left-4 top-1/2 transform -translate-y-1/2"
        />
        <span className="flex-1 flex justify-center items-center">{children}</span>
    </Button>
);

export const IconButton = ({
    src,
    alt,
    className,
    ...props
}: {
    src: string;
    alt: string;
    className?: string;
} & ButtonProps) => (
    <Button
        variant={'outline'}
        className={`flex border-none gap-2 w-fit aspect-square mb-4 relative rounded-full ${className}`}
        {...props}
    >
        <Image
            src={src || '/icons/action/close.svg'}
            alt={alt}
            width={24}
            height={24}
            className="absolute top-1/2 transform -translate-y-1/2"
        />
    </Button>
);

export const CloseButton = ({
    className,
    ...props
}: {
    className?: string;
} & ButtonProps) => (
    <IconButton src={'/icons/action/close.svg'} alt={'Close Icon'} className={`${className}`} {...props} />
);

export const BackButton = ({
    className,
    ...props
}: {
    className?: string;
} & ButtonProps) => (
    <IconButton src={'/icons/action/back.svg'} alt={'Back Icon'} className={`${className}`} {...props} />
);

export const DeleteButton = ({
    className,
    ...props
}: {
    className?: string;
} & ButtonProps) => (
    <IconButton src={'/icons/action/back.svg'} alt={'Back Icon'} className={`${className}`} {...props} />
);
