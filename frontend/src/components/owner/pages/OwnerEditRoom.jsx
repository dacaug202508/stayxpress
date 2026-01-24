import React, { useState } from "react";
import Button from "../../reusable/Button";

function OwnerEditRoom() {

  // ✅ Room form state
  const initialRoom = {
    hotel_id: "",
    room_number: "",
    room_type: "",
    price_per_night: "",
    max_guests: "",
    is_active: "true",
  };

  const [roomData, setRoomData] = useState(initialRoom);

  //  Dummy hotel list (dropdown)
  const hotelList = [
    { id: 1, name: "Hotel Sunrise" },
    { id: 2, name: "Hotel Ocean View" },
  ];

  const onChangeHandler = (name, value) => {
    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();

    const payload = {
      ...roomData,
      hotel_id: Number(roomData.hotel_id),
      price_per_night: Number(roomData.price_per_night),
      max_guests: Number(roomData.max_guests),
      is_active: roomData.is_active === "true",
    };

    console.log("Payload:", payload);

    // 🔥 API call here
    // axios.put(`/api/rooms/${id}`, payload)
  };

  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">

          <h2 className="text-xl font-semibold text-center mb-4">
            Edit Room
          </h2>

          <form className="space-y-4" onSubmit={handleEdit}>

            {/* HOTEL */}
            <div>
              <label className="label">Hotel</label>
              <select
                name="hotel_id"
                value={roomData.hotel_id}
                className="select select-bordered w-full"
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                required
              >
                <option value="">Select Hotel</option>
                {hotelList.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </option>
                ))}
              </select>
            </div>

            {/* ROOM NUMBER */}
            <div>
              <label className="label">Room Number</label>
              <input
                type="text"
                name="room_number"
                value={roomData.room_number}
                className="input input-bordered w-full"
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                required
              />
            </div>

            {/* ROOM TYPE */}
            <div>
              <label className="label">Room Type</label>
              <select
                name="room_type"
                value={roomData.room_type}
                className="select select-bordered w-full"
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
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
                name="price_per_night"
                value={roomData.price_per_night}
                className="input input-bordered w-full"
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                required
              />
            </div>

            {/* MAX GUESTS */}
            <div>
              <label className="label">Max Guests</label>
              <input
                type="number"
                name="max_guests"
                value={roomData.max_guests}
                className="input input-bordered w-full"
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                required
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="label">Status</label>
              <select
                name="is_active"
                value={roomData.is_active}
                className="select select-bordered w-full"
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
              >
                <option value="true">ACTIVE</option>
                <option value="false">INACTIVE</option>
              </select>
            </div>

            <Button
              css="w-full mt-4 btn btn-soft btn-info"
              text="Save Room"
            />
          </form>

        </div>
      </div>
    </div>
  );
}

export default OwnerEditRoom;
