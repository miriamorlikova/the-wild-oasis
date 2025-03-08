"use client";
import { differenceInDays } from "date-fns";
import { User } from "next-auth";
import { createBooking } from "../_library/actions";
import { useReservation } from "../_library/ReservationContext";
import { BookingDataType, CabinType } from "../_library/types";
import SubmitButton from "./SubmitButton";
type ReservationFormProps = {
	cabin: CabinType;
	user: User;
};

const ReservationForm = ({ cabin, user }: ReservationFormProps) => {
	const { max_capacity, regular_price, discount, id } = cabin;
	const { dateRange, resetRange } = useReservation();
	const startDate = dateRange.from;
	const endDate: Date | undefined = dateRange.to;
	const numNights =
		startDate && endDate ? differenceInDays(endDate, startDate) : 0;

	const cabinPrice = (regular_price - discount) * numNights;

	const bookingData: BookingDataType = {
		start_date: startDate ? startDate.toISOString() : "",
		end_date: endDate ? endDate.toISOString() : "",
		num_of_nights: numNights,
		cabin_price: cabinPrice,
		cabin_id: id,
	};

	const createBookingWithData = createBooking.bind(null, bookingData);

	const handleCreateBooking = async (formData: FormData) => {
		await createBookingWithData(formData);

		resetRange();
	};

	return (
		<div className="scale-[1.01]">
			<div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
				<p className="py-2">
					Logged in as{" "}
					<span className="font-semibold text-accent-400">{user.name}</span>
				</p>
			</div>
			<form
				className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
				action={handleCreateBooking}
			>
				<div className="space-y-2">
					<label htmlFor="numGuests">How many guests?</label>
					<select
						name="num_of_guests"
						id="num_of_guests"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						required
					>
						<option value="" key="">
							Select number of guests...
						</option>
						{Array.from({ length: max_capacity }, (_, i) => i + 1).map((x) => (
							<option value={x} key={x}>
								{x} {x === 1 ? "guest" : "guests"}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2">
					<label htmlFor="observations">
						Anything we should know about your stay?
					</label>
					<textarea
						name="observations"
						id="observations"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						placeholder="Any pets, allergies, special requirements, etc.?"
					/>
				</div>

				<div className="flex justify-end items-center gap-6">
					{!(startDate && endDate) ? (
						<p className="text-primary-300 text-base">
							Start by selecting dates
						</p>
					) : (
						<SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
					)}
				</div>
			</form>
		</div>
	);
};

export default ReservationForm;
