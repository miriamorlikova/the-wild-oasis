import { eachDayOfInterval } from "date-fns";
import { supabase } from "../_utils/supabaseClient";
import { Bookings, Cabin, Country, Guests, Settings } from "../_utils/types";

// Define generic types for Supabase responses
type SupabaseResponse<T> = {
	data: T | null;
	error: Error | null;
};

/////////////
// GET
export const getCabin = async (id: number): Promise<Cabin> => {
	const { data, error }: SupabaseResponse<Cabin> = await supabase
		.from("cabins")
		.select("*")
		.eq("id", id)
		.single();

	if (error || !data) {
		throw new Error(
			`${error} Failed to fetch cabin price for cabin with ID ${id}`
		);
	}
	console.log(data.cabin_name);
	return data;
};

// export const getCabinPrice = async (id: number): Promise<Cabin | null> => {
// 	const { data, error }: SupabaseResponse<Cabin> = await supabase
// 		.from("cabins")
// 		.select("regular_price, discount")
// 		.eq("id", id)
// 		.single();

// 	if (error) {
// 		console.error(error);
// 		return null;
// 	}

// 	return data;
// };

export const getCabinPrice = async (id: number): Promise<Cabin> => {
	const { data, error }: SupabaseResponse<Cabin> = await supabase
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

export const getCabins = async (): Promise<Cabin[]> => {
	const { data, error }: SupabaseResponse<Cabin[]> = await supabase
		.from("cabins")
		.select("id, cabin_name, max_capacity, regular_price, discount, image");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}
	return data || [];
};

export const getGuest = async (email: string): Promise<Guests | null> => {
	const { data }: SupabaseResponse<Guests> = await supabase
		.from("guests")
		.select("*")
		.eq("email", email)
		.single();

	return data || null;
};

export const getBooking = async (id: number): Promise<Bookings | null> => {
	const { data, error }: SupabaseResponse<Bookings> = await supabase
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

export const getBookings = async (guestId: number): Promise<Bookings[]> => {
	const { data, error }: SupabaseResponse<Bookings[]> = await supabase
		.from("bookings")
		.select(
			"id, created_at, start_date, end_date, num_of_nights, num_of_guests, total_price, guest_id, cabin_id, cabins(name, image)"
		)
		.eq("guest_id", guestId)
		.order("start_date");

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	return data || [];
};

export const getBookedDatesByCabinId = async (
	cabinId: number
): Promise<Date[]> => {
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	const todayISO = today.toISOString();

	const { data, error }: SupabaseResponse<Bookings[]> = await supabase
		.from("bookings")
		.select("*")
		.eq("cabin_id", cabinId)
		.or(`start_date.gte.${todayISO},status.eq.checked-in`);

	if (error) {
		console.error(error);
		throw new Error("Bookings could not get loaded");
	}

	const bookedDates = (data || []).flatMap((booking) => {
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

export const getSettings = async (): Promise<Settings> => {
	const { data, error }: SupabaseResponse<Settings> = await supabase
		.from("settings")
		.select("*")
		.single();

	if (error) {
		console.error(error);
		throw new Error("Settings could not be loaded");
	}

	return data || {};
};

export const getCountries = async (): Promise<Country[]> => {
	try {
		const res = await fetch(
			"https://restcountries.com/v2/all?fields=name,flag"
		);
		const countries: Country[] = await res.json();
		return countries;
	} catch {
		throw new Error("Could not fetch countries");
	}
};

/////////////
// CREATE
export const createGuest = async (
	newGuest: Omit<Guests, "id">
): Promise<Guests | null> => {
	const { data, error }: SupabaseResponse<Guests> = await supabase
		.from("guests")
		.insert([newGuest]);

	if (error) {
		console.error(error);
		throw new Error("Guest could not be created");
	}

	return data;
};

export const createBooking = async (
	newBooking: Omit<Bookings, "id">
): Promise<Bookings | null> => {
	const { data, error }: SupabaseResponse<Bookings> = await supabase
		.from("bookings")
		.insert([newBooking])
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be created");
	}

	return data;
};

/////////////
// UPDATE
export const updateGuest = async (
	id: number,
	updatedFields: Partial<Guests>
): Promise<Guests | null> => {
	const { data, error }: SupabaseResponse<Guests> = await supabase
		.from("guests")
		.update(updatedFields)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Guest could not be updated");
	}
	return data;
};

export const updateBooking = async (
	id: number,
	updatedFields: Partial<Bookings>
): Promise<Bookings | null> => {
	const { data, error }: SupabaseResponse<Bookings> = await supabase
		.from("bookings")
		.update(updatedFields)
		.eq("id", id)
		.select()
		.single();

	if (error) {
		console.error(error);
		throw new Error("Booking could not be updated");
	}
	return data;
};

/////////////
// DELETE
export const deleteBooking = async (id: number): Promise<Bookings | null> => {
	const { data, error }: SupabaseResponse<Bookings> = await supabase
		.from("bookings")
		.delete()
		.eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Booking could not be deleted");
	}
	return data;
};
