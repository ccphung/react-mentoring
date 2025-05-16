import { createContext, useContext, useReducer, type ReactNode } from "react";

export type Booking = {
  id: string;
  name: string;
  email: string;
  title: string;
  summary: string;
  date: string;
  session: string;
};

type Bookings = {
  bookings: Booking[];
};

type BookingsContextValue = Bookings & {
  addBooking: (bookingData: Booking) => void;
  removeBooking: (bookingData: string) => void;
};

type BookingsContextProviderProps = {
  children: ReactNode;
};

type AddBookingAction = {
  type: "add_booking";
  payload: Booking;
};

type RemoveBookingAction = {
  type: "remove_booking";
  payload: string;
};

type Action = AddBookingAction | RemoveBookingAction;

const BookingsContext = createContext<BookingsContextValue | null>(null);

const initialState: Bookings = {
  bookings: [],
};

function reducer(state: Bookings, action: Action) {
  if (action.type === "add_booking") {
    return {
      ...state,
      bookings: [
        ...state.bookings,
        {
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          title: action.payload.title,
          date: action.payload.date,
          summary: action.payload.summary,
          session: action.payload.session,
        },
      ],
    };
  }
  if (action.type === "remove_booking") {
    const bookingsFiltered = state.bookings.filter(
      (booking) => booking.id !== action.payload
    );
    return {
      ...state,
      bookings: bookingsFiltered,
    };
  }
  return state;
}

export default function BookingsContextProvider({
  children,
}: BookingsContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const ctx: BookingsContextValue = {
    bookings: state.bookings,
    addBooking(bookingData) {
      const exists = state.bookings.some(
        (b) =>
          b.email === bookingData.email && b.session === bookingData.session
      );

      if (exists) {
        console.warn("Booking already exists!");
        return;
      }

      dispatch({ type: "add_booking", payload: bookingData });
    },

    removeBooking(bookingId: string) {
      dispatch({ type: "remove_booking", payload: bookingId });
    },
  };
  return (
    <BookingsContext.Provider value={ctx}>{children}</BookingsContext.Provider>
  );
}

export function useBookingsContext() {
  const bookingsCtx = useContext(BookingsContext);

  if (bookingsCtx === null) {
    throw new Error("BookingsContext is null - that should not be the case!");
  }

  return bookingsCtx;
}
