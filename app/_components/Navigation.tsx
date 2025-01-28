import Link from "next/link";

const Navigation = () => {
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
					<Link
						href="/account"
						className="hover:text-accent-400 transition-colors duration-300"
					>
						Guest area
					</Link>
				</li>
			</ul>
		</nav>
	);
};
export default Navigation;
