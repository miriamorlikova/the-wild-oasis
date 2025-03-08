import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_library/auth";
import { getBookings } from "@/app/_library/data-service";
import { BookingType, CustomUserType } from "@/app/_library/types";
import Link from "next/link";

const Page = async () => {
	const session = await auth();
	const user = session?.user as CustomUserType;
	if (!user.guest_id) throw new Error("User guest_id is missing");
	const bookings: BookingType[] = await getBookings(user.guest_id);

	return (
		<div>
			<h2 className="font-semibold text-2xl text-accent-400 mb-7">
				Your reservations
			</h2>

			{bookings.length === 0 ? (
				<p className="text-lg">
					You have no reservations yet. Check out our{" "}
					<Link className="underline text-accent-500" href="/cabins">
						luxury cabins &rarr;
					</Link>
				</p>
			) : (
				<ReservationList bookings={bookings} />
			)}
		</div>
	);
};
export default Page;
