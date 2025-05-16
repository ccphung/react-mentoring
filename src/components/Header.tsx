import { useRef } from "react";
import { useBookingsContext } from "../store/booking-context";
import Button from "./Button";
import Modal, { ModalHandle } from "./Modal";

export default function Header() {
  const { bookings, removeBooking } = useBookingsContext();
  const customModal = useRef<ModalHandle>(null);

  function handleClick() {
    customModal.current?.open();
  }

  function handleClose() {
    customModal.current?.close();
  }

  function handleRemove(id: string) {
    removeBooking(id);
  }

  return (
    <header id="main-header">
      <h1>ReactMentoring</h1>
      <nav>
        <ul>
          <li>
            {" "}
            <Button to="/" textOnly={true}>
              Our Mission
            </Button>
          </li>
          <li>
            <Button to="/sessions" textOnly={true}>
              Browse Sessions
            </Button>
          </li>
          <li>
            <Button textOnly={false} onClick={handleClick}>
              Upcoming sessions
            </Button>
            <Modal ref={customModal} className="modal">
              {/* <div className="upcoming-session"> */}

              {bookings.length === 0 && <p>You don't have any bookings yet</p>}
              {bookings.map((session) => {
                return (
                  <div key={session.session} className="upcoming-session">
                    <h3>{session.title}</h3>
                    <p>{session.summary}</p>
                    <time>{session.date}</time>
                    <Button
                      textOnly={false}
                      onClick={() => handleRemove(session.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                );
              })}
              {/* </div> */}
              <Button textOnly={false} onClick={handleClose}>
                Close*
              </Button>
            </Modal>
          </li>
        </ul>
      </nav>
    </header>
  );
}
