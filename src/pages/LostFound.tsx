import { useState } from "react";
import "./LostFound.css";

type LostFoundProps = {
  onHome: () => void;
  onMarketplace: () => void;
  onCommunity: () => void;
  onEvents: () => void;
  onLogin: () => void;
};

type ReportType = "lost" | "found";

function LostFound({
  onHome,
  onMarketplace,
  onCommunity,
  onEvents,
  onLogin,
}: LostFoundProps) {
  const [showForm, setShowForm] = useState(false);
  const [reportType, setReportType] = useState<ReportType>("lost");

  const [itemName, setItemName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const openReportForm = (type: ReportType) => {
    setReportType(type);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    alert(
      `${reportType === "lost" ? "Lost" : "Found"} item report created. Backend connection will be added later.`
    );

    setItemName("");
    setLocation("");
    setDate("");
    setDescription("");
    setImage(null);
    setShowForm(false);
  };

  return (
    <div className="lost-found-page">

      {/* NAVBAR */}
      <nav className="lf-navbar">

        <button className="lf-logo" onClick={onHome}>
          UniGo
        </button>

        <div className="lf-nav-links">

          <a href="/" onClick={(e) => {
            e.preventDefault();
            onHome();
          }}>
            Home
          </a>

          <a href="/marketplace" onClick={(e) => {
            e.preventDefault();
            onMarketplace();
          }}>
            Marketplace
          </a>

          <a
            href="/lost-found"
            className="active"
            onClick={(e) => e.preventDefault()}
          >
            Lost & Found
          </a>

          <a href="/community" onClick={(e) => {
            e.preventDefault();
            onCommunity();
          }}>
            Community
          </a>

          <a href="/events" onClick={(e) => {
            e.preventDefault();
            onEvents();
          }}>
            Events
          </a>

        </div>

        <button className="lf-login" onClick={onLogin}>
          Login
        </button>

      </nav>

      {/* HERO */}
      <section className="lf-hero">

        <div className="lf-hero-content">

          <span className="lf-eyebrow">
            CAMPUS LOST & FOUND
          </span>

          <h1>
            Lost something?
            <br />
            <span>Found something?</span>
          </h1>

          <p>
            Help your campus community reconnect with
            the things that matter.
          </p>

          <div className="lf-hero-actions">

            <button
              className="lf-primary-btn"
              onClick={() => openReportForm("lost")}
            >
              Report Lost Item
            </button>

            <button
              className="lf-secondary-btn"
              onClick={() => openReportForm("found")}
            >
              Report Found Item
            </button>

          </div>

        </div>

        <div className="lf-hero-card">

          <div className="lf-hero-icon">
            🔎
          </div>

          <span>UNI</span>

          <strong>
            Reconnect.
          </strong>

          <small>
            Right where you study.
          </small>

        </div>

      </section>

      {/* SEARCH */}
      <section className="lf-search-section">

        <div className="lf-search-box">

          <span>⌕</span>

          <input
            type="text"
            placeholder="Search lost or found items..."
          />

          <button>
            Search
          </button>

        </div>

        <div className="lf-filters">

          <button className="filter-active">
            All Items
          </button>

          <button>
            Lost
          </button>

          <button>
            Found
          </button>

          <button>
            Recent
          </button>

        </div>

      </section>

      {/* REPORT OPTIONS */}
      <section className="lf-report-section">

        <div className="lf-section-heading">

          <span>
            GET STARTED
          </span>

          <h2>
            Help someone find their way back.
          </h2>

          <p>
            Report an item in a few simple steps.
          </p>

        </div>

        <div className="lf-report-grid">

          <button
            className="lf-report-card"
            onClick={() => openReportForm("lost")}
          >

            <div className="lf-card-icon">
              🔍
            </div>

            <div>
              <span className="card-label">
                LOST ITEM
              </span>

              <h3>
                I lost something
              </h3>

              <p>
                Tell the campus community what you
                lost and where you last saw it.
              </p>
            </div>

            <strong>
              Report lost →
            </strong>

          </button>

          <button
            className="lf-report-card found-card"
            onClick={() => openReportForm("found")}
          >

            <div className="lf-card-icon">
              ✨
            </div>

            <div>
              <span className="card-label">
                FOUND ITEM
              </span>

              <h3>
                I found something
              </h3>

              <p>
                Report an item you found so its owner
                can identify and reclaim it.
              </p>
            </div>

            <strong>
              Report found →
            </strong>

          </button>

        </div>

      </section>

      {/* EMPTY STATE */}
      <section className="lf-items-section">

        <div className="lf-items-heading">

          <div>
            <span>
              CAMPUS REPORTS
            </span>

            <h2>
              Recently reported
            </h2>
          </div>

          <p>
            Browse items reported by students.
          </p>

        </div>

        <div className="lf-empty-state">

          <div className="empty-icon">
            ✦
          </div>

          <h3>
            No reports yet
          </h3>

          <p>
            Lost or found something on campus?
            Be the first to report it.
          </p>

          <button
            onClick={() => openReportForm("lost")}
          >
            Create a report
          </button>

        </div>

      </section>

      {/* REPORT FORM */}
      {showForm && (
        <div
          className="lf-modal-overlay"
          onClick={() => setShowForm(false)}
        >

          <div
            className="lf-modal"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="lf-close"
              onClick={() => setShowForm(false)}
            >
              ×
            </button>

            <span className="lf-eyebrow">
              {reportType === "lost"
                ? "LOST ITEM"
                : "FOUND ITEM"}
            </span>

            <h2>
              {reportType === "lost"
                ? "Report something you lost"
                : "Report something you found"}
            </h2>

            <p className="lf-modal-description">
              Add the details below so students can
              identify the item.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="lf-form-group">

                <label>
                  Item name
                </label>

                <input
                  required
                  value={itemName}
                  onChange={(e) =>
                    setItemName(e.target.value)
                  }
                  placeholder="e.g. Black wallet"
                />

              </div>

              <div className="lf-form-row">

                <div className="lf-form-group">

                  <label>
                    Location
                  </label>

                  <input
                    required
                    value={location}
                    onChange={(e) =>
                      setLocation(e.target.value)
                    }
                    placeholder="e.g. Library"
                  />

                </div>

                <div className="lf-form-group">

                  <label>
                    Date
                  </label>

                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                  />

                </div>

              </div>

              <div className="lf-form-group">

                <label>
                  Description
                </label>

                <textarea
                  required
                  rows={4}
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  placeholder="Describe the item, colour, identifying marks, etc."
                />

              </div>

              <div className="lf-form-group">

                <label>
                  Photo
                </label>

                <label className="lf-upload">

                  <span>＋</span>

                  <div>
                    <strong>
                      {image
                        ? image.name
                        : "Upload a photo"}
                    </strong>

                    <small>
                      JPG, PNG or WEBP
                    </small>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setImage(
                        e.target.files?.[0] || null
                      )
                    }
                  />

                </label>

              </div>

              <button
                type="submit"
                className="lf-submit"
              >
                Publish {reportType === "lost" ? "Lost" : "Found"} Report
              </button>

            </form>

          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer className="lf-footer">

        <div>
          <strong>
            UniGo
          </strong>

          <p>
            Your student world, all in one place.
          </p>
           <p className="lf-creator">Built by Anusha Tiwari</p>
        </div>

        <span>
          Lost & Found
        </span>

      </footer>

    </div>
  );
}

export default LostFound;