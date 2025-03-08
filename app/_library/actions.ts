"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabaseClient";
import {
	BookingType,
	CustomUserType,
	SupabaseResponseType,
	BookingDataType,
} from "./types";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export const signInActionWithGoogle = async () => {
	await signIn("google", { redirectTo: "/account" });
};

export const signOutAction = async () => {
	await signOut({ redirectTo: "/" });
};

export async function updateGuest(formData: FormData) {
	const session = await auth();
	if (!session) throw new Error("You must be logged in");
	const user = session.user as CustomUserType;

	const nationalID = formData.get("national_id") as string;
	const nationalityRaw = formData.get("nationality") as string;

	if (!nationalID) throw new Error("Please provide a valid national ID");
	if (!nationalityRaw) throw new Error("Please select your nationality");

	const [nationality, country_flag] = nationalityRaw.split("%");

	if (!/^\d{6,12}$/.test(nationalID))
		throw new Error("Please provide a valid national ID");

	const updateData = { nationality, country_flag, national_id: nationalID };

	const { error } = await supabase
		.from("guests")
		.update(updateData)
		.eq("id", user.guest_id)
		.select();

	if (error) {
		console.error("upabase update error:", error);
		throw new Error("Guest could not be updated");
	}

	revalidatePath("/account/profile");
}

export async function updateBooking(formData: FormData) {
	const bookingId = Number(formData.get("booking_id"));
	console.log("🔍 Booking ID from form:", formData.get("booking_id"));
	console.log("🔍 Parsed Booking ID:", bookingId);

	const session = await auth();
	if (!session) throw new Error("You must be logged in");
	const user = session.user as CustomUserType;
	if (!user.guest_id) {
		throw new Error("You must be logged in first.");
	}

	const guestBookings = await getBookings(user.guest_id);
	const guestBookingIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingIds.includes(bookingId))
		throw new Error("You are not allowed to update this booking");

	const updateData = {
		num_of_guests: Number(formData.get("num_of_guests")),
		observations: formData.get("observations")?.slice(0, 1000) ?? "",
	};
	console.log("Booking ID:", bookingId);
	console.log("User ID:", user.guest_id);
	console.log("Update data being sent to Supabase:", updateData);

	const { error } = await supabase
		.from("bookings")
		.update(updateData)
		.eq("id", bookingId)
		.select()
		.single();

	if (error) throw new Error("Booking could not be updated");

	revalidatePath(`/account/reservations/edit/${bookingId}`);
	revalidatePath("/account/reservations");

	redirect("/account/reservations");
}

export const deleteBooking = async (bookingId: number) => {
	const session = await auth();
	if (!session) {
		throw new Error("You must be logged in first.");
	}
	const user = session.user as CustomUserType;
	if (!user.guest_id) {
		throw new Error("You must be logged in first.");
	}
	const guestBookings = await getBookings(user.guest_id);
	const guestBookingIds = guestBookings.map((booking) => booking.id);
	if (!guestBookingIds.includes(bookingId)) {
		throw new Error("You are not allowed to delete this booking");
	}
	const { error }: SupabaseResponseType<BookingType> = await supabase
		.from("bookings")
		.delete()
		.eq("id", bookingId);

	if (error) {
		throw new Error("Booking could not be deleted");
	}
	revalidatePath("/account/reservations");
};

export const createBooking = async (
	bookingData: BookingDataType,
	formData: FormData
) => {
	const session = await auth();
	if (!session) {
		throw new Error("You must be logged in first.");
	}
	const user = session.user as CustomUserType;
	if (!user.guest_id) {
		throw new Error("You must be logged in first.");
	}

	const newBooking = {
		...bookingData,
		guest_id: user.guest_id,
		num_of_guests: Number(formData.get("num_of_guests")),
		observations: formData.get("observations")?.slice(0, 1000),
		extras_price: 0,
		total_price: bookingData.cabin_price,
		is_paid: false,
		has_breakfast: false,
		status: "unconfirmed",
	};
	const { error }: SupabaseResponseType<BookingType> = await supabase
		.from("bookings")
		.insert([newBooking]);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be created");
	}
	revalidatePath(`/cabins/${bookingData.cabin_id}`);
	redirect("/cabins/thankyou");
};
