import { useMemo, useState } from "react";
import "./Events.css";

type EventCategory =
  | "All"
  | "Technical"
  | "Cultural"
  | "Sports"
  | "Workshop";

type EventItem = {
  id: number;
  title: string;
  category: Exclude<EventCategory, "All">;
  date: string;
  time: string;
  location: string;
  organizer: string;
};

const EVENT_CATEGORIES: EventCategory[] = [
  "All",
  "Technical",
  "Cultural",
  "Sports",
  "Workshop",
];

const INITIAL_EVENTS: EventItem[] = [];

type EventsProps = {
  onHome: () => void;
  onMarketplace: () => void;
  onLostFound: () => void;
  onCommunity: () => void;
  onLogin: () => void;
};

export default 
function Events({
  onHome,
  onMarketplace,
  onLostFound,
  onCommunity,
  onLogin,
}: EventsProps) {

  const [events] = useState<EventItem[]>(INITIAL_EVENTS);
  const [selectedCategory, setSelectedCategory] =
    useState<EventCategory>("All");
  const [search, setSearch] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" ||
        event.category === selectedCategory;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        searchText === "" ||
        event.title.toLowerCase().includes(searchText) ||
        event.organizer.toLowerCase().includes(searchText) ||
        event.location.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [events, selectedCategory, search]);

 return (
  <div className="events-app">

   <nav className="navbar">

  <div
    className="logo"
    onClick={onHome}
    style={{ cursor: "pointer" }}
  >
    UniGo
  </div>

  <div className="nav-links">

    <a
      href="/"
      onClick={(e) => {
        e.preventDefault();
        onHome();
      }}
    >
      Home
    </a>

    <a
      href="/marketplace"
      onClick={(e) => {
        e.preventDefault();
        onMarketplace();
      }}
    >
      Marketplace
    </a>

    <a
      href="/lost-found"
      onClick={(e) => {
        e.preventDefault();
        onLostFound();
      }}
    >
      Lost & Found
    </a>

    <a
      href="/community"
      onClick={(e) => {
        e.preventDefault();
        onCommunity();
      }}
    >
      Community
    </a>

    <a
      href="/events"
      className="active"
      onClick={(e) => e.preventDefault()}
    >
      Events
    </a>

  </div>

  <button
    className="login-btn"
    onClick={onLogin}
  >
    Login
  </button>

</nav>
      <main className="events-page">

        {/* HERO */}
        <section className="events-hero">
          <p className="events-small-title">CAMPUS EVENTS</p>

          <h1>
            Discover What's <span>Happening</span>
          </h1>

          <p className="events-subtitle">
            Find technical events, workshops, cultural activities,
            competitions and more happening around your campus.
          </p>

          {/* SEARCH */}
          <div className="events-search-wrapper">
            <span className="events-search-icon">⌕</span>

            <input
              type="text"
              placeholder="Search events, organizers or locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </section>

        {/* FILTERS */}
        <section className="events-filters">
          {EVENT_CATEGORIES.map((category) => (
            <button
              key={category}
              className={
                selectedCategory === category
                  ? "event-filter active"
                  : "event-filter"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </section>

        {/* EVENTS */}
        <section className="events-content">

          <div className="events-heading">
            <div>
              <p className="events-section-label">
                CAMPUS ACTIVITIES
              </p>

              <h2>
                {selectedCategory === "All"
                  ? "Upcoming Events"
                  : `${selectedCategory} Events`}
              </h2>
            </div>

            <span className="events-count">
              {filteredEvents.length} events
            </span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="events-empty">
              <div className="events-empty-icon">✦</div>

              <h3>No events yet</h3>

              <p>
                There are no events available right now.
                Check back soon for upcoming campus activities.
              </p>
            </div>
          ) : (
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <article className="event-card" key={event.id}>

                  <div className="event-card-top">
                    <span className="event-category">
                      {event.category}
                    </span>

                    <span className="event-date">
                      {event.date}
                    </span>
                  </div>

                  <h3>{event.title}</h3>

                  <div className="event-info">
                    <p>
                      <span>◷</span>
                      {event.time}
                    </p>

                    <p>
                      <span>⌖</span>
                      {event.location}
                    </p>

                    <p>
                      <span>◉</span>
                      {event.organizer}
                    </p>
                  </div>

                  <button className="event-details-btn">
                    View Details
                  </button>
                </article>
              ))}
            </div>
          )}

        </section>
      </main>
    </div>
  );
}