import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex p-5 items-center gap-4 border-b border-black/15 mb-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex gap-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-zinc-600 hover:text-zinc-800 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
