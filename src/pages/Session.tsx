import { useParams } from "react-router-dom";

import { FormEvent, useRef } from "react";

import { SESSIONS } from "../dummy-sessions.ts";
import Button from "../components/Button.tsx";
import Modal, { ModalHandle } from "../components/Modal.tsx";
import Input from "../components/Input.tsx";
import { useBookingsContext } from "../store/booking-context.tsx";
import { nanoid } from "nanoid";

export default function SessionPage() {
  const { bookings } = useBookingsContext();
  const { addBooking } = useBookingsContext();
  const params = useParams<{ id: string }>();
  const sessionId = params.id;

  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const sessionInput = useRef<HTMLInputElement>(null);

  const loadedSession = SESSIONS.find((session) => session.id === sessionId);
  const customModal = useRef<ModalHandle>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    const id = nanoid();
    const name = nameInput.current!.value;
    const email = emailInput.current!.value;
    const title = loadedSession?.title;
    const date = loadedSession?.date;
    const summary = loadedSession?.summary;

    if (sessionId && name && email && title && date && summary && sessionId) {
      e.preventDefault();

      addBooking({ id, name, email, title, date, summary, session: sessionId });
      customModal.current?.close();
    }
  }

  console.log(bookings);

  function handleClick() {
    customModal.current?.open();
  }

  if (!loadedSession) {
    return (
      <main id="session-page">
        <p>No session found!</p>
      </main>
    );
  }

  return (
    <main id="session-page">
      <article>
        <header>
          <img src={loadedSession.image} alt={loadedSession.title} />
          <div>
            <h2>{loadedSession.title}</h2>
            <time dateTime={new Date(loadedSession.date).toISOString()}>
              {new Date(loadedSession.date).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <div>
              <Button textOnly={false} onClick={handleClick}>
                Book a session
              </Button>
              <Modal ref={customModal} className="modal">
                <div className="control">
                  <p>Book a session</p>
                  <form method="dialog" onSubmit={handleSubmit}>
                    <Input
                      label="Your name"
                      id="name"
                      ref={nameInput}
                      required
                    />
                    <Input
                      label="Your email"
                      id="email"
                      ref={emailInput}
                      required
                      type="email"
                    />
                    <Input
                      type="hidden"
                      label="session"
                      id="session"
                      ref={sessionInput}
                    />
                    <div className="actions">
                      <Button textOnly={true}>Cancel</Button>
                      <Button textOnly={false} type="submit">
                        Book a session
                      </Button>{" "}
                    </div>
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </header>
        <p id="content">{loadedSession.description}</p>
      </article>
    </main>
  );
}
