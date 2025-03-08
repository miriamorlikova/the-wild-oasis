import { eachDayOfInterval } from "date-fns";
import { supabase } from "./supabaseClient";
import {
	BookingType,
	CabinType,
	CountryType,
	GetBookingType,
	GuestType,
	SettingsType,
	SupabaseResponseType,
} from "./types";
import { notFound } from "next/navigation";

export const getCabin = async (id: number): Promise<CabinType> => {
	const { data, error }: SupabaseResponseType<CabinType> = await supabase
		.from("cabins")
		.select("*")
		.eq("id", id)
		.single();

	if (error || !data) {
		console.error(error);
		notFound();
	}

	return data;
};

export const getCabinPrice = async (id: number): Promise<CabinType> => {
	const { data, error }: SupabaseResponseType<CabinType> = await supabase
		.from("cabins")
		.select("regular_price, discount")
		.eq("id", id)
		.single();

	if (error || !data) {
		throw new Error(
			`${error} Failed to fetch cabin price for cabin with ID ${id}`
		);
	}

	return data;
};

export const getCabins = async (): Promise<CabinType[]> => {
	const { data, error }: SupabaseResponseType<CabinType[]> = await supabase
		.from("cabins")
		.select("id, cabin_name, max_capacity, regular_price, discount, image")
		.order("cabin_name", { ascending: true });

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
	return data || [];
};

export async function getGuest(email: string) {
	const { data } = await supabase
		.from("guests")
		.select("*")
		.eq("email", email)
		.single();

	return data;
}

export const getBooking = async (
	id: number
): Promise<GetBookingType | null> => {
	const { data, error }: SupabaseResponseType<GetBookingType> = await supabase
		.from("bookings")
		.select("*")
		.eq("id", id)
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not get loaded");
	}

	return data;
};

export const getBookings = async (guestId: number) => {
	const { data, error } = await supabase
		.from("bookings")
		.select(
			"id, created_at, start_date, end_date, num_of_nights, num_of_guests, total_price, guest_id, cabin_id, cabins(cabin_name, image)"
		)
		.eq("guest_id", guestId)
		.order("start_date");

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data ?? [];
};

export const getBookedDatesByCabinId = async (
	cabinId: number
): Promise<Date[]> => {
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	const todayISO = today.toISOString();

	const { data, error }: SupabaseResponseType<BookingType[]> = await supabase
		.from("bookings")
		.select("*")
		.eq("cabin_id", cabinId)
		.or(`start_date.gte.${todayISO},status.eq.checked-in`);

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	const bookedDates = (data || []).flatMap((booking: BookingType) => {
		if (booking.start_date && booking.end_date) {
			return eachDayOfInterval({
				start: new Date(booking.start_date),
				end: new Date(booking.end_date),
			});
		}
		return [];
	});

	return bookedDates;
};

export const getSettings = async (): Promise<SettingsType> => {
	const { data, error }: SupabaseResponseType<SettingsType> = await supabase
		.from("settings")
		.select("*")
		.single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}

	return data || {};
};

export const getCountries = async (): Promise<CountryType[]> => {
	try {
		const res = await fetch(
			"https://restcountries.com/v2/all?fields=name,flag"
		);
		const countries: CountryType[] = await res.json();
		return countries;
	} catch {
		throw new Error("Could not fetch countries");
	}
};

export const createGuest = async (
	newGuest: Omit<GuestType, "id">
): Promise<GuestType | null> => {
	const { data, error }: SupabaseResponseType<GuestType> = await supabase
		.from("guests")
		.insert([newGuest]);

	if (error) {
		console.error(error);
		throw new Error("Guest could not be created");
	}

	return data;
};
