import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import DeleteReservation from "./DeleteReservation";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { type GetBookingType } from "../_library/types";
import Image from "next/image";
import Link from "next/link";

export const formatDistanceFromNow = (dateStr: string) =>
	formatDistance(parseISO(dateStr), new Date(), {
		addSuffix: true,
	}).replace("about ", "");

type ReservationCardPropsType = {
	booking: GetBookingType;
	onDelete: (bookingId: number) => void;
};

const ReservationCard = ({ booking, onDelete }: ReservationCardPropsType) => {
	const {
		id,
		start_date,
		num_of_nights,
		total_price,
		num_of_guests,
		created_at,
		cabins: { cabin_name, image } = { cabin_name: "", image: "" },
	} = booking;

	const imageUrl = `https://bjzhisgrplrsvdqdvtyd.supabase.co/storage/v1/object/public/the_wild_oasis/${image}`;
	return (
		<div className="flex border border-primary-800">
			<div className="relative h-32 aspect-square">
				<Image
					fill
					src={imageUrl}
					alt={`Cabin ${cabin_name}`}
					className="object-cover border-r border-primary-800"
				/>
			</div>

			<div className="flex-grow px-6 py-3 flex flex-col">
				<div className="flex items-center justify-between">
					<h3 className="text-xl font-semibold">
						{num_of_nights} nights in Cabin {cabin_name}
					</h3>
					{start_date && isPast(new Date(start_date)) ? (
						<span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
							past
						</span>
					) : (
						<span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
							upcoming
						</span>
					)}
				</div>

				<p className="text-lg text-primary-300">
					{start_date ? format(new Date(start_date), "EEE, MMM dd yyyy") : ""} (
					{start_date && isToday(new Date(start_date))
						? "Today"
						: formatDistanceFromNow(start_date ? start_date : "")}
					) &mdash;{" "}
					{start_date && format(new Date(start_date), "EEE, MMM dd yyyy")}
				</p>

				<div className="flex gap-5 mt-auto items-baseline">
					<p className="text-xl font-semibold text-accent-400">
						${total_price}
					</p>
					<p className="text-primary-300">&bull;</p>
					<p className="text-lg text-primary-300">
						{num_of_guests} guest{num_of_guests && num_of_guests > 1 && "s"}
					</p>
					<p className="ml-auto text-sm text-primary-400">
						Booked {format(new Date(created_at || ""), "EEE, MMM dd yyyy, p")}
					</p>
				</div>
			</div>

			{start_date && !isPast(start_date) && (
				<div className="flex flex-col border-l border-primary-800 w-[100px]">
					<Link
						href={`/account/reservations/edit/${id}`}
						className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
					>
						<HiOutlinePencilSquare className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
						<span className="mt-1">Edit</span>
					</Link>
					<DeleteReservation onDelete={onDelete} bookingId={booking.id} />
				</div>
			)}
		</div>
	);
};

export default ReservationCard;
