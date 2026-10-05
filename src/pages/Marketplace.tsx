import "./Marketplace.css";

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

type MarketplaceProps = {
  listings: Listing[];
  onBack: () => void;
  onLostFound: () => void;
  onSell: () => void;
  onEdit: (listing: Listing) => void;
  onDelete: (id: number) => void;
  onCommunity: () => void;
  onEvents: () => void;
  onLogin: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onContactSeller: (listing: Listing) => void;
};

function Marketplace({
  listings,
  onBack,
  onLostFound,
  onSell,
  onEdit,
  onDelete,
  onCommunity,
  onEvents,
  onLogin,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onContactSeller,

}: MarketplaceProps) {
  const categories = [
    { name: "All", icon: "✦" },
    { name: "Books", icon: "B" },
    { name: "Stationery", icon: "S" },
    { name: "Electronics", icon: "E" },
    { name: "Notes", icon: "N" },
    { name: "Components", icon: "C" },
    { name: "Campus Items", icon: "U" },
    { name: "Other", icon: "+" },
  ];

  return (
    <div className="marketplace-page">

      {/* NAVBAR */}
      <nav className="marketplace-navbar">

        <button
          className="marketplace-logo"
          onClick={onBack}
          aria-label="Go to home"
        >
          Uni<span>Go</span>
        </button>

        <div className="marketplace-nav-links">

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onBack();
            }}
          >
            Home
          </a>

          <a
            href="/marketplace"
            className="active"
            onClick={(e) => e.preventDefault()}
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

        </div>

        <button
          className="marketplace-login-btn"
          onClick={onLogin}
        >
          Login
        </button>

      </nav>


      {/* HERO */}
      <header className="marketplace-hero">

        <div className="marketplace-hero-glow marketplace-glow-one" />
        <div className="marketplace-hero-glow marketplace-glow-two" />

        <div className="marketplace-hero-content">

          <p className="marketplace-eyebrow">
            UNIGO MARKETPLACE
          </p>

          <h1>
            Buy, sell & share
            <br />
            <span>with students.</span>
          </h1>

          <p className="marketplace-hero-description">
            Find useful things from students around your campus,
            or give something you no longer need a second life.
          </p>

          {/* SEARCH */}
          <div className="marketplace-search">

            <span className="marketplace-search-icon">
              ⌕
            </span>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) =>
                onSearchChange(e.target.value)
              }
              placeholder="Search books, notes, electronics..."
            />

            {searchQuery && (
              <button
                className="marketplace-clear-search"
                onClick={() => onSearchChange("")}
                type="button"
              >
                ×
              </button>
            )}

            <span className="marketplace-search-hint">
              Search
            </span>

          </div>

        </div>

      </header>


      {/* CATEGORY BAR */}
      <section className="marketplace-category-section">

        <div className="marketplace-categories">

          {categories.map((category) => (

            <button
              key={category.name}
              className={
                selectedCategory === category.name
                  ? "category-pill active"
                  : "category-pill"
              }
              onClick={() =>
                onCategoryChange(category.name)
              }
            >

              <span className="category-pill-icon">
                {category.icon}
              </span>

              {category.name}

            </button>

          ))}

        </div>

      </section>


      {/* AMAZON CARD */}
      <section className="external-shopping-card">

        <div className="external-shopping-left">

          <div className="external-shopping-icon">
            ✦
          </div>

          <div>

            <p className="external-shopping-label">
              NEED STUDY ESSENTIALS?
            </p>

            <h3>
              Get your stationery sorted.
            </h3>

            <p>
              Pens, notebooks, files, folders and other
              everyday study essentials.
            </p>

          </div>

        </div>

        <a
          href="https://www.amazon.in/useful-products-for-students/s?k=useful+products+for+students"
          target="_blank"
          rel="noopener noreferrer"
          className="external-shopping-btn"
        >
          Shop on Amazon
          <span>↗</span>
        </a>

      </section>


      {/* LISTINGS */}
      <main className="marketplace-main">

        <div className="marketplace-list-heading">

          <div>

            <p className="marketplace-section-label">
              STUDENT MARKETPLACE
            </p>

            <div className="marketplace-heading-row">

              <h2>
                Latest from students
              </h2>

              {listings.length > 0 && (
                <span className="listing-count">
                  {listings.length}{" "}
                  {listings.length === 1
                    ? "listing"
                    : "listings"}
                </span>
              )}

            </div>

          </div>

          <button
            className="sell-item-btn"
            onClick={onSell}
          >
            <span>+</span>
            Sell an Item
          </button>

        </div>


        {/* LISTINGS */}
        {listings.length > 0 ? (

          <div className="listing-grid">

            {listings.map((listing) => (

              <article
                className="listing-card"
                key={listing.id}
              >

                {/* IMAGE */}
                <div className="listing-image">

                  {listing.image ? (

                    <img
                      src={listing.image}
                      alt={listing.title}
                    />

                  ) : (

                    <div className="listing-image-placeholder">
                      <span>✦</span>
                    </div>

                  )}

                  <span className="listing-category-badge">
                    {listing.category}
                  </span>

                  {listing.isFree && (
                    <span className="free-badge">
                      FREE
                    </span>
                  )}

                </div>


                {/* CONTENT */}
                <div className="listing-details">

                  <div className="listing-title-row">

                    <h3>
                      {listing.title}
                    </h3>

                    <strong className="listing-price">
                      {listing.isFree
                        ? "FREE"
                        : `₹${listing.price}`}
                    </strong>

                  </div>

                  <p className="listing-description">
                    {listing.description}
                  </p>


                  <div className="listing-condition">
                    <span>
                      Condition
                    </span>

                    <strong>
                      {listing.condition}
                    </strong>
                  </div>


                  <div className="listing-seller">

                    <div className="seller-avatar">
                      {listing.seller
                        ? listing.seller
                            .charAt(0)
                            .toUpperCase()
                        : "U"}
                    </div>

                    <div className="seller-info">

                      <strong>
                        {listing.seller}
                      </strong>

                      <span>
                        {listing.college}
                      </span>

                    </div>

                  </div>


                  <div className="listing-posted">
                    Posted {listing.postedAt}
                  </div>


                  {/* ACTIONS */}
                  <div className="listing-actions">

                    <button
                      className="contact-seller-btn"
                      onClick={() =>
                        onContactSeller(listing)
                      }
                    >
                      Contact Seller
                      <span>→</span>
                    </button>

                    <button
                      className="icon-action-btn"
                      onClick={() =>
                        onEdit(listing)
                      }
                      aria-label="Edit listing"
                      title="Edit listing"
                    >
                      Edit
                    </button>

                    <button
                      className="icon-action-btn danger"
                      onClick={() =>
                        onDelete(listing.id)
                      }
                      aria-label="Delete listing"
                      title="Delete listing"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </article>

            ))}

          </div>

        ) : (

          /* EMPTY STATE */
          <div className="empty-marketplace">

            <div className="empty-marketplace-icon">
              <span>✦</span>
            </div>

            <p className="marketplace-section-label">
              NOTHING HERE YET
            </p>

            <h2>
              {searchQuery ||
              selectedCategory !== "All"
                ? "No listings found"
                : "Your marketplace is waiting."}
            </h2>

            <p>
              {searchQuery ||
              selectedCategory !== "All"
                ? "Try another search or choose a different category."
                : "Be the first student to give something a second life."}
            </p>

            {searchQuery ||
            selectedCategory !== "All" ? (

              <button
                className="empty-secondary-btn"
                onClick={() => {
                  onSearchChange("");
                  onCategoryChange("All");
                }}
              >
                Clear filters
              </button>

            ) : (

              <button
                className="sell-item-btn empty-sell-btn"
                onClick={onSell}
              >
                <span>+</span>
                Sell your first item
              </button>

            )}

          </div>

        )}

      </main>


      {/* FOOTER */}
      <footer className="marketplace-footer">

        <div className="marketplace-footer-logo">
          Uni<span>Go</span>
        </div>

        <p>
          Your student world, all in one place.
        </p>
         <p className="lf-creator">Built by Student for Student</p>

        <button onClick={onBack}>
          Back to home ↑
        </button>

      </footer>

    </div>
  );
}

export default Marketplace;