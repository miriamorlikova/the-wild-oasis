"use client";
import { HiCalendarDays, HiOutlineHome, HiOutlineUser } from "react-icons/hi2";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
	{
		name: "Home",
		href: "/account",
		icon: <HiOutlineHome className="h-5 w-5 text-primary-600 mb-1.5" />,
	},
	{
		name: "Reservations",
		href: "/account/reservations",
		icon: <HiCalendarDays className="h-5 w-5 text-primary-600 mb-1.5" />,
	},
	{
		name: "Guest profile",
		href: "/account/profile",
		icon: <HiOutlineUser className="h-5 w-5 text-primary-600 mb-1.5" />,
	},
];

const SideNavigation = () => {
	const pathname = usePathname();
	console.log(pathname);
	return (
		<nav className="border-r border-primary-900">
			<ul className="flex flex-col gap-2 h-full text-lg">
				{navLinks.map((link) => (
					<li key={link.name}>
						<Link
							className={`${
								pathname === link.href
									? "bg-primary-900 text-primary-100"
									: "hover:bg-primary-900 hover:text-primary-100"
							} py-3 px-5  transition-colors duration-400 flex items-center gap-4 font-semibold text-primary-200 rounded-sm`}
							href={link.href}
						>
							{link.icon}
							<span>{link.name}</span>
						</Link>
					</li>
				))}

				<li className="mt-auto">
					<SignOutButton />
				</li>
			</ul>
		</nav>
	);
};

export default SideNavigation;
