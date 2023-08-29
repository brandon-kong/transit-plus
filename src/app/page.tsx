'use client';

import { useEffect } from 'react';
import { TypographyH1, TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import GrayscaleCompany from '@/components/company-brand';

import { motion } from 'framer-motion'
export default function Home() {
    return (
        <main className={'h-[700px] flex flex-col w-full'} >
            <div className="flex p-8 lg:p-32 flex-col xl:flex-row h-fit gap-4 xl:gap-20 mx-auto ">
                <section className={'flex flex-col max-w-[510px] gap-8 text-[#0F172A]'}>

                    <div>
                        <TypographyH1 className={'lg:text-[48px]'}>
                            Chicago Transit JUST got 
                            
                        </TypographyH1>
                        <TypographyH1 className='relative '> better. 
                        <Image 
                        src={'/highlight.svg'}
                        alt="Workflow"
                        height={10}
                        width={100}
                        priority={true}

                        className={'absolute select-none bottom-0 w-full min-h-[20px] min-w-[100px] max-w-[120px] -z-10'}
                        /></TypographyH1>
                    </div>
                    
                    
                    

                    <TypographyP className={'text-[18px] align-top leading-[160%] text-[#0F172A]'}>
                        Transit+ is Chicago&apos;s best crowdsourcing and trip planning app using the power of crowdsourcing to help you plan your trips.
                        Earn money by contributing to crowdsourcing and help others safely and efficiently plan their trips.
                    </TypographyP>

                    <div>
                        <div>
                            <Button size={'lg'} className={'bg-[#35927B] hover:bg-[#15826B] px-10 py-7 text-[20px]'}>
                                Get Started
                            </Button>
                        </div>
                        

                        <div className={'flex flex-col md:flex-row mt-[48px] gap-4 md:gap-12'}>
                            <TypographyP>
                                Trusted by <br /> leading
                                companies
                            </TypographyP>

                            <div className={'flex gap-4'}>
                                <GrayscaleCompany
                                src={'/trusted_companies/cta.svg'}
                                alt="Workflow"
                                width={35}
                                height={35}
                                />
                                <GrayscaleCompany
                                src={'/trusted_companies/metra.png'}
                                alt="Workflow"
                                width={1000}
                                height={1000}

                                className={'h-10 w-auto'}
                                />
                                <GrayscaleCompany
                                src={'/trusted_companies/company.svg'}
                                alt="Workflow"
                                width={35}
                                height={35}

                                />
                            </div>
                        </div>
                    </div>

            
                </section>

                <div
                className='md:min-w-[600px] w-full'
                >
                    <motion.div

                    initial={{
                        rotateX: 0,
                        rotateY: 0,
                        opacity: 0,

                        y: 100,
                    }}
                    animate={{
                        rotateX: 0,
                        rotateY: 0,
                        opacity: 1,

                        y: 0,
                    }}

                    transition={{
                        duration: 1,
                    }}

                    className={'relative w-full h-full max-w-[600px] max-h-[600px]'}

                    >
                        <Image
                        src={'/images/hero.svg'}
                        alt="Workflow"
                        width={500}
                        height={520}

                        className={'max-h-[600px] w-auto select-none'}
                        />
                    </motion.div>
                </div>
            
            </div>

            <div className='w-full bg-gray-100 min-h-[500px]'>
                a
            </div>
        </main>
    )
}
