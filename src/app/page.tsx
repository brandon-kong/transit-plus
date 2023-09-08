'use client';

import { useEffect } from 'react';
import { TypographyH1, TypographyH2, TypographyH3, TypographyP } from '@/components/typography'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import GrayscaleCompany from '@/components/company-brand';

import { motion } from 'framer-motion'
export default function Home() {
    return (
        // add 4rem to top padding to account for fixed navbar
        <main className={'pt-16 flex flex-col w-full bg-lochinvar-50'} >
            <div className="flex p-8 lg:p-24 flex-col xl:flex-row h-fit gap-4 xl:gap-20 mx-auto">
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
                            <Button size={'lg'} className={'bg-[#ff6d00] text-white hover:bg-[#ff6000] px-10 py-7 text-[20px]'}>
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
                className='md:min-w-[600px] h-min w-full'
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

                    className={'relative w-full h-full max-w-[600px] max-h-[700px]'}

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

            <div className={'bg-white w-full flex p-8 lg:p-24 flex-col h-fit gap-4 xl:gap-20'}>
                <div className={'max-w-[1000px] w-full flex flex-col gap-10 mx-auto'}>
                    <div className={'mx-auto'}>
                        <TypographyH2 className={'w-full text-center'}>
                            Why Transit+ ?
                        </TypographyH2>
                    </div>



                    <div className={'flex flex-col gap-20'}>
                        <div className={'flex flex-col mx-auto md:flex-row justify-center gap-20'}>
                            <div className={'max-w-md  w-full flex justify-center md:justify-end'}>
                                <Image
                                src={'/illustrations/money.svg'}
                                alt="Workflow"
                                width={200}
                                height={200}

                                className={'select-none'}
                                />
                            </div>
                            <div className={'max-w-md flex flex-col gap-4'}>
                                <TypographyH3 className={'text-center md:text-left'}>
                                    Pay NOTHING.
                                </TypographyH3>
                                <TypographyP className='leading-7 text-center md:text-left'>
                                    That&apos;s right, we believe that safety and public transit information
                                    should be free for <b>everybody</b>. We will never ask you to pay a single penny.*
                                </TypographyP>
                            </div>
                            
                        </div>


                        <div className={'flex flex-col mx-auto md:flex-row justify-center gap-20'}>
                            <div className={'max-w-md flex flex-col gap-4'}>
                                <TypographyH3 className={'text-center md:text-left'}>
                                    See EVERYTHING.
                                </TypographyH3>
                                <TypographyP className='leading-7 text-center md:text-left'>
                                    View all the information you need to plan your trips, including real-time
                                    crowdsourced data on safety concerns, and more.
                                </TypographyP>
                            </div>

                            <div className={'max-w-md  w-full flex justify-center md:justify-end'}>
                                <Image
                                src={'/illustrations/download.svg'}
                                alt="Workflow"
                                width={200}
                                height={200}

                                className={'select-none'}
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
