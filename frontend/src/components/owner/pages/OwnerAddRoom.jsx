import React, { useEffect, useState } from "react";
import Button from "../../reusable/Button";
import { getHotelsByOwnerId } from "../../../services/hotelservice";
import { saveRoom } from "../../../services/roomservice";
import { uploadImage } from "../../../services/imageservices";
import { toast } from "react-toastify";
import {
  FaHotel,
  FaBed,
  FaMoneyBillWave,
  FaUsers,
  FaImage,
  FaAlignLeft,
  FaDoorOpen,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

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

  let navigate = useNavigate()

  const [roomData, setRoomData] = useState(init);
  const [hotels, setHotels] = useState([]);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= IMAGE HANDLER ================= */
  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please upload a valid image");
      return;
    }
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleImageChange = (e) => {
    handleFile(e.target.files[0]);
  };

  /* ================= DRAG & DROP ================= */
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  /* ======= PREVENT MEMORY LEAK ======= */
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  /* ================= INPUT HANDLER ================= */
  const onChangeHandler = (name, value) => {
    setRoomData({ ...roomData, [name]: value });
  };

  /* ================= SAVE ROOM ================= */
  async function handleSave(e) {
    e.preventDefault();

    if (!roomData.hotelId) {
      toast.error("Please select a hotel.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...roomData,
        hotelId: Number(roomData.hotelId),
        pricePerNight: Number(roomData.pricePerNight),
        maxGuests: Number(roomData.maxGuests),
        isActive: roomData.isActive === true,
      };

      const roomRes = await saveRoom(payload);
      const savedRoom = roomRes.data;

      if (image) {
        try {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("entityType", "ROOM");
          formData.append("entityId", savedRoom.id);
          await uploadImage(formData);
        } catch {
          toast.warn("Room saved, but image upload failed.");
        }
      }

      toast.success("Room added successfully!");
      setRoomData(init);
      setImage(null);
      setImagePreview(null);
      navigate("/owner/rooms-pricing");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save room.");
    } finally {
      setLoading(false);
    }
  }

  /* ================= FETCH HOTELS ================= */
  useEffect(() => {
    (async () => {
      try {
        const ownerId = localStorage.getItem("user_id");
        const res = await getHotelsByOwnerId(ownerId);
        setHotels(res.data.data);
      } catch {
        toast.error("Could not load hotels");
      }
    })();
  }, []);

  /* ================= UI ================= */
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="card w-full max-w-4xl bg-white/80 shadow-2xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaBed /> Add New Room
        </h2>

        <form className="space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT */}
            <div className="space-y-4">
              <select
                name="hotelId"
                className="select select-bordered w-full"
                value={roomData.hotelId}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                required
              >
                <option value="">Select Hotel</option>
                {hotels.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.hotelName}
                  </option>
                ))}
              </select>

              <input
                name="roomNumber"
                placeholder="Room Number"
                className="input input-bordered"
                value={roomData.roomNumber}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                required
              />

              <select
                name="roomType"
                className="select select-bordered"
                value={roomData.roomType}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                required
              >
                <option value="">Room Type</option>
                <option value="SINGLE">Single</option>
                <option value="DOUBLE">Double</option>
                <option value="SUITE">Suite</option>
              </select>

              <input
                type="number"
                name="pricePerNight"
                placeholder="Price per night"
                className="input input-bordered"
                value={roomData.pricePerNight}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                min="0"
                required
              />

              <input
                type="number"
                name="maxGuests"
                placeholder="Max Guests"
                className="input input-bordered"
                value={roomData.maxGuests}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                min="1"
                required
              />
            </div>

            {/* RIGHT */}
            <div className="space-y-4">
              <textarea
                name="description"
                className="textarea textarea-bordered"
                placeholder="Room description"
                value={roomData.description}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                required
              />

              <div className="flex gap-4">
                <label>
                  <input
                    type="radio"
                    checked={roomData.isActive}
                    onChange={() => onChangeHandler("isActive", true)}
                  />{" "}
                  Active
                </label>
                <label>
                  <input
                    type="radio"
                    checked={!roomData.isActive}
                    onChange={() => onChangeHandler("isActive", false)}
                  />{" "}
                  Inactive
                </label>
              </div>

              {/* DRAG & DROP IMAGE */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-6 text-center transition ${dragActive
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-300"
                  }`}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="fileUpload"
                  onChange={handleImageChange}
                />
                <label htmlFor="fileUpload" className="cursor-pointer">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded"
                    />
                  ) : (
                    <>
                      <FaImage className="text-4xl mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">
                        Drag & drop image here or click to upload
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            css="w-full btn btn-primary"
            text={loading ? "Saving..." : "Save Room"}
          />
        </form>
      </div>
    </div>
  );
}

export default OwnerAddRoom;
