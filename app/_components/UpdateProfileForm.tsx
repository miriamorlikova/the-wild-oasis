"use client";

import Image from "next/image";
import { updateGuest } from "../_library/actions";
import { GuestType } from "../_library/types";
import SubmitButton from "./SubmitButton";

type UpdateProfileFormProps = {
	children: React.ReactNode;
	guest: GuestType;
};

const UpdateProfileForm = ({ children, guest }: UpdateProfileFormProps) => {
	const { full_name, email, national_id, country_flag } = guest;

	return (
		<form
			action={updateGuest}
			className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
		>
			<div className="space-y-2">
				<label>Full name</label>
				<input
					disabled
					defaultValue={full_name}
					name="full_name"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<label>Email address</label>
				<input
					disabled
					defaultValue={email}
					name="email"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
				/>
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between">
					<label htmlFor="nationality">Where are you from?</label>
					<Image
						src={country_flag ?? ""}
						alt="Country flag"
						className="rounded-sm"
						width={25}
						height={25}
					/>
				</div>

				{children}
			</div>

			<div className="space-y-2">
				<label htmlFor="nationalID">National ID number</label>
				<input
					defaultValue={national_id}
					name="national_id"
					className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
				/>
			</div>

			<div className="flex justify-end items-center gap-6">
				<SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
			</div>
		</form>
	);
};

export default UpdateProfileForm;
