import Header from "@/app/_components/Header";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ReservationProvider } from "./_library/ReservationContext";

const josefin = Josefin_Sans({
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: {
		default: "The Wild Oasis",
	},
	description:
		"Luxurious cabin hotel located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests.",
};

type RootLayoutProps = {
	children: React.ReactNode;
};
const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang="en">
			<head>
				<meta charSet="UTF-8" />
				<link rel="icon" type="image/png" href="./src/assets/logo.png" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" />
				<title>The Wild Oasis</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</head>
			<body
				className={`${josefin.className} antialiased flex flex-col bg-primary-950 text-primary-100 min-h-screen relative`}
			>
				<header>
					<Header />
				</header>
				<div className="flex-1 px-8 py-12 grid">
					<main className="xxl:max-w-[2000px] max-w-[1600px] mx-auto w-full">
						<ReservationProvider>{children}</ReservationProvider>
					</main>
				</div>
			</body>
		</html>
	);
};
export default RootLayout;
