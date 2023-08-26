import { TypographyH1, TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function Home() {
    return (
        <main className={'h-[700px] p-20 flex w-full'}>
            <section className={'flex flex-col max-w-[580px] gap-8 text-[#0F172A]'}>
                <TypographyH1 className={'lg:text-[56px]'}>
                    Chicago Transit JUST got better.
                </TypographyH1>

                <TypographyP className={'text-[24px] align-top leading-[160%] text-[#0F172A]'}>
                    Transit+ is a crowdsourcing platform that allows you to report train fullness, train delays, safety concerns, and lost and found items.
                </TypographyP>

                <div>
                    <Button size={'lg'} className={'bg-[#35927B] hover:bg-[#15826B] px-10 py-7 text-[20px]'}>
                        Get Started
                    </Button>
                </div>
            </section>
        </main>
    )
}
