import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../reusable/Button";
import {
  getHotelById,
  updateHotel,
} from "../../../services/hotelservice";

function OwnerUpdateHotel() {
  const { id } = useParams();
  const navigate = useNavigate();

  const initialHotel = {
    id: 0,
    ownerId: 1, // later from JWT
    hotelName: "",
    description: "",
    address: "",
    city: "",
    country: "",
    status: "ACTIVE",
  };

  const [hotelData, setHotelData] = useState(initialHotel);
  const [loading, setLoading] = useState(false);

  // ✅ FETCH HOTEL BY ID
  useEffect(() => {
    (async () => {
      try {
        const res = await getHotelById(id);

        console.log("Raw API response:", res.data);

        // ✅ BACKEND RETURNS { data: hotel }
        const hotel = res.data?.data;

        console.log("Resolved hotel:", hotel);

        if (!hotel) return;

        setHotelData({
          id: hotel.id ?? 0,
          ownerId: hotel.ownerId ?? 1,
          hotelName: hotel.hotelName ?? "",
          description: hotel.description ?? "",
          address: hotel.address ?? "",
          city: hotel.city ?? "",
          country: hotel.country ?? "",
          status: hotel.status ?? "ACTIVE",
        });
      } catch (error) {
        console.error("Error fetching hotel:", error);
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

      console.log("Update payload:", payload);

      await updateHotel(hotelData.id, payload);

      navigate("/owner/hotels");
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold text-center mb-4">
            Update Hotel
          </h2>

          <form className="space-y-4" onSubmit={handleUpdate}>
            <div>
              <label className="label">Hotel Name</label>
              <input
                type="text"
                name="hotelName"
                value={hotelData.hotelName}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Description</label>
              <input
                type="text"
                name="description"
                value={hotelData.description}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Address</label>
              <input
                type="text"
                name="address"
                value={hotelData.address}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">City</label>
              <input
                type="text"
                name="city"
                value={hotelData.city}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Country</label>
              <input
                type="text"
                name="country"
                value={hotelData.country}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                className="input input-bordered w-full"
                required
              />
            </div>

            <div>
              <label className="label">Status</label>
              <select
                name="status"
                value={hotelData.status}
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
                className="select select-bordered w-full"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="INACTIVE">INACTIVE</option>
              </select>
            </div>

            <Button
              css="w-full mt-4 btn btn-soft btn-info"
              text={loading ? "Updating..." : "Update Hotel"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerUpdateHotel;
