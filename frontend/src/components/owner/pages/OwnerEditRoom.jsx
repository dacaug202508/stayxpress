import React, { useEffect, useState } from "react";
import Button from "../../reusable/Button";
import { useParams } from "react-router-dom";
import { getRoomById, updateRoom } from "../../../services/roomservice";

function OwnerEditRoom() {
  const params = useParams();

  // ✅ INITIAL STATE (MATCH BACKEND STRUCTURE)
  const initialRoom = {
    id: 0,
    isActive: true,
    maxGuests: 2,
    pricePerNight: 0,
    roomNumber: "",
    description: "",
    roomType: "",
    hotel: {
      id: 0,
      hotelName: "",
      address: "",
      city: "",
      country: "",
      description: "",
      status: "",
      createdAt: "",
    },
  };

  let [loading, setLoading] = useState(false);

  const [roomData, setRoomData] = useState(initialRoom);

  // ✅ FETCH ROOM BY ID
  useEffect(() => {
    (async () => {
      try {
        const res = await getRoomById(params.roomId);
        console.log(res.data.room);
        setRoomData(res.data.room);
      } catch (error) {
        console.error("Error fetching room", error);
      }
    })();
  }, [params.roomId]);

  console.log(roomData.hotel);

  // ✅ COMMON CHANGE HANDLER
  const onChangeHandler = (name, value) => {
    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ SUBMIT HANDLER
  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload = {
        id: roomData.id,
        hotelId: roomData.hotel.id,
        roomNumber: roomData.roomNumber,
        description: roomData.description,
        pricePerNight: roomData.pricePerNight,
        maxGuests: roomData.maxGuests,
        isActive: roomData.isActive,
        roomType: roomData.roomType,
      };

      console.log("Final Payload:", payload);

      let res = await updateRoom(payload);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center mb-4">Edit Room</h2>

          <form className="space-y-4" onSubmit={handleEdit}>
            {/* HOTEL NAME */}
            <div>
              <label className="label">Hotel Name</label>
              <input
                type="text"
                value={roomData.hotel?.hotelName || ""}
                className="input input-bordered w-full"
                disabled
              />
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
                onChange={(e) =>
                  onChangeHandler(e.target.name, Number(e.target.value))
                }
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
                onChange={(e) =>
                  onChangeHandler(e.target.name, Number(e.target.value))
                }
                required
              />
            </div>

            {/* STATUS */}
            <div>
              <label className="label">Status</label>
              <select
                name="isActive"
                value={String(roomData.isActive)}
                className="select select-bordered w-full"
                onChange={(e) =>
                  onChangeHandler("isActive", e.target.value === "true")
                }
              >
                <option value="true">ACTIVE</option>
                <option value="false">INACTIVE</option>
              </select>
            </div>

            <Button
              css="w-full mt-4 btn btn-soft btn-info"
              text={loading ? "Saving..." : "Save Room"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerEditRoom;
