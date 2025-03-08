import React from "react";
import ReservationForm from "./ReservationForm";
import DateSelector from "./DateSelector";
import { getSettings } from "../_library/data-service";
import { getBookedDatesByCabinId } from "../_library/data-service";
import { CabinType } from "../_library/types";
import { auth } from "../_library/auth";
import LoginMessage from "./LoginMessage";
type ReservationPropsType = {
	cabin: CabinType & { num_of_nights?: number; cabin_price?: number };
};

const Reservation = async ({ cabin }: ReservationPropsType) => {
	if (!cabin.id) {
		return <div>Cabin not found</div>;
	}

	const settings = await getSettings();
	const bookedDates = await getBookedDatesByCabinId(cabin.id);
	const session = await auth();
	return (
		<div className="grid lg:grid-cols-2 grid-rows-2 border border-primary-800 rounded-sm min-h-[400px]">
			<DateSelector
				settings={settings}
				bookedDates={bookedDates}
				cabin={cabin}
			/>
			{session?.user ? (
				<ReservationForm cabin={cabin} user={session.user} />
			) : (
				<LoginMessage />
			)}
		</div>
	);
};
export default Reservation;
