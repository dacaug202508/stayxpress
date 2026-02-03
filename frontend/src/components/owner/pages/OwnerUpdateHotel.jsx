import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../reusable/Button";
import {
  getHotelById,
  updateHotel,
} from "../../../services/hotelservice";
import { toast } from "react-toastify";
import {
  FaHotel,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaAlignLeft,
  FaEdit
} from "react-icons/fa";

function OwnerUpdateHotel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialHotel = {
    id: 0,
    ownerId: localStorage.getItem("user_id"),
    hotelName: "",
    description: "",
    address: "",
    city: "",
    country: "",
    status: "",
  };

  const [hotelData, setHotelData] = useState(initialHotel);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH HOTEL BY ID
  useEffect(() => {
    (async () => {
      try {
        const res = await getHotelById(id);
        const hotel = res.data?.data;
        if (!hotel) {
          toast.error("Hotel not found");
          return;
        }

        setHotelData({
          id: hotel.id ?? 0,
          ownerId: hotel.ownerId ?? localStorage.getItem("user_id"),
          hotelName: hotel.hotelName ?? "",
          description: hotel.description ?? "",
          address: hotel.address ?? "",
          city: hotel.city ?? "",
          country: hotel.country ?? "",
          status: hotel.status,
        });
      } catch (error) {
        console.error("Error fetching hotel:", error);
        toast.error("Failed to load hotel details.");
      }
    })();
  }, [id]);

  // ✅ COMMON CHANGE HANDLER
  const onChangeHandler = (name, value) => {
    setHotelData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ✅ UPDATE HANDLER
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        id: hotelData.id,
        ownerId: hotelData.ownerId,
        hotelName: hotelData.hotelName,
        description: hotelData.description,
        address: hotelData.address,
        city: hotelData.city,
        country: hotelData.country,
        status: hotelData.status,
      };

      await updateHotel(hotelData.id, payload);
      toast.success("Hotel updated successfully!");
      navigate("/owner/upload-info");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update hotel.");
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
              <h2 className="text-2xl font-bold text-gray-800">
                Update Hotel
              </h2>
              <p className="text-gray-500 text-sm">
                Modify your hotel details
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* LEFT COLUMN */}
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label font-medium">Hotel Name</label>
                  <div className="relative">
                    <FaHotel className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="hotelName"
                      value={hotelData.hotelName}
                      onChange={(e) =>
                        onChangeHandler(e.target.name, e.target.value)
                      }
                      className="input input-bordered w-full pl-10 bg-gray-50"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-medium">Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={hotelData.address}
                      onChange={(e) =>
                        onChangeHandler(e.target.name, e.target.value)
                      }
                      className="input input-bordered w-full pl-10 bg-gray-50"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-medium">City</label>
                  <div className="relative">
                    <FaCity className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="city"
                      value={hotelData.city}
                      onChange={(e) =>
                        onChangeHandler(e.target.name, e.target.value)
                      }
                      className="input input-bordered w-full pl-10 bg-gray-50"
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-medium">Country</label>
                  <div className="relative">
                    <FaGlobe className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      name="country"
                      value={hotelData.country}
                      onChange={(e) =>
                        onChangeHandler(e.target.name, e.target.value)
                      }
                      className="input input-bordered w-full pl-10 bg-gray-50"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-6">
                <div className="form-control">
                  <label className="label font-medium">Description</label>
                  <div className="relative">
                    <FaAlignLeft className="absolute left-3 top-3 text-gray-400" />
                    <textarea
                      name="description"
                      value={hotelData.description}
                      onChange={(e) =>
                        onChangeHandler(e.target.name, e.target.value)
                      }
                      className="textarea textarea-bordered w-full pl-10 h-32 bg-gray-50"
                      required
                    />
                  </div>
                </div>

                {/* <div className="form-control">
                  <label className="label font-medium">Status</label>
                  <select
                    name="status"
                    value={hotelData.status}
                    onChange={(e) =>
                      onChangeHandler(e.target.name, e.target.value)
                    }
                    className="select select-bordered w-full bg-gray-50"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                  </select>
                </div> */}
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              css={`w-full btn btn-lg mt-6 border-none ${loading
                ? "bg-gray-400"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                }`}
              text={loading ? "Updating..." : "Update Hotel Details"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerUpdateHotel;
