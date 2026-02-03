import React, { useEffect, useState } from "react";
import Button from "../../reusable/Button";
import { useParams, useNavigate } from "react-router-dom";
import { getRoomById, updateRoom } from "../../../services/roomservice";
import { toast } from "react-toastify";
import {
  FaBed,
  FaDoorOpen,
  FaMoneyBillWave,
  FaUsers,
  FaAlignLeft,
  FaCheckCircle,
  FaEdit
} from "react-icons/fa";

function OwnerEditRoom() {
  const params = useParams();
  const navigate = useNavigate();

  //  INITIAL STATE (MATCH BACKEND STRUCTURE)
  const initialRoom = {
    id: 0,
    isActive: true,
    maxGuests: 2,
    pricePerNight: 0,
    roomNumber: "",
    description: "",
    roomType: "",
    hotelId: 0,
  };

  let [loading, setLoading] = useState(false);
  const [roomData, setRoomData] = useState(initialRoom);

  useEffect(() => {
    (async () => {
      try {
        const res = await getRoomById(params.roomId);
        console.log(res.data);
        setRoomData(res.data || initialRoom);
      } catch (error) {
        console.error("Error fetching room", error);
        toast.error("Failed to fetch room details");
      }
    })();
  }, [params.roomId]);

  // COMMON CHANGE HANDLER
  const onChangeHandler = (name, value) => {
    setRoomData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SUBMIT HANDLER
  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let payload = {
        id: roomData.id,
        hotelId: roomData?.hotelId,
        roomNumber: roomData.roomNumber,
        description: roomData.description,
        pricePerNight: roomData.pricePerNight,
        maxGuests: roomData.maxGuests,
        isActive: roomData.isActive,
        roomType: roomData.roomType,
      };

      console.log("Final Payload:", payload);

      await updateRoom(payload);
      toast.success("Room updated successfully!");
      navigate("/owner/rooms-pricing");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update room.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="card w-full max-w-4xl bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-white/50">
        <div className="card-body p-8">

          {/* HEADER */}
          <div className="flex items-center gap-3 mb-8 border-b pb-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg">
              <FaEdit className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Edit Room</h2>
              <p className="text-gray-500 text-sm">Update room specifications</p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleEdit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* LEFT COLUMN */}
              <div className="space-y-6">
                {/* ROOM NUMBER */}
                <div className="form-control">
                  <label className="label font-medium">Room Number</label>
                  <div className="relative">
                    <FaDoorOpen className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="roomNumber"
                      value={roomData.roomNumber}
                      className="input input-bordered w-full pl-10 bg-gray-50"
                      onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* ROOM TYPE */}
                <div className="form-control">
                  <label className="label font-medium">Room Type</label>
                  <div className="relative">
                    <FaBed className="absolute left-3 top-3 text-gray-400" />
                    <select
                      name="roomType"
                      value={roomData.roomType}
                      className="select select-bordered w-full pl-10 bg-gray-50"
                      onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                      required
                    >
                      <option value="">Select Room Type</option>
                      <option value="SINGLE">SINGLE</option>
                      <option value="DOUBLE">DOUBLE</option>
                      <option value="SUITE">SUITE</option>
                    </select>
                  </div>
                </div>

                {/* PRICE */}
                <div className="form-control">
                  <label className="label font-medium">Price Per Night</label>
                  <div className="relative">
                    <FaMoneyBillWave className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      name="pricePerNight"
                      value={roomData.pricePerNight}
                      className="input input-bordered w-full pl-10 bg-gray-50"
                      onChange={(e) =>
                        onChangeHandler(e.target.name, Number(e.target.value))
                      }
                      required
                    />
                  </div>
                </div>

                {/* MAX GUESTS */}
                <div className="form-control">
                  <label className="label font-medium">Max Guests</label>
                  <div className="relative">
                    <FaUsers className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="number"
                      name="maxGuests"
                      value={roomData.maxGuests}
                      className="input input-bordered w-full pl-10 bg-gray-50"
                      onChange={(e) =>
                        onChangeHandler(e.target.name, Number(e.target.value))
                      }
                      required
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                {/* ROOM Description */}
                <div className="form-control">
                  <label className="label font-medium">Description</label>
                  <div className="relative">
                    <FaAlignLeft className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="description"
                      value={roomData.description}
                      className="textarea textarea-bordered w-full pl-10 h-32 bg-gray-50"
                      onChange={(e) => onChangeHandler(e.target.name, e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* STATUS */}
                <div className="form-control">
                  <label className="label font-medium">Status</label>
                  <div className="relative">
                    <FaCheckCircle className="absolute left-3 top-3 text-gray-400" />
                    <select
                      name="isActive"
                      value={String(roomData.isActive)}
                      className="select select-bordered w-full pl-10 bg-gray-50"
                      onChange={(e) =>
                        onChangeHandler("isActive", e.target.value === "true")
                      }
                    >
                      <option value="true">ACTIVE</option>
                      <option value="false">INACTIVE</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              css={`w-full btn btn-lg mt-6 border-none ${loading
                ? "bg-gray-400"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                }`}
              text={loading ? "Saving..." : "Save Room"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerEditRoom;
