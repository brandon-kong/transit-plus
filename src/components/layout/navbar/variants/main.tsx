'use client';

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
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
  } from "@/components/ui/navigation-menu"

  import { useSession, signOut } from 'next-auth/react';

import Image from "next/image";
import Link from 'next/link';

import { useLoginModal } from '@/lib/providers/modals/LoginModal/context';
import { Avatar } from '@/components/ui/avatar';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { BackButton } from '@/components/input/buttons';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '@/components/ui/menubar';
import { BlackSpinner } from '@/components/spinner';
import { SelectScrollUpButton } from '@radix-ui/react-select';

const components: { title: string; href: string; description: string }[] = [
    {
      title: "Report Train Fullness",
      href: "#",
      description:
        "Report the fullness of a train to help others plan their trips.",
    },
    {
      title: "Report Train Delay",
      href: "#",
      description:
        "Report the delay of a train to help others plan their trips.",
    },
    {
      title: "Safety Concern",
      href: "/report/safety",
      description:
        "Report a safety concern to help others safely plan their trips.",
    },
    {
      title: "Lost and Found",
      href: "#",
      description: "Report a lost item to help others find their lost items.",
    },
    {
      title: "Blog",
      href: "#",
      description:
        "Read about the latest news and updates from the Transit+ team.",
    },
    {
        title: "Leaderboard",
        href: "#",
        description:
          " Recognize and reward users who actively contribute to crowdsourcing.",
      },
  ]

export default function MainNavbar () {
    const { setOpen } = useLoginModal();
    const { data: session, status } = useSession();

    const [scrollPosition, setScrollPosition] = useState<number>(0);

    const handleScroll = () => {
        setScrollPosition(window.scrollY);
    }

    useEffect(() => {
        document.addEventListener('scroll', handleScroll)
    })
    return (
        <div className={`transition-colors px-8 md:px-[80px] lg:px-[50px] flex justify-between items-center h-16 text-black w-full fixed top-0 z-10 ${ scrollPosition > 10 ? 'bg-white drop-shadow-sm' : 'bg-transparent'}`} role="navigation">
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

                                <NavigationMenuLink 
                                className={navigationMenuTriggerStyle()}
                                href="/plan">
                                    Plan trip
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink 
                                className={navigationMenuTriggerStyle()}
                                href="/track">
                                    Track routes
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem className={'hidden xl:block'}>
                                <NavigationMenuLink 
                                className={navigationMenuTriggerStyle()}
                                href="#">
                                    See what&apos;s popping
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Crowdsource
                                </NavigationMenuTrigger>
                                <NavigationMenuIndicator />
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                    {components.map((component) => (
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
            <div className="items-center hidden md:flex">
                {
                    status === 'loading' ? (
                        <BlackSpinner />
                    ) : ( status === 'authenticated' ? (
                        <>
                        <Menubar className="border-none bg-transparent">
                            <MenubarMenu>
                                <MenubarTrigger className={'rounded-full border-none cursor-pointer'}>
                                    <Avatar className={'rounded-full'}>
                                        <AvatarImage className={'rounded-full'} src={'https://github.com/shadcn.png'} />
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                </MenubarTrigger>

                                <MenubarContent align='end'>
                                    <MenubarItem>Notifications</MenubarItem>
                                    <MenubarItem>Messages</MenubarItem>
                                    <MenubarItem>Account</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Manage trips</MenubarItem>
                                    <MenubarItem>Rewards</MenubarItem>
                                    <MenubarItem>Developers</MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>Help center</MenubarItem>
                                    <MenubarItem
                                    onClick={() => signOut()}
                                    >
                                        Logout
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                            

                        </>
                    ) : (
                        <div className="flex-shrink-0 flex gap-4">
                            <Button variant={'ghost'} className="rounded-lg px-6 hover:bg-lochinvar-100" onClick={() => setOpen(true)} >Log in</Button>
                            <Button variant={'outline'} className="rounded-lg text-black border border-black px-6 bg-transparent hover:bg-lochinvar-100" onClick={() => setOpen(true)}>Sign up now</Button>
                        </div>
                    ))
                }
            </div>
            <Button 
            
            variant="outline" className={'border-black md:hidden'} size="icon">
                <Image
                src={'/icons/menu.svg'}
                alt="Workflow"
                width={20}
                height={20}
                />
            </Button>
        </div>
    )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
        href={href || "#"}
        ref={ref}
        className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
        )}
        {...props}
        >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
            </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "NavigationMenu.Item"