
import { useEffect, useState } from "react";

import "./App.css";

import Marketplace from "./pages/Marketplace";
import SellItem from "./pages/SellItem";
import Community from "./pages/Community";
import Events from "./pages/Events";
import LostFound from "./pages/LostFound.tsx";
import Login from "./pages/Login";


type Listing = {
  id: number;
  image: string;
  title: string;
  category: string;
  condition: string;
  description: string;
  price: string;
  seller: string;
  college: string;
  postedAt: string;
  isFree: boolean;
};

/* =========================
   HOME
========================= */

function Home({
  onMarketplace,
  onLostFound,
  onCommunity,
  onEvents,
  onAIAgent,
  onLogin,
  listings,

}: {
  onMarketplace: () => void;
  onLostFound: () => void;
  onCommunity: () => void;
  onEvents: () => void;
  onAIAgent: () => void;
  onLogin: () => void;
  listings: Listing[];
}) 
{
  const [homeSearch, setHomeSearch] = useState("");

const searchResults = listings.filter((listing) => {
  const query = homeSearch.trim().toLowerCase();

  if (!query) return false;

  return (
    listing.title.toLowerCase().includes(query) ||
    listing.category.toLowerCase().includes(query) ||
    listing.description.toLowerCase().includes(query)
  );
});
  return (
    <div className="app">

      {/* Navigation */}
      <nav className="navbar">

        <div className="logo">
          UniGo
        </div>

        <div className="nav-links">

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
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
            onClick={(e) => {
              e.preventDefault();
              onEvents();
            }}
          >
            Events
          </a>

          <a
  href="/ai-agent"
  onClick={(e) => {
    e.preventDefault();
    onAIAgent();
  }}
>
  AI Agent
</a>

        </div>

        <button
          className="login-btn"
          onClick={onLogin}
        >
          Login
        </button>

      </nav>

      {/* Hero */}
      <section className="hero">

        <div className="hero-content">

          <p className="welcome">
            WELCOME TO UNIGO
          </p>

          <h1>
            Your student world,
            <br />
            <span>all in one place.</span>
          </h1>

          <p className="subtitle">
            Discover resources, connect with students, buy and sell,
            and make campus life easier.
          </p>

         <div className="home-search-wrapper">

  <div className="search-box">

    <span className="search-icon">🔍</span>

    <input
      type="text"
      value={homeSearch}
      onChange={(e) => setHomeSearch(e.target.value)}
      placeholder="Search anything on UniGo..."
    />

    {homeSearch && (
      <button
        className="clear-search"
        onClick={() => setHomeSearch("")}
      >
        ×
      </button>
    )}

  </div>

  {homeSearch.trim() && (
    <div className="global-search-results">

      <p className="search-results-label">
        SEARCHING UNIGO
      </p>

      {searchResults.length > 0 && (
        <div className="search-result-section">

          <h3>Marketplace</h3>

          {searchResults.map((listing) => (
            <button
              key={listing.id}
              className="search-result-item"
              onClick={() => {
                setHomeSearch("");
                onMarketplace();
              }}
            >
              <span className="result-icon">🛍️</span>

              <span>
                <strong>{listing.title}</strong>
                <small>
                  {listing.category} · {listing.price}
                </small>
              </span>
            </button>
          ))}

        </div>
      )}

      {searchResults.length === 0 && (
        <div className="no-search-results">
          <span>⌕</span>
          <p>No exact results found on UniGo yet.</p>
        </div>
      )}

      <button
        className="ai-search-result"
        onClick={() => {
          setHomeSearch("");
          onAIAgent();
        }}
      >
        <span>🤖</span>

        <span>
          <strong>Search "{homeSearch}" with UniGo AI</strong>
          <small>Ask UniGo AI about anything</small>
        </span>

        <span>→</span>
      </button>

    </div>
  )}

</div>
        </div>

      </section>

      

      {/* Footer */}
      <footer>

        <div className="logo">
          UniGo
        </div>

        <p>
          Your student world, all in one place.
        </p>
         <p className="lf-creator">Built by Student for Student</p>

      </footer>

    </div>
  );
}

/* =========================
   PAGE TYPE
========================= */

type Page =
  | "home"
  | "marketplace"
  | "lost-found"
  | "community"
  | "events"
  | "ai-agent"
  | "login"
  | "sell";



function getPageFromPath(): Page {
  const path = window.location.pathname;

  if (path === "/marketplace") return "marketplace";
  if (path === "/lost-found") return "lost-found";
  if (path === "/community") return "community";
  if (path === "/events") return "events";
  if (path === "/ai-agent") return "ai-agent";
  if (path === "/login") return "login";

  return "home";
}
/* =========================
   APP
========================= */

function App() {

  
  const [page, setPage] =
    useState<Page>(getPageFromPath);

  useEffect(() => {

    const handlePopState = () => {
      setPage(getPageFromPath());
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };

  }, []);

  /* =========================
     NAVIGATION FUNCTIONS
  ========================= */

  const goHome = () => {

    window.history.pushState(
      {},
      "",
      "/"
    );

    setPage("home");
  };

  const goMarketplace = () => {

    window.history.pushState(
      {},
      "",
      "/marketplace"
    );

    setPage("marketplace");
  };

  const goLostFound = () => {
  window.history.pushState({}, "", "/lost-found");
  setPage("lost-found");
};

  const goCommunity = () => {

    window.history.pushState(
      {},
      "",
      "/community"
    );

    setPage("community");
  };

  const goEvents = () => {

    window.history.pushState(
      {},
      "",
      "/events"
    );

    setPage("events");
  };

  const goAIAgent = () => {
  window.history.pushState({}, "", "/ai-agent");
  setPage("ai-agent");
};

  const goLogin = () => {

    window.history.pushState(
      {},
      "",
      "/login"
    );

    setPage("login");
  };

  /* =========================
     MARKETPLACE STATE
  ========================= */

  const [listings, setListings] =
    useState<Listing[]>([]);

  const [editingListing, setEditingListing] =
    useState<Listing | null>(null);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [contactListing, setContactListing] =
    useState<Listing | null>(null);

  /* =========================
     SEARCH
  ========================= */

  const filteredListings = listings.filter(
    (listing) => {

      const search =
        searchQuery.toLowerCase();

      const matchesSearch =
        listing.title
          .toLowerCase()
          .includes(search) ||

        listing.category
          .toLowerCase()
          .includes(search) ||

        listing.description
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        selectedCategory === "All" ||
        listing.category === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );


  /* =========================
   LOST & FOUND
========================= */

if (page === "lost-found") {
  return (
    <LostFound
      onHome={goHome}
      onMarketplace={goMarketplace}
      onCommunity={goCommunity}
      onEvents={goEvents}
      onLogin={goLogin}
    />
  );
}

/* =========================
   AI AGENT
========================= */

if (page === "ai-agent") {
  return (
    <div className="coming-soon-page">
      <div className="coming-soon-card">

        <div className="coming-soon-icon">
          ✦
        </div>

        <p className="small-title">
          UNIGO AI
        </p>

        <h1>
          Coming Soon
        </h1>

        <p>
          Your AI-powered student assistant is currently
          under development.
        </p>

        <button
          className="view-btn"
          onClick={goHome}
        >
          ← Back to UniGo
        </button>

      </div>
    </div>
  );
}

  /* =========================
     EVENTS

  ========================= */

 if (page === "events") {
  return (
    <Events
      onHome={goHome}
      onMarketplace={goMarketplace}
      onLostFound={goLostFound}
      onCommunity={goCommunity}
      onLogin={goLogin}
    />
  );
}
  /* =========================
     LOGIN
  ========================= */
if (page === "login") {
  return <Login onLogin={goHome} />;
}

  /* =========================
   MARKETPLACE
========================= */

if (page === "marketplace") {

  return (
 <Marketplace
  listings={filteredListings}

  onBack={goHome}

  onLostFound={goLostFound}

  onCommunity={goCommunity}

  onEvents={goEvents}

  onLogin={goLogin}

      onSell={() => {
        setEditingListing(null);
        setPage("sell");
      }}

      onEdit={(listing) => {
        setEditingListing(listing);
        setPage("sell");
      }}

      onDelete={(id) => {

        const shouldDelete =
          window.confirm(
            "Are you sure you want to delete this listing?"
          );

        if (shouldDelete) {

          setListings(
            (currentListings) =>
              currentListings.filter(
                (listing) =>
                  listing.id !== id
              )
          );

        }

      }}

      searchQuery={searchQuery}

      onSearchChange={(value) => {
        setSearchQuery(value);
      }}

      selectedCategory={
        selectedCategory
      }

      onCategoryChange={(category) => {
        setSelectedCategory(category);
      }}

      onContactSeller={(listing) => {
        setContactListing(listing);
      }}

    />
  );
}

  /* =========================
     COMMUNITY
  ========================= */

  if (page === "community") {
  return (
    <Community
      onHome={goHome}
      onMarketplace={goMarketplace}
      onLostFound={goLostFound}
      onEvents={goEvents}
      onLogin={goLogin}
    />

    );
  }

  /* =========================
     SELL ITEM
  ========================= */

  if (page === "sell") {

    return (
      <SellItem

        onBack={() => {

          setEditingListing(null);
          setPage("marketplace");

        }}

        editingListing={
          editingListing
        }

        onPublish={(listing) => {

          if (editingListing) {

            setListings(
              (currentListings) =>
                currentListings.map(
                  (item) =>
                    item.id === listing.id
                      ? listing
                      : item
                )
            );

          } else {

            setListings(
              (currentListings) => [

                ...currentListings,

                {
                  ...listing,

                  id: Date.now(),

                  seller: "Student",

                  college: "Your College",

                  postedAt:
                    new Date()
                      .toLocaleString(),
                },

              ]
            );
          }

          setEditingListing(null);
          setPage("marketplace");

        }}

      />
    );
  }

  /* =========================
     CONTACT SELLER
  ========================= */

  if (contactListing) {

    return (
      <div className="app">

        <div className="sell-form">

          <button
            className="view-btn"
            onClick={() =>
              setContactListing(null)
            }
          >
            ← Back
          </button>

          <div className="form-section">

            <p className="small-title">
              UNIGO MARKETPLACE
            </p>

            <h1>
              Contact Seller
            </h1>

            <h2>
              {contactListing.title}
            </h2>

            <p>
              Seller:{" "}
              {contactListing.seller}
            </p>

            <p>
              College:{" "}
              {contactListing.college}
            </p>

            <div className="form-group">

              <label>
                Message
              </label>

              <textarea
                rows={5}
                placeholder="Hi, is this item still available?"
              />

            </div>

            <button
              className="publish-btn"
              onClick={() => {

                alert(
                  "Message feature will be connected to the backend later."
                );

              }}
            >
              Send Message
            </button>

          </div>

        </div>

      </div>
    );
  }

  /* =========================
     HOME
  ========================= */

  return (
  <Home
    onMarketplace={goMarketplace}
    onLostFound={goLostFound}
    onCommunity={goCommunity}
    onEvents={goEvents}
    onAIAgent={goAIAgent}
    onLogin={goLogin}
    listings={listings}
  />
);
}

export default App;