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
import MainNavbar from './variants/main';

import { usePathname } from 'next/navigation';
import WhiteNavbar from './variants/white';

export type SubNav = { title: string; href: string; description: string }[]

const subnav: SubNav = [
    {
      title: "Report Train Fullness",
      href: "/report/fullness",
      description:
        "Report the fullness of a train to help others plan their trips.",
    },
    {
      title: "Report Train Delay",
      href: "/report/delay",
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
      href: "/report/lost-and-found",
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
        href: "/leaderboard",
        description:
          " Recognize and reward users who actively contribute to crowdsourcing.",
    },
]

const Views = {
    '/': <MainNavbar subnav={subnav} />,
    '/track': <WhiteNavbar />
}

type ViewsKey = keyof typeof Views;

export default function Navbar () {
    const pathname = usePathname();

    if (Views[pathname as ViewsKey] === undefined) {
        return <MainNavbar subnav={subnav} />
    }

    return Views[pathname as ViewsKey];
}