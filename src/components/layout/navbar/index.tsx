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

const Views = {
    '/': <MainNavbar />,
    '/track': <WhiteNavbar />
}

type ViewsKey = keyof typeof Views;

export default function Navbar () {
    const pathname = usePathname();

    if (Views[pathname as ViewsKey] === undefined) {
        return <MainNavbar />
    }

    return Views[pathname as ViewsKey];
}