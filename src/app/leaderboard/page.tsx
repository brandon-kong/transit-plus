'use client';

import { TypographyH2 } from '@/components/typography';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useReportSafetyModal } from '@/lib/providers/modals/ReportSafetyModal/context';

export default function LeaderboardPage() {
    const { setOpen } = useReportSafetyModal()
    return (
        <main className={'h-[700px] pt-16 flex flex-col w-full max-h-lg'} >
            <div className="flex p-8 lg:p-20 flex-col h-fit gap-4 max-w-4xl mx-auto w-full ">
                <div className='flex justify-between w-full'>

                    <TypographyH2 className=''>
                        Leaderboard
                    </TypographyH2>

                    

                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className={'w-[100px]'}>#</TableHead>
                            <TableHead>User</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow className={'bg-yellow-200'}>
                            <TableCell>
                                1
                            </TableCell>
                            <TableCell  className={'font-bold'}>
                                John Doe
                            </TableCell>
                        </TableRow>

                        <TableRow className={'bg-slate-100'}>
                            <TableCell>
                                2
                            </TableCell>
                            <TableCell  className={'font-bold'}>
                                John Doe
                            </TableCell>
                        </TableRow>

                        <TableRow className={'bg-[#CD7F32]'}>
                            <TableCell>
                                3
                            </TableCell>
                            <TableCell  className={'font-bold'}>
                                John Doe
                            </TableCell>
                        </TableRow>

                        <TableRow className={''}>
                            <TableCell>
                                4
                            </TableCell>
                            <TableCell  className={'font-bold'}>
                                John Doe
                            </TableCell>
                        </TableRow>

                        <TableRow className={''}>
                            <TableCell>
                                5
                            </TableCell>
                            <TableCell  className={'font-bold'}>
                                John Doe
                            </TableCell>
                        </TableRow>

                        <TableRow className={''}>
                            <TableCell>
                                6
                            </TableCell>
                            <TableCell  className={'font-bold'}>
                                John Doe
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

                <div>

                </div>
            
            </div>
        </main>
    )
}
