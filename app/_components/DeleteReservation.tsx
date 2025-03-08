"use client";
import SpinnerMini from "@/app/_components/SpinnerMini";
import { useTransition } from "react";
import { HiOutlineTrash } from "react-icons/hi2";

type DeleteReservationProps = {
	bookingId: number | undefined;
	onDelete: (bookingId: number) => void;
};
const DeleteReservation = ({ bookingId, onDelete }: DeleteReservationProps) => {
	const [isPending, startTransition] = useTransition();
	const handleDelete = () => {
		if (!bookingId) return;
		if (confirm("Are you sure you want to delete this reservation?")) {
			startTransition(() => onDelete(bookingId));
		}
	};

	return (
		<button
			onClick={handleDelete}
			disabled={isPending}
			className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
		>
			{isPending ? (
				<span className="mx-auto">
					<SpinnerMini />
				</span>
			) : (
				<>
					<HiOutlineTrash className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
					<span className="mt-1">Delete</span>
				</>
			)}
		</button>
	);
};

export default DeleteReservation;
