export type Cabin = {
	created_at?: string;
	id?: number;
	cabin_name?: string;
	max_capacity: number;
	regular_price: number;
	discount: number;
	description?: string;
	image: string;
};

export type Guests = {
	created_at?: string;
	id?: number;
	full_name?: string;
	email?: number;
	national_id?: number;
	nationality?: number;
	country_flag?: string;
};

export type Bookings = {
	created_at: string;
	id?: number;
	start_date: string;
	end_date: string;
	num_of_nights: number;
	num_of_guests: number;
	cabin_price: number;
	extras_price: number;
	total_price: number;
	status: string;
	breakfast?: boolean;
	is_paid?: boolean;
	observations?: string;
};

export type Settings = {
	created_at?: string;
	id?: number;
	min_booking_length?: number;
	max_booking_length?: number;
	max_guests_per_booking?: number;
	breakfast_price?: number;
};

export type Country = {
	name?: string;
	flag?: string;
};
