import Reservation from "@/app/_components/Reservation";
import { getCabin, getCabins } from "@/app/_library/data-service";
import { CabinType } from "@/app/_library/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Spinner from "@/app/_components/Spinner";
import CabinDetail from "@/app/_components/CabinDetail";
type CabinDynamicRouteProps = {
	params: { cabinId: number };
};

export const generateMetadata = async ({ params }: CabinDynamicRouteProps) => {
	const cabin: CabinType = await getCabin(params.cabinId);

	if (!cabin) {
		notFound();
	}
	return { title: `Cabin ${cabin.cabin_name} | The Wild Oasis` };
};

export const generateStaticParams = async () => {
	const cabins = await getCabins();

	const ids = cabins.map((cabin) => ({
		cabinId: String(cabin.id),
	}));
	return ids;
};

const Page = async ({ params }: CabinDynamicRouteProps) => {
	const cabin: CabinType = await getCabin(params.cabinId);

	if (!cabin) {
		notFound();
	}

	const { cabin_name } = cabin;

	return (
		<div className="max-w-6xl mx-auto mt-8">
			<CabinDetail cabin={cabin} />
			<div>
				<h2 className="text-5xl font-semibold text-center mb-10 text-accent-100">
					Reserve cabin {cabin_name} today. Pay on arrival.
				</h2>
				<Suspense fallback={<Spinner />}>
					<Reservation cabin={cabin} />
				</Suspense>
			</div>
		</div>
	);
};
export default Page;
