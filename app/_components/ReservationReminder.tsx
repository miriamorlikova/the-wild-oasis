"use client";
import { format } from "date-fns";
import { HiOutlineXMark } from "react-icons/hi2";
import { useReservation } from "../_library/ReservationContext";
const ReservationReminder = () => {
	const { dateRange, resetRange } = useReservation();
	if (!dateRange.from || !dateRange.to) return null;

	return (
		<div className="fixed bottom-6 left-1/2 -translate-x-1/2 py-5 px-8 rounded-full bg-accent-500 text-primary-800 text  font-semibold shadow-xl shadow-slate-900 flex gap-8 items-center">
			<p>
				<span>👋</span> Dont forget to reserve your dates <br /> from{" "}
				{format(new Date(dateRange.from), "MMM dd yyyy")} to{" "}
				{format(new Date(dateRange.to), "MMM dd yyyy")}
			</p>
			<button
				onClick={resetRange}
				className="rounded-full p-1 hover:bg-accent-600 transition-all"
			>
				<HiOutlineXMark className="h-5 w-5" />
			</button>
		</div>
	);
};

export default ReservationReminder;
