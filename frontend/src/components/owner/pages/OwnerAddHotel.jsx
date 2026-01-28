import React, { useState } from "react";
import Button from "../../reusable/Button";
import { saveHotel } from "../../../services/hotelservice";
import { uploadImage } from "../../../services/imageservices";

function OwnerAddHotel() {
  const init = {
    id: 0,
    ownerId: 1, // dummy owner id (replace from auth later)
    hotelName: "",
    description: "",
    address: "",
    city: "",
    country: "",
    status: "ACTIVE",
  };

  let [image, setImage] = useState();

  let [loading, setLoading] = useState(false);

  const [hotelData, setHotelData] = useState(init);

  const onChangeHandler = (name, value) => {
    setHotelData({
      ...hotelData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      // 1️⃣ Save hotel first
      const hotelRes = await saveHotel(hotelData);
      const savedHotel = hotelRes.data.data;
      console.log("Saved Hotel:", savedHotel);

      // 2️⃣ Upload image AFTER hotel is saved
      if (image) {
        console.log("image : " + image);
        const formData = new FormData();
        formData.append("file", image);
        formData.append("entityType", "HOTEL");
        formData.append("entityId", savedHotel.id);

        const imgRes = await uploadImage(formData);
        console.log("Image uploaded and linked:", imgRes.data);
      }

      alert("Hotel saved successfully!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center mb-4">Add Hotel</h2>

          <form className="space-y-4" onSubmit={handleSave}>
            {/* HOTEL NAME */}
            <div>
              <label className="label">Hotel Name</label>
              <input
                type="text"
                name="hotelName"
                value={hotelData.hotelName}
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                className="input input-bordered w-full"
                placeholder="Hotel Name"
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="label">Description</label>
              <input
                type="text"
                name="description"
                value={hotelData.description}
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                className="input input-bordered w-full"
                placeholder="Description"
                required
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="label">Address</label>
              <input
                type="text"
                name="address"
                value={hotelData.address}
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                className="input input-bordered w-full"
                placeholder="Address"
                required
              />
            </div>

            {/* CITY */}
            <div>
              <label className="label">City</label>
              <input
                type="text"
                name="city"
                value={hotelData.city}
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                className="input input-bordered w-full"
                placeholder="City"
                required
              />
            </div>

            {/* COUNTRY */}
            <div>
              <label className="label">Country</label>
              <input
                type="text"
                name="country"
                value={hotelData.country}
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                className="input input-bordered w-full"
                placeholder="Country"
                required
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="label">Status</label>
              <select
                name="status"
                value={hotelData.status}
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            {/* HOTEL IMAGE */}
            <div>
              <label className="label">Hotel Image</label>
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered w-full"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </div>
            {loading ? (
              <Button
                css="w-full mt-4 btn btn-soft btn-info"
                text="Saving...."
              />
            ) : (
              <Button
                css="w-full mt-4 btn btn-soft btn-info"
                text="Save Hotel"
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerAddHotel;
