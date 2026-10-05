import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import "./Community.css";

export const COMMUNITY_CATEGORIES = [
  "Questions",
  "Discussions",
  "Announcements",
  "Study",
  "Events",
] as const;

export type CommunityCategory = (typeof COMMUNITY_CATEGORIES)[number];
export type CommunityFilter = "All" | CommunityCategory;

export type CommunityComment = {
  id: string;
  postId: string;
  authorName: string;
  content: string;
  createdAt: string;
};

export type CommunityPost = {
  id: string;
  authorName: string;
  authorInitial: string;
  category: CommunityCategory;
  title: string;
  content: string;
  likes: number;
  liked: boolean;
  comments: CommunityComment[];
  createdAt: string;
};

type CommunityProps = {
  onHome: () => void;
  onMarketplace: () => void;
  onLostFound: () => void;
  onEvents: () => void;
  onLogin: () => void;
};

const FILTERS: CommunityFilter[] = [
  "All",
  "Questions",
  "Discussions",
  "Announcements",
  "Study",
  "Events",
];

const CURRENT_STUDENT = "You";

const INITIAL_POSTS: CommunityPost[] = [];

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function Community({
  onHome,
  onMarketplace,
  onLostFound,
  onEvents,
  onLogin,
}: CommunityProps) {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_POSTS);

  const [selectedCategory, setSelectedCategory] =
    useState<CommunityFilter>("All");

  const [showCreateForm, setShowCreateForm] = useState(false);

  const [title, setTitle] = useState("");

  const [category, setCategory] =
    useState<CommunityCategory>("Questions");

  const [content, setContent] = useState("");

  const [formError, setFormError] = useState("");

  const [expandedPostId, setExpandedPostId] =
    useState<string | null>(null);

  const [commentDrafts, setCommentDrafts] =
    useState<Record<string, string>>({});

  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") {
      return posts;
    }

    return posts.filter(
      (post) => post.category === selectedCategory
    );
  }, [posts, selectedCategory]);

  const resetCreateForm = () => {
    setTitle("");
    setCategory("Questions");
    setContent("");
    setFormError("");
    setShowCreateForm(false);
  };

  const openCreateForm = () => {
    setFormError("");
    setShowCreateForm(true);
  };

  const handlePublish = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (!trimmedTitle || !trimmedContent) {
      setFormError(
        "Please add a title and some content before publishing."
      );
      return;
    }

    const newPost: CommunityPost = {
      id: createId(),
      authorName: CURRENT_STUDENT,
      authorInitial: "Y",
      category,
      title: trimmedTitle,
      content: trimmedContent,
      likes: 0,
      liked: false,
      comments: [],
      createdAt: "Just now",
    };

    setPosts((currentPosts) => [
      newPost,
      ...currentPosts,
    ]);

    setSelectedCategory("All");

    resetCreateForm();
  };

  const toggleLike = (postId: string) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          liked: !post.liked,
          likes: post.liked
            ? post.likes - 1
            : post.likes + 1,
        };
      })
    );
  };

  const toggleComments = (postId: string) => {
    setExpandedPostId((currentId) =>
      currentId === postId ? null : postId
    );
  };

  const submitComment = (postId: string) => {
    const commentText = (
      commentDrafts[postId] ?? ""
    ).trim();

    if (!commentText) {
      return;
    }

    const newComment: CommunityComment = {
      id: createId(),
      postId,
      authorName: CURRENT_STUDENT,
      content: commentText,
      createdAt: "Just now",
    };

    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id !== postId) {
          return post;
        }

        return {
          ...post,
          comments: [
            ...post.comments,
            newComment,
          ],
        };
      })
    );

    setCommentDrafts((currentDrafts) => ({
      ...currentDrafts,
      [postId]: "",
    }));
  };

  return (
    <div className="app community-app">

      {/* =========================
          NAVBAR
      ========================== */}

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
            className="active"
            onClick={(e) => {
              e.preventDefault();
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
          className="login-btn"
          onClick={onLogin}
        >
          Login
        </button>

      </nav>


      {/* =========================
          COMMUNITY MAIN
      ========================== */}

      <main className="community-page">

        {/* HERO */}

        <section className="community-hero">

          <p className="small-title">
            STUDENT CAMPUS SPACE
          </p>

          <h1>
            UniGo Community
          </h1>

          <p className="community-subtitle">
            Connect, ask, share, and learn with fellow students.
          </p>

          <button
            className="view-btn"
            onClick={openCreateForm}
          >
            Create Post
          </button>

        </section>


        {/* FILTERS */}

        <div
          className="community-filters"
          role="tablist"
          aria-label="Post categories"
        >

          {FILTERS.map((filter) => (

            <button
              key={filter}
              type="button"
              className={
                selectedCategory === filter
                  ? "is-active"
                  : ""
              }
              onClick={() =>
                setSelectedCategory(filter)
              }
            >
              {filter}
            </button>

          ))}

        </div>


        {/* POSTS */}

        {filteredPosts.length > 0 ? (

          <section
            className="community-feed"
            aria-label="Community feed"
          >

            {filteredPosts.map((post) => {

              const commentsOpen =
                expandedPostId === post.id;

              return (

                <article
                  className="community-post"
                  key={post.id}
                >

                  {/* POST HEADER */}

                  <header className="community-post-header">

                    <div
                      className="community-avatar"
                      aria-hidden="true"
                    >
                      {post.authorInitial}
                    </div>

                    <div className="community-post-meta">

                      <strong>
                        {post.authorName}
                      </strong>

                      <p>
                        {post.category} · {post.createdAt}
                      </p>

                    </div>

                  </header>


                  {/* POST CONTENT */}

                  <h2>
                    {post.title}
                  </h2>

                  <p className="community-post-content">
                    {post.content}
                  </p>


                  {/* ACTIONS */}

                  <div className="community-post-actions">

                    <button
                      type="button"
                      className={
                        post.liked
                          ? "is-liked"
                          : ""
                      }
                      onClick={() =>
                        toggleLike(post.id)
                      }
                      aria-pressed={post.liked}
                    >
                      {post.liked
                        ? "♥ Liked"
                        : "♡ Like"}{" "}
                      · {post.likes}
                    </button>


                    <button
                      type="button"
                      className={
                        commentsOpen
                          ? "is-open"
                          : ""
                      }
                      onClick={() =>
                        toggleComments(post.id)
                      }
                    >
                      💬 Comments ·{" "}
                      {post.comments.length}
                    </button>

                  </div>


                  {/* COMMENTS */}

                  {commentsOpen && (

                    <div className="community-comments">

                      {post.comments.length === 0 ? (

                        <p className="community-comments-empty">
                          No comments yet. Start the conversation.
                        </p>

                      ) : (

                        post.comments.map((comment) => (

                          <div
                            className="community-comment"
                            key={comment.id}
                          >

                            <strong>
                              {comment.authorName}
                            </strong>

                            <span>
                              {comment.createdAt}
                            </span>

                            <p>
                              {comment.content}
                            </p>

                          </div>

                        ))

                      )}


                      {/* COMMENT FORM */}

                      <form
                        className="community-comment-form"
                        onSubmit={(event) => {
                          event.preventDefault();
                          submitComment(post.id);
                        }}
                      >

                        <input
                          type="text"
                          value={
                            commentDrafts[post.id] ?? ""
                          }
                          onChange={(e) =>
                            setCommentDrafts(
                              (currentDrafts) => ({
                                ...currentDrafts,
                                [post.id]:
                                  e.target.value,
                              })
                            )
                          }
                          placeholder="Write a comment..."
                          aria-label={`Comment on ${post.title}`}
                        />

                        <button
                          type="submit"
                          className="view-btn"
                        >
                          Post
                        </button>

                      </form>

                    </div>

                  )}

                </article>

              );

            })}

          </section>

        ) : (

          /* EMPTY STATE */

          <section className="community-empty">

            <h2>
              No posts here yet.
            </h2>

            <p>
              Be the first to start a conversation.
            </p>

            <button
              className="view-btn"
              onClick={openCreateForm}
            >
              Create Post
            </button>

          </section>

        )}

      </main>


      {/* =========================
          CREATE POST MODAL
      ========================== */}

            {showCreateForm && (

        <div
          className="community-modal-backdrop"
          onClick={resetCreateForm}
        >

          <div
            className="community-modal"
            role="dialog"
            aria-labelledby="create-post-title"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <p className="small-title">
              NEW POST
            </p>

            <h2 id="create-post-title">
              Create Post
            </h2>

            <p>
              Share a question, update, or useful campus tip.
            </p>

            <form onSubmit={handlePublish}>

              {/* TITLE */}

              <div className="form-group">

                <label htmlFor="community-post-title">
                  Post title
                </label>

                <input
                  id="community-post-title"
                  type="text"
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                  placeholder="What do you want to share?"
                />

              </div>


              {/* CATEGORY */}

              <div className="form-group">

                <label htmlFor="community-post-category">
                  Category
                </label>

                <select
                  id="community-post-category"
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value as CommunityCategory
                    )
                  }
                >

                  {COMMUNITY_CATEGORIES.map(
                    (option) => (

                      <option
                        key={option}
                        value={option}
                      >
                        {option}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* CONTENT */}

              <div className="form-group">

                <label htmlFor="community-post-content">
                  Post content
                </label>

                <textarea
                  id="community-post-content"
                  rows={5}
                  value={content}
                  onChange={(e) =>
                    setContent(e.target.value)
                  }
                  placeholder="Write your question or information here..."
                />

              </div>


              {/* ERROR */}

              {formError && (

                <p className="community-form-error">
                  {formError}
                </p>

              )}


              {/* MODAL ACTIONS */}

              <div className="community-modal-actions">

                <button
                  type="button"
                  className="community-cancel-btn"
                  onClick={resetCreateForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="view-btn"
                >
                  Publish Post
                </button>

              </div>

            </form>

          </div>

        </div>

      )}


      {/* FOOTER */}

      <footer className="community-footer">

        <div className="community-footer-logo">
          Uni<span>Go</span>
        </div>

        <p>
          Your student world, all in one place.
        </p>

        <p className="community-creator">
          Built by Student for Student
        </p>

      </footer>


    </div>
  );
}

export default Community;