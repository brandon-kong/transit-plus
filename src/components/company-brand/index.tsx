import Image from 'next/image';

const GrayscaleCompany = ({
    src,
    alt,
    width,
    height,
    className,
}: {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
}) => {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`${className} grayscale scale-90 cursor-pointer transition-all duration-500 hover:grayscale-0`}
        />
    );
};

export default GrayscaleCompany;
