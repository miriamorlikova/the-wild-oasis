import Image from "next/image";
import { HiOutlineUsers } from "react-icons/hi2";
import { type CabinType } from "../_library/types";
import Link from "next/link";

type CabinCardProps = {
	cabin: CabinType;
};

const CabinCard = ({ cabin }: CabinCardProps) => {
	const { id, cabin_name, max_capacity, regular_price, discount, image } =
		cabin;

	const imageUrl = `https://bjzhisgrplrsvdqdvtyd.supabase.co/storage/v1/object/public/the_wild_oasis/${image}`;

	return (
		<div className="flex border-primary-800 border ">
			<div className="relative flex-1">
				<Image
					src={imageUrl}
					alt={`Cabin ${cabin_name}`}
					fill
					className="order-r border-primary-800 object-cover"
				/>
			</div>

			<div className="flex-grow">
				<div className="pt-5 pb-4 px-7 bg-primary-950">
					<h3 className="text-accent-500 font-semibold text-2xl mb-3">
						Cabin {cabin_name}
					</h3>

					<div className="flex gap-3 items-center mb-2">
						<HiOutlineUsers className="h-5 w-5 text-primary-600" />
						<p className="text-lg text-primary-200">
							For up to <span className="font-bold">{max_capacity}</span> guests
						</p>
					</div>

					<p className="flex gap-3 justify-end items-baseline">
						{discount > 0 ? (
							<>
								<span className="text-3xl font-[350]">
									${regular_price - discount}
								</span>
								<span className="line-through font-semibold text-primary-600">
									${regular_price}
								</span>
							</>
						) : (
							<span className="text-3xl font-[350]">${regular_price}</span>
						)}
						<span className="text-primary-200">/ night</span>
					</p>
				</div>

				<div className="bg-primary-950 border-t border-t-primary-800 text-right">
					<Link
						href={`/cabins/${id}`}
						className="border-l border-primary-800 py-4 px-6 inline-block hover:bg-accent-600 transition-all hover:text-primary-900"
					>
						Details & reservation &rarr;
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CabinCard;
