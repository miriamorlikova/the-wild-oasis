import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

type CabinsPageProps = {
	searchParams: { [key: string]: string | undefined };
};

const Page = ({ searchParams }: CabinsPageProps) => {
	const filter = searchParams?.capacity ?? "all";

	return (
		<>
			<title>Cabins | The Wild Oasis</title>
			<div>
				<h1 className="text-4xl mb-5 text-accent-400 font-medium">
					Our Luxury Cabins
				</h1>
				<p className="text-primary-200 text-lg mb-10">
					Cozy yet luxurious cabins, located right in the heart of the Italian
					Dolomites. Imagine waking up to beautiful mountain views, spending
					your days exploring the dark forests around, or just relaxing in your
					private hot tub under the stars. Enjoy nature's beauty in your own
					little home away from home. The perfect spot for a peaceful, calm
					vacation. Welcome to paradise.
				</p>
				<div className="mb-8 justify-end flex">
					<Filter />
				</div>
				<Suspense
					fallback={
						<div className="grid items-center justify-center mt-5">
							<Spinner />
							<p className="text-xl text-primary-200 mt-2">
								Loading cabin data...
							</p>
						</div>
					}
					key={filter}
				>
					<CabinList filter={filter} />
					<ReservationReminder />
				</Suspense>
			</div>
		</>
	);
};

export default Page;
