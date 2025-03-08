import { createClient } from "@supabase/supabase-js";

interface Database {
	public: {
		Tables: {
			bookings: {
				Row: {
					created_at: string;
					id: number;
					start_date: string;
					end_date: string;
					num_of_nights: number;
					num_of_guests: number;
					cabin_price: number;
					extras_price: number;
					total_price: number;
					status: string;
					breakfast: boolean;
					is_paid: boolean;
					observations: string;
				};
				Insert: {
					start_date: string;
					end_date: string;
					num_of_nights: number;
					num_of_guests: number;
					cabin_price: number;
					extras_price: number;
					total_price: number;
					status: string;
					breakfast: boolean;
					is_paid: boolean;
					observations: string;
				};
				Update: {
					start_date?: string;
					end_date?: string;
					num_of_nights?: number;
					num_of_guests?: number;
					cabin_price?: number;
					extras_price?: number;
					total_price?: number;
					status?: string;
					breakfast?: boolean;
					is_paid?: boolean;
					observations?: string;
				};
			};
			cabins: {
				Row: {
					created_at: string;
					id: number;
					name: string;
					max_capacity: number;
					regular_price: number;
					discount: number;
					description: string;
					image: string;
				};
				Insert: {
					name: string;
					max_capacity: number;
					regular_price: number;
					discount: number;
					description: string;
					image: string;
				};
				Update: {
					name?: string;
					max_capacity?: number;
					regular_price?: number;
					discount?: number;
					description?: string;
					image?: string;
				};
			};
			guests: {
				Row: {
					created_at: string;
					id: number;
					full_name: string;
					email: number;
					national_id: number;
					nationality: number;
					country_flag: string;
				};
				Insert: {
					full_name: string;
					email: number;
					national_id: number;
					nationality: number;
					country_flag: string;
				};
				Update: {
					full_name?: string;
					email?: number;
					national_id?: number;
					nationality?: number;
					country_flag?: string;
				};
			};
			settings: {
				Row: {
					created_at: string;
					id: number;
					min_booking_length: number;
					max_booking_length: number;
					max_guests_per_booking: number;
					breakfast_price: number;
				};
				Insert: {
					min_booking_length: number;
					max_booking_length: number;
					max_guests_per_booking: number;
					breakfast_price: number;
				};
				Update: {
					min_booking_length?: number;
					max_booking_length?: number;
					max_guests_per_booking?: number;
					breakfast_price?: number;
				};
			};
		};
	};
}

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
	throw new Error(
		"Environment variables SUPABASE_URL and SUPABASE_KEY are required."
	);
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export { supabaseKey, supabaseUrl };
