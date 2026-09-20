import { useState } from "react";

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


type SellItemProps = {
  onBack: () => void;

  onPublish: (listing: Listing) => void;

  editingListing?: Listing | null;
};


function SellItem({
  onBack,
  onPublish,
  editingListing,
}: SellItemProps) {

  const [image, setImage] = useState<string | null>(
    editingListing?.image || null
  );

  const [title, setTitle] = useState(
    editingListing?.title || ""
  );

  const [category, setCategory] = useState(
    editingListing?.category || "Select category"
  );

  const [condition, setCondition] = useState(
    editingListing?.condition || "Select condition"
  );

  const [description, setDescription] = useState(
    editingListing?.description || ""
  );

  const [price, setPrice] = useState(
    editingListing?.isFree
      ? ""
      : editingListing?.price || ""
  );

  const [isFree, setIsFree] = useState(
    editingListing?.isFree || false
  );


  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = event.target.files?.[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }

  };


  const handlePublish = () => {

    if (!image) {
      alert("Please add a product photo.");
      return;
    }


    if (!title.trim()) {
      alert("Please enter the item name.");
      return;
    }


    if (category === "Select category") {
      alert("Please select a category.");
      return;
    }


    if (condition === "Select condition") {
      alert("Please select the condition.");
      return;
    }


    if (!description.trim()) {
      alert("Please enter a description.");
      return;
    }


    if (!isFree && !price) {
      alert("Please enter a price or select free.");
      return;
    }


    const listing: Listing = {

      id: editingListing
        ? editingListing.id
        : Date.now(),

      image: image,

      title: title,

      category: category,

      condition: condition,

      description: description,

      price: isFree
        ? "FREE"
        : price,

      seller: editingListing?.seller || "Student",

      college: editingListing?.college || "Your College",

      postedAt: editingListing?.postedAt || "Just now",

      isFree: isFree,

    };


    onPublish(listing);

  };


  return (
    <div className="sell-page">


      {/* Back */}
      <button
        className="view-btn"
        onClick={onBack}
      >
        ← Back to Marketplace
      </button>


      {/* Header */}
      <div className="sell-header">

        <p className="small-title">
          UNIGO MARKETPLACE
        </p>


        <h1>
          {editingListing
            ? "Edit listing"
            : "Sell an item"}
        </h1>


        <p>
          {editingListing
            ? "Update your listing information."
            : "Give your unused things a new home with another student."}
        </p>

      </div>


      {/* Form */}
      <div className="sell-form">


        {/* Photo */}
        <div className="form-section">

          <h2>
            Product photo
          </h2>


          <p className="form-help">
            Add a clear photo so students know what they're buying.
          </p>


          <label className="photo-upload">

            {image ? (

              <img
                src={image}
                alt="Product preview"
                className="photo-preview"
              />

            ) : (

              <>

                <div className="upload-icon">
                  📸
                </div>


                <strong>
                  Add product photo
                </strong>


                <span>
                  Click to upload an image
                </span>

              </>

            )}


            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />

          </label>

        </div>


        {/* Item Details */}
        <div className="form-section">

          <h2>
            Item details
          </h2>


          {/* Item Name */}
          <div className="form-group">

            <label>
              Item name
            </label>


            <input
              type="text"
              placeholder="e.g. Engineering Mathematics Book"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

          </div>


          {/* Category + Condition */}
          <div className="form-row">

            <div className="form-group">

              <label>
                Category
              </label>


              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >

                <option>
                  Select category
                </option>

                <option>
                  Books
                </option>

                <option>
                  Stationery
                </option>

                <option>
                  Electronics
                </option>

                <option>
                  Notes
                </option>

                <option>
                  Components
                </option>

                <option>
                  Campus Items
                </option>

                <option>
                  Other
                </option>

              </select>

            </div>


            <div className="form-group">

              <label>
                Condition
              </label>


              <select
                value={condition}
                onChange={(e) =>
                  setCondition(e.target.value)
                }
              >

                <option>
                  Select condition
                </option>

                <option>
                  New
                </option>

                <option>
                  Like New
                </option>

                <option>
                  Good
                </option>

                <option>
                  Used
                </option>

              </select>

            </div>

          </div>


          {/* Description */}
          <div className="form-group">

            <label>
              Description
            </label>


            <textarea
              placeholder="Tell students about your item..."
              rows={5}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            />

          </div>

        </div>


        {/* Price */}
        <div className="form-section">

          <h2>
            Price
          </h2>


          <div className="form-group">

            <label>
              Selling price
            </label>


            <div className="price-input">

              <span>
                ₹
              </span>


              <input
                type="number"
                placeholder="0"
                value={price}
                disabled={isFree}
                onChange={(e) =>
                  setPrice(e.target.value)
                }
              />

            </div>

          </div>


          {/* Free */}
          <label className="free-option">

            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => {

                setIsFree(e.target.checked);

                if (e.target.checked) {
                  setPrice("");
                }

              }}
            />

            Give this item away for free

          </label>

        </div>


        {/* Publish / Update */}
        <button
          className="publish-btn"
          onClick={handlePublish}
        >

          {editingListing
            ? "Update Listing"
            : "Publish Listing"}

        </button>


      </div>

    </div>
  );
}


export default SellItem;