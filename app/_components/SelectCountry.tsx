import { getCountries } from "@/app/_library/data-service";

type SelectCountryProps = {
	defaultCountry: string;
	name: string;
	id: string;
	className: string;
};

const SelectCountry = async ({
	defaultCountry,
	name,
	id,
	className,
}: SelectCountryProps) => {
	const countries = await getCountries();
	const flag =
		countries.find((country) => country.name === defaultCountry)?.flag ?? "";

	return (
		<select
			name={name}
			id={id}
			defaultValue={`${defaultCountry}%${flag}`}
			className={className}
		>
			<option value="">Select country...</option>
			{countries.map((c) => (
				<option key={c.name} value={`${c.name}%${c.flag}`}>
					{c.name}
				</option>
			))}
		</select>
	);
};

export default SelectCountry;
