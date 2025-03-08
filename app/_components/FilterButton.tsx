"use client";
type FilterButtonProps = {
	filter: string;
	handleFilter: (filter: string) => void;
	children: React.ReactNode;
	activeFilter: string;
};

const FilterButton = ({
	filter,
	handleFilter,
	children,
	activeFilter,
}: FilterButtonProps) => {
	return (
		<button
			className={`${
				activeFilter === filter ? "bg-primary-700 text-primary-50" : ""
			} px-5 py-2 hover:bg-primary-700 rounded-sm`}
			onClick={() => handleFilter(filter)}
		>
			{children}
		</button>
	);
};
export default FilterButton;
