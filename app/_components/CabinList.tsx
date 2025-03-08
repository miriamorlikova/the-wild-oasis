import CabinCard from "@/app/_components/CabinCard";
import { type CabinType } from "@/app/_library/types";
import { getCabins } from "@/app/_library/data-service";
import { unstable_noStore as noStore } from "next/cache";

type CabilListProps = {
	filter: string;
};

const CabinList = async ({ filter }: CabilListProps) => {
	noStore();
	const cabins: CabinType[] = await getCabins();
	if (!cabins.length) {
		return null;
	}
	let filteredCabins;
	if (filter === "all") {
		filteredCabins = cabins;
	}
	if (filter === "small") {
		filteredCabins = cabins.filter((cabin) => cabin.max_capacity <= 3);
	}
	if (filter === "medium") {
		filteredCabins = cabins.filter(
			(cabin) => cabin.max_capacity >= 4 && cabin.max_capacity < 8
		);
	}
	if (filter === "large") {
		filteredCabins = cabins.filter((cabin) => cabin.max_capacity >= 8);
	}
	if (!filteredCabins) {
		return <p>Sorry, no cabins match your filter.</p>;
	}

	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
			{filteredCabins.map((cabin) => (
				<CabinCard cabin={cabin} key={cabin.id} />
			))}
		</div>
	);
};

export default CabinList;
