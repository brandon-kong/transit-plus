'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';

import { useSession, signOut } from 'next-auth/react';

import Image from 'next/image';
import Link from 'next/link';

import { useLoginModal } from '@/lib/providers/modals/LoginModal/context';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { BackButton, IconButton } from '@/components/input/buttons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { BlackSpinner } from '@/components/spinner';
import { SelectScrollUpButton } from '@radix-ui/react-select';
import { SubNav } from '..';
import { TypographyH3, TypographyH4, TypographyP } from '@/components/typography';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function MainNavbar({ subnav }: { subnav: SubNav }) {
    const { setOpen } = useLoginModal();
    const { data: session, status } = useSession();

    const [scrollPosition, setScrollPosition] = useState<number>(0);

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    };

    useEffect(() => {
        document.addEventListener('scroll', handleScroll);
    });
    return (
        <div
            className={`transition-colors px-8 md:px-[80px] lg:px-[50px] flex justify-between items-center h-16 text-black w-full fixed top-0 z-10 ${
                scrollPosition > 10 ? 'bg-white drop-shadow-sm' : 'bg-transparent'
            }`}
            role="navigation"
        >
            <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                    <Link href="/">
                        <Image
                            src={'/brand/transit.svg'}
                            alt="Workflow"
                            width={40}
                            height={40}
                            priority
                            className="h-8 w-auto"
                        />
                    </Link>

                    <NavigationMenu className={'ml-12 hidden lg:block'}>
                        <NavigationMenuList className={'gap-2'}>
                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/plan">
                                    Plan trip
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/track">
                                    Track routes
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem className={'hidden xl:block'}>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
                                    See what&apos;s popping
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>Crowdsource</NavigationMenuTrigger>
                                <NavigationMenuIndicator />
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        {subnav.map(component => (
                                            <ListItem
                                                className={'hover:bg-lochinvar-50'}
                                                key={component.title}
                                                title={component.title}
                                                href={component.href}
                                            >
                                                {component.description}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
            </div>
            <div className="items-center h-full hidden md:flex gap-4">
                {status === 'loading' ? (
                    <BlackSpinner />
                ) : status === 'authenticated' ? (
                    <>
                        <Popover>
                            <PopoverTrigger>
                                <IconButton
                                    variant={'ghost'}
                                    src={'/icons/nav/bell.svg'}
                                    alt="Workflow"
                                    className={'rounded-md hover:bg-lochinvar-100 m-0'}
                                />
                            </PopoverTrigger>

                            <PopoverContent align={'end'} className={'min-w-[340px]'}>
                                <div className={'flex flex-col gap-4'}>
                                    <div className={'flex justify-between items-center'}>
                                        <TypographyH4>Notifications</TypographyH4>
                                        <IconButton
                                            variant={'ghost'}
                                            src={'/icons/nav/settings.svg'}
                                            alt="Workflow"
                                            className={'rounded-md hover:bg-lochinvar-100 m-0'}
                                        />
                                    </div>

                                    <div className={'flex flex-col gap-4'}>
                                        <TypographyP>You have no notifications.</TypographyP>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        <HoverCard openDelay={100}>
                            <HoverCardTrigger asChild>
                                <Button variant={'ghost'} className={'px-2 flex gap-2 hover:bg-lochinvar-100'}>
                                    <Image
                                        src={'/brand/transit-currency.svg'}
                                        alt={'Transit+ currency'}
                                        width={25}
                                        height={25}
                                    />
                                    <TypographyP className={'text-sm font-bold text-black'}>2,500</TypographyP>
                                </Button>
                            </HoverCardTrigger>
                            <HoverCardContent className={'min-w-[400px] text-sm'} side="bottom" align="end">
                                Contribute to Transit+ to earn Transit+ currency. You can use this currency to redeem
                                rewards, or even get a free subscription.
                            </HoverCardContent>
                        </HoverCard>

                        <Menubar className="border-none bg-transparent">
                            <MenubarMenu>
                                <MenubarTrigger className={'rounded-full border-none cursor-pointer'}>
                                    <Avatar className={'rounded-full'}>
                                        <AvatarImage className={'rounded-full'} src={'https://github.com/shadcn.png'} />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </MenubarTrigger>

                                <MenubarContent align="end">
                                    <MenubarItem>Messages</MenubarItem>
                                    <MenubarItem>Account</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Manage trips</MenubarItem>
                                    <MenubarItem>Rewards</MenubarItem>

                                    <Link href={'/developers'}>
                                        <MenubarItem>Developers</MenubarItem>
                                    </Link>

                                    <MenubarSeparator />
                                    <MenubarItem>Help center</MenubarItem>
                                    <MenubarItem onClick={() => signOut()}>Logout</MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </>
                ) : (
                    <div className="flex-shrink-0 flex gap-4">
                        <Button
                            variant={'ghost'}
                            className="rounded-lg px-6 hover:bg-lochinvar-100"
                            onClick={() => setOpen(true)}
                        >
                            Log in
                        </Button>
                        <Button
                            variant={'outline'}
                            className="rounded-lg text-black border border-black px-6 bg-transparent hover:bg-lochinvar-100"
                            onClick={() => setOpen(true)}
                        >
                            Sign up now
                        </Button>
                    </div>
                )}
            </div>
            <Button variant="outline" className={'border-black md:hidden'} size="icon">
                <Image src={'/icons/menu.svg'} alt="Workflow" width={20} height={20} />
            </Button>
        </div>
    );
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
    ({ className, title, children, href, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        href={href || '#'}
                        ref={ref}
                        className={cn(
                            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                            className,
                        )}
                        {...props}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
                    </Link>
                </NavigationMenuLink>
            </li>
        );
    },
);

ListItem.displayName = 'NavigationMenu.Item';
