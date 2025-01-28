import CabinCard from "@/app/_components/CabinCard";
import { type Cabin } from "@/app/_utils/types";
import { getCabins } from "@/app/_library/data-service";

const CabinList = async () => {
	const cabins: Cabin[] = await getCabins();
	if (!cabins.length) {
		return null;
	}
	return (
		<div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
			{cabins.map((cabin) => (
				<CabinCard cabin={cabin} key={cabin.id} />
			))}
		</div>
	);
};

export default CabinList;
