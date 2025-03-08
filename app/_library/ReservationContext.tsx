"use client";

import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

type ReservationContextType = {
	dateRange: DateRange;
	setDateRange: (dateRange: DateRange) => void;
	resetRange: () => void;
} | null; // Context může být null, pokud ho někdo použije mimo provider

const ReservationContext = createContext<ReservationContextType>(null);

const ReservationProvider = ({ children }: { children: React.ReactNode }) => {
	const [dateRange, setDateRange] = useState<DateRange>({
		from: undefined,
		to: undefined,
	});

	const resetRange = () => {
		setDateRange({ from: undefined, to: undefined });
	};

	return (
		<ReservationContext.Provider
			value={{ dateRange, setDateRange, resetRange }}
		>
			{children}
		</ReservationContext.Provider>
	);
};

const useReservation = () => {
	const context = useContext(ReservationContext);
	if (!context) {
		throw new Error("useReservation must be used within a ReservationProvider");
	}
	return context;
};

export { ReservationProvider, useReservation };
