import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

const Logo = () => {
	return (
		<Link href="/" className="flex items-center gap-4 z-10">
			{/* kdyz logo nejrive importu, tak neni potreba definovat width a height a muzu definovat quality */}
			<Image
				src={logo}
				quality={100}
				height="60"
				width="60"
				alt="The Wild Oasis logo"
			/>
			<span className="text-xl font-semibold text-primary-100">
				The Wild Oasis
			</span>
		</Link>
	);
};

export default Logo;
