import Link from "next/link";
import { auth } from "../_library/auth";
import Image from "next/image";

const Navigation = async () => {
	const session = await auth();
	return (
		<nav className="z-10 text-xl">
			<ul className="flex gap-16 items-center">
				<li>
					<Link
						href="/cabins"
						className="hover:text-accent-400 transition-colors duration-300"
					>
						Cabins
					</Link>
				</li>
				<li>
					<Link
						href="/about"
						className="hover:text-accent-400 transition-colors duration-300"
					>
						About
					</Link>
				</li>
				<li>
					{session?.user?.image ? (
						<Link
							href="/account"
							className="hover:text-accent-400 flex items-center gap-4 transition-colors duration-300"
						>
							<Image
								src={session.user.image}
								alt={session.user.name || "User profile"}
								width={32}
								height={32}
								referrerPolicy="no-referrer"
								className="rounded-full"
							/>
							<span className="text-accent-400">Guest area</span>
						</Link>
					) : (
						<Link
							href="/account"
							className="hover:text-accent-400 transition-colors duration-300"
						>
							Guest area
						</Link>
					)}
				</li>
			</ul>
		</nav>
	);
};
export default Navigation;
