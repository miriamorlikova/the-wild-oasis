import { User } from "@supabase/supabase-js";
import { Session } from "next-auth";

export type CabinType = {
	id?: number;
	created_at?: string;
	cabin_name?: string;
	max_capacity: number;
	regular_price: number;
	discount: number;
	description?: string;
	image: string;
};

export type GuestType = {
	id: number;
	created_at?: string;
	full_name?: string;
	email: string;
	national_id?: string;
	nationality?: string;
	country_flag?: string;
};

export type BookingType = {
	id: number;
	created_at?: string;
	start_date: string;
	end_date: string;
	num_of_nights: number;
	num_of_guests: number;
	cabin_price?: number;
	extras_price?: number;
	total_price: number;
	status?: string;
	breakfast?: boolean;
	is_paid?: boolean;
	observations?: string;
	guest_id?: number;
	cabin_id?: number;
};

export type SettingsType = {
	id?: number;
	created_at?: string;
	min_booking_length?: number;
	max_booking_length?: number;
	max_guests_per_booking?: number;
	breakfast_price?: number;
};

export type CountryType = {
	name?: string;
	flag?: string;
};

export type GetBookingType = BookingType & {
	cabins?: { cabin_name: string; image: string };
};

export type UpdateGuestType = Pick<
	GuestType,
	"nationality" | "country_flag" | "national_id"
>;

export interface CustomUserType extends User {
	guest_id?: number;
}

export type SupabaseResponseType<T> = {
	data: T | null;
	error: Error | null;
};

export type BookingDataType = Pick<
	BookingType,
	"start_date" | "end_date" | "num_of_nights" | "cabin_price" | "cabin_id"
>;

export type CustomSessionType = Session & {
	user: {
		guest_id?: number;
	} & Session["user"];
};
