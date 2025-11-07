"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes/components/box";
import { Container } from "@radix-ui/themes/components/container";
import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="p-5 border-b border-black/15 mb-5">
      <Container>
        <div className="flex justify-between items-center gap-5">
          <div className="flex gap-5 items-center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex gap-4">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      "text-zinc-900": link.href === currentPath,
                      "text-zinc-500": link.href !== currentPath,
                      "hover:text-zinc-800 transitino-colors": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <div className="flex gap-2 items-center cursor-pointer">
                    <Text>{session.user!.name}</Text>
                    <Avatar
                      src={session.user!.image!}
                      fallback="?"
                      size="2"
                      radius="full"
                    />
                  </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="pt-2">
                  <DropdownMenu.Label>
                    <div className="flex flex-col">
                      <Text size="1">Email</Text>
                      <Text size="2" className="text-black">
                        {session.user!.email}
                      </Text>
                    </div>
                  </DropdownMenu.Label>
                  <DropdownMenu.Item className="mt-2 cursor-pointer">
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default NavBar;
