import React, { useEffect, useState } from "react";
import Button from "../../reusable/Button";
import { getHotelsByOwnerId } from "../../../services/hotelservice";
import { saveRoom } from "../../../services/roomservice";
import { uploadImage } from "../../../services/imageservices";

function OwnerAddRoom() {
  const init = {
    hotelId: "",
    roomNumber: "",
    roomType: "",
    pricePerNight: "",
    maxGuests: "",
    description: "",
    isActive: true,
  };

  const [roomData, setRoomData] = useState(init);
  const [hotels, setHotels] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onChangeHandler = (name, value) => {
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  async function handleSave(e) {
    e.preventDefault();

    try {
      setLoading(true);
      // 🔹 Convert types
      const payload = {
        ...roomData,
        hotelId: Number(roomData.hotelId),
        pricePerNight: Number(roomData.pricePerNight),
        maxGuests: Number(roomData.maxGuests),
        isActive: roomData.isActive === "true" || roomData.isActive === true,
      };

      console.log("Saving Room:", payload);

      // 1️⃣ Save Room First
      const roomRes = await saveRoom(payload);
      const savedRoom = roomRes.data;
      console.log("Saved Room:", savedRoom);

      // 2️⃣ Upload Image AFTER room is created
      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("entityType", "ROOM");
        formData.append("entityId", savedRoom.id);

        const imgRes = await uploadImage(formData);
        console.log("Room image uploaded:", imgRes.data);
      }

      alert("Room added successfully!");
      setRoomData(init);
      setImage(null);
    } catch (error) {
      console.error("Error saving room:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      let res = await getHotelsByOwnerId(1);
      setHotels(res.data.data);
    })();
  }, []);

  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center mb-4">Add Room</h2>

          <form className="space-y-4" onSubmit={handleSave}>
            {/* HOTEL */}
            <div>
              <label className="label">Hotel</label>
              <select
                name="hotelId"
                value={roomData.hotelId}
                className="select select-bordered w-full"
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                required
              >
                <option value="">Select Hotel</option>
                {hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.hotelName}
                  </option>
                ))}
              </select>
            </div>
            {/* ROOM NUMBER */}
            <div>
              <label className="label">Room Number</label>
              <input
                type="text"
                name="roomNumber"
                value={roomData.roomNumber}
                className="input input-bordered w-full"
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                required
              />
            </div>
            {/* ROOM Description */}
            <div>
              <label className="label">Description</label>
              <input
                type="text"
                name="description"
                value={roomData.description}
                className="input input-bordered w-full"
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                required
              />
            </div>
            {/* ROOM TYPE */}
            <div>
              <label className="label">Room Type</label>
              <select
                name="roomType"
                value={roomData.roomType}
                className="select select-bordered w-full"
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                required
              >
                <option value="">Select Room Type</option>
                <option value="SINGLE">SINGLE</option>
                <option value="DOUBLE">DOUBLE</option>
                <option value="SUITE">SUITE</option>
              </select>
            </div>
            {/* PRICE */}
            <div>
              <label className="label">Price Per Night</label>
              <input
                type="number"
                name="pricePerNight"
                value={roomData.pricePerNight}
                className="input input-bordered w-full"
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                required
              />
            </div>
            {/* MAX GUESTS */}
            <div>
              <label className="label">Max Guests</label>
              <input
                type="number"
                name="maxGuests"
                value={roomData.maxGuests}
                className="input input-bordered w-full"
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                required
              />
            </div>
            {/* STATUS */}
            <div>
              <label className="label">Status</label>
              <select
                name="isActive"
                value={roomData.isActive}
                className="select select-bordered w-full"
                onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
              >
                <option value="true">ACTIVE</option>
                <option value="false">INACTIVE</option>
              </select>
            </div>
            {/* ROOM IMAGE */}
            <div>
              <label className="label">Room Image</label>
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
                text="Save Room"
              />
            )}{" "}
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerAddRoom;
