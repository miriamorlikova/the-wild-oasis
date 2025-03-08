"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import FilterButton from "./FilterButton";

const Filter = () => {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();
	const handleFilter = (filter: string) => {
		const params = new URLSearchParams(searchParams);
		params.set("capacity", filter);
		router.replace(`${pathname}?${params.toString()}`);
	};

	const activeFilter = searchParams.get("capacity") ?? "all";

	return (
		<div className="border-primary-800 border rounded-sm gap-1 flex ">
			<FilterButton
				filter="all"
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				All cabins
			</FilterButton>
			<FilterButton
				filter="small"
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				1&mdash;3 guests
			</FilterButton>
			<FilterButton
				filter="medium"
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				4&mdash;7 guests
			</FilterButton>
			<FilterButton
				filter="large"
				handleFilter={handleFilter}
				activeFilter={activeFilter}
			>
				8&mdash;12 guests
			</FilterButton>
		</div>
	);
};
export default Filter;
