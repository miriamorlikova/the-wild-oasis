"use client";
import {
	differenceInDays,
	isPast,
	isSameDay,
	isWithinInterval,
} from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useReservation } from "../_library/ReservationContext";
import { CabinType, SettingsType } from "../_library/types";

const isAlreadyBooked = (range: DateRange, datesArr: Date[]): boolean => {
	return (
		range.from !== null &&
		range.to !== null &&
		datesArr.some((date) =>
			isWithinInterval(date, { start: range.from!, end: range.to! })
		)
	);
};

type DateSelectorProps = {
	settings: SettingsType;
	bookedDates: Date[];
	cabin: CabinType & { num_of_nights?: number; cabin_price?: number };
};

const DateSelector = ({ settings, bookedDates, cabin }: DateSelectorProps) => {
	const { min_booking_length, max_booking_length } = settings;
	const { discount, regular_price } = cabin;
	const { dateRange, setDateRange, resetRange } = useReservation();
	const displayRange = isAlreadyBooked(dateRange, bookedDates)
		? { from: null, to: null }
		: dateRange;

	const numNights =
		displayRange.from && displayRange.to
			? differenceInDays(displayRange.to, displayRange.from)
			: 0;

	const cabinPrice = (regular_price - discount) * numNights;

	console.log("Booked Dates:", bookedDates);
	return (
		<div className="flex flex-col  justify-between">
			<DayPicker
				className="pt-12 place-self-center"
				mode="range"
				onSelect={(range: DateRange | undefined) => {
					if (range) setDateRange(range);
				}}
				selected={displayRange as DateRange | undefined}
				min={min_booking_length ? min_booking_length + 1 : undefined}
				max={max_booking_length}
				fromMonth={new Date()}
				fromDate={new Date()}
				toYear={new Date().getFullYear() + 5}
				captionLayout="dropdown"
				numberOfMonths={2}
				disabled={(currDate) =>
					isPast(currDate) ||
					bookedDates.some((date) => isSameDay(date, currDate))
				}
			/>
			{dateRange.from && dateRange.to && (
				<p className="px-8">
					Selected: {dateRange?.from?.toLocaleDateString()} to{" "}
					{dateRange?.to?.toLocaleDateString()}
				</p>
			)}
			<div className="flex items-center justify-between px-8 bg-accent-500 text-primary-800 h-[72px]">
				<div className="flex items-baseline gap-6">
					<p className="flex gap-2 items-baseline">
						{discount > 0 ? (
							<>
								<span className="text-2xl">${regular_price - discount}</span>
								<span className="line-through font-semibold text-primary-700">
									${regular_price}
								</span>
							</>
						) : (
							<span className="text-2xl">${regular_price}</span>
						)}
						<span className="">/night</span>
					</p>
					{numNights ? (
						<>
							<p className="bg-accent-600 px-3 py-2 text-2xl">
								<span>&times;</span> <span>{numNights}</span>
							</p>
							<p>
								<span className="text-lg font-bold uppercase">Total</span>
								<span className="text-2xl font-semibold">${cabinPrice}</span>
							</p>
						</>
					) : null}
				</div>

				{dateRange?.from || dateRange?.to ? (
					<button
						className="border border-primary-800 py-2 px-4 text-sm font-semibold"
						onClick={resetRange}
					>
						Clear
					</button>
				) : null}
			</div>
		</div>
	);
};

export default DateSelector;
