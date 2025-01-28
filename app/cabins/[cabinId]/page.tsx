import { getCabin } from "@/app/_library/data-service";
import { Cabin } from "@/app/_utils/types";
import Image from "next/image";
import { HiMiniEyeSlash, HiMiniMapPin, HiMiniUsers } from "react-icons/hi2";
Image;
type CabinDynamicRouteProps = {
	params: { cabinId: number };
};

const Page = async ({ params }: CabinDynamicRouteProps) => {
	const cabin: Cabin = await getCabin(params.cabinId);
	const {
		id,
		cabin_name,
		max_capacity,
		regular_price,
		discount,
		image,
		description,
	} = cabin;
	const imageUrl = `https://bjzhisgrplrsvdqdvtyd.supabase.co/storage/v1/object/public/the_wild_oasis/${image}`;

	return (
		<div className="max-w-6xl mx-auto mt-8">
			<div className="grid grid-cols-[3fr_4fr] gap-20 border border-primary-800 rounded-sm py-3 px-10 mb-24">
				<div className="relative rounded-md overflow-hidden -translate-x-7">
					<Image
						src={imageUrl}
						fill
						alt={`Cabin ${cabin_name}`}
						className="object-cover"
					/>
				</div>

				<div>
					<h3 className="text-accent-100 font-black text-7xl mb-5 py-6 pb-1 w-[150%]">
						Cabin {cabin_name}
					</h3>

					<p className="text-lg text-primary-300 mb-10">{description}</p>

					<ul className="flex flex-col gap-4 mb-7">
						<li className="flex gap-3 items-center">
							<HiMiniUsers className="h-5 w-5 text-primary-600 mb-1.5" />
							<span className="text-lg">
								For up to <span className="font-bold">{max_capacity}</span>{" "}
								guests
							</span>
						</li>
						<li className="flex gap-3 items-center">
							<HiMiniMapPin className="h-5 w-5 text-primary-600 mb-1.5" />
							<span className="text-lg">
								Located in the heart of the{" "}
								<span className="font-bold">Dolomites</span> (Italy)
							</span>
						</li>
						<li className="flex gap-3 items-center">
							<HiMiniEyeSlash className="h-5 w-5 text-primary-600 mb-1.5" />
							<span className="text-lg">
								Privacy <span className="font-bold ">100%</span> guaranteed
							</span>
						</li>
					</ul>
					<p className="flex gap-3 justify-end items-baseline mb-4">
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
			</div>

			<div>
				<h2 className="text-5xl font-semibold text-center">
					Reserve today. Pay on arrival.
				</h2>
			</div>
		</div>
	);
};
export default Page;
