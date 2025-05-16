import Button from "../components/Button.tsx";
import { SESSIONS } from "../dummy-sessions.ts"; // normally, we would probably load that from a server

export default function SessionsPage() {
  return (
    <main id="sessions-page">
      <header>
        <h2>Available mentoring sessions</h2>
        <p>
          From an one-on-one introduction to React's basics all the way up to a
          deep dive into state mechanics - we got just the right session for
          you!
        </p>
      </header>
      <div id="sessions-list">
        {SESSIONS.map((item) => (
          <div key={item.id} className="session-item ">
            <img src={item.image} alt={item.summary} />
            <div className="session-data">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <Button
                to={`/sessions/${item.id}`}
                textOnly={false}
                className="actions"
              >
                Learn More
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
