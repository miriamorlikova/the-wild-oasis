import { getCountries } from "@/app/_library/data-service";

// Let's imagine your colleague already built this component 😃
type SelectCountryProps = {
	defaultCountry: string;
	name: string;
	id: string;
	className: string;
};
type Country = {
	name: string;
	flag: string;
};

const SelectCountry = async ({
	defaultCountry,
	name,
	id,
	className,
}: SelectCountryProps) => {
	const countries = await getCountries();
	const flag =
		countries.find((country: Country) => country.name === defaultCountry)
			?.flag ?? "";

	return (
		<select
			name={name}
			id={id}
			// Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
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
