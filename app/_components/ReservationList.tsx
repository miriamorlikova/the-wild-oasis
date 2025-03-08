"use client";
import { useOptimistic } from "react";
import { deleteBooking } from "../_library/actions";
import { GetBookingType } from "../_library/types";
import ReservationCard from "./ReservationCard";

type ReservationListProps = {
	bookings: GetBookingType[];
};

const ReservationList = ({ bookings }: ReservationListProps) => {
	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(currentBookings, bookingId) => {
			return currentBookings.filter((booking) => booking.id !== bookingId);
		}
	);
	const handleDelete = async (bookingId: number) => {
		optimisticDelete(bookingId);
		deleteBooking(bookingId);
	};

	return (
		<ul className="space-y-6">
			{optimisticBookings.map((booking) => (
				<ReservationCard
					booking={booking}
					key={booking.id}
					onDelete={handleDelete}
				/>
			))}
		</ul>
	);
};
export default ReservationList;
