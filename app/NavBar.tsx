"use client";

import { Avatar, DropdownMenu, Text } from "@radix-ui/themes";
import { Container } from "@radix-ui/themes/components/container";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Skeleton } from "@/app/components";

const NavBar = () => {
  return (
    <nav className="p-5 border-b border-black/15 mb-5">
      <Container>
        <div className="flex justify-between items-center gap-5">
          <div className="flex gap-5 items-center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </div>
          <AuthStatus />
        </div>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex gap-4">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return (
      <Link href="/api/auth/signin" className="nav-link">
        Login
      </Link>
    );

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <div className="flex gap-2 items-center cursor-pointer">
            <Text className="nav-link">{session!.user!.name}</Text>
            <Avatar
              src={session!.user!.image!}
              fallback="?"
              size="2"
              radius="full"
              referrerPolicy="no-referrer"
            />
          </div>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="pt-2">
          <DropdownMenu.Label>
            <div className="flex flex-col gap-0.5">
              <Text size="1">Email</Text>
              <Text size="2">{session!.user!.email}</Text>
            </div>
          </DropdownMenu.Label>
          <DropdownMenu.Item className="mt-2 cursor-pointer">
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default NavBar;
