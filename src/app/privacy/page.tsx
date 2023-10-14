import { TypographyH2 } from '@/components/typography';

export default function PrivacyPage() {
    return (
        <main className={'h-[700px] pt-16 flex flex-col w-full max-h-lg'}>
            <div className="flex p-8 lg:p-20 flex-col h-fit gap-4 max-w-4xl mx-auto w-full ">
                <div className="flex justify-between w-full">
                    <TypographyH2 className="">Privacy Policy</TypographyH2>
                </div>
            </div>
        </main>
    );
}
