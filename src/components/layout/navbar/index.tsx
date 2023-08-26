'use client';

import React from 'react';
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

import Image from "next/image";
import Link from 'next/link';

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
      href: "#",
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

export default function Navbar () {
    return (
        <div className=" px-[20px] md:px-[80px] flex justify-between items-center h-16 bg-white text-black relative" role="navigation">
            <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center">
                    <Image
                    src={'/brand/transit.svg'}
                    alt="Workflow"
                    width={40}
                    height={40}

                    className="h-8 w-auto"
                    />

                    <NavigationMenu className={'ml-12 hidden lg:block'}>
                        <NavigationMenuList className={'gap-2'}>
                            <NavigationMenuItem>

                                <NavigationMenuLink 
                                className={navigationMenuTriggerStyle()}
                                href="#">
                                    Plan trip
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <NavigationMenuLink 
                                className={navigationMenuTriggerStyle()}
                                href="#">
                                    Track routes
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                            <NavigationMenuItem className={'hidden xl:block'}>
                                <NavigationMenuLink 
                                className={navigationMenuTriggerStyle()}
                                href="#">
                                    See what's popping
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
                <div className="flex-shrink-0 flex gap-4">
                <Button variant={'ghost'} className="rounded-lg px-6" >Log in</Button>
                    <Button variant={'outline'} className="rounded-lg text-black border border-black px-6" >Sign up now</Button>
                </div>
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