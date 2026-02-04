import React, { useEffect, useState } from "react";
import Button from "../../reusable/Button";
import { saveHotel } from "../../../services/hotelservice";
import { uploadImage } from "../../../services/imageservices";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  FaHotel,
  FaMapMarkerAlt,
  FaCity,
  FaGlobe,
  FaAlignLeft,
  FaImage,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function OwnerAddHotel() {
  const { userId } = useSelector((state) => state.auth);

  const init = {
    id: 0,
    ownerId: userId,
    hotelName: "",
    description: "",
    address: "",
    city: "",
    country: "",
    status: "INACTIVE",
  };
  let navigate = useNavigate()

  const [hotelData, setHotelData] = useState(init);
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

  const handleImageChange = (e) => handleFile(e.target.files[0]);

  /* ================= DRAG & DROP ================= */
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

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
    setHotelData({ ...hotelData, [name]: value });
  };

  /* ================= SAVE HOTEL ================= */
  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const hotelRes = await saveHotel(hotelData);
      const savedHotel = hotelRes.data.data;

      if (image) {
        try {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("entityType", "HOTEL");
          formData.append("entityId", savedHotel.id);
          await uploadImage(formData);
        } catch {
          toast.warn("Hotel saved, but image upload failed.");
        }
      }

      toast.success("Hotel added successfully!");
      setHotelData(init);
      setImage(null);
      setImagePreview(null);
      navigate("/owner/hotel-info");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save hotel.");
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
      <div className="card w-full max-w-4xl bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl overflow-hidden border border-white/50">
        <div className="card-body p-8">
          {/* HEADER */}
          <div className="flex items-center gap-3 mb-8 border-b pb-4">
            <div className="p-3 bg-blue-600 rounded-xl text-white shadow-lg">
              <FaHotel className="text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Add New Hotel
              </h2>
              <p className="text-gray-500 text-sm">
                Register your hotel details
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSave}>
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

                {/* STATUS TOGGLE */}
                {/* <div className="form-control">
                  <label className="label font-medium">Hotel Status</label>
                  <div className="flex gap-4">
                    <label>
                      <input
                        type="radio"
                        name="status"
                        checked={hotelData.status === "ACTIVE"}
                        onChange={() => onChangeHandler("status", "ACTIVE")}
                      />{" "}
                      Active
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="status"
                        checked={hotelData.status === "INACTIVE"}
                        onChange={() => onChangeHandler("status", "INACTIVE")}
                      />{" "}
                      Inactive
                    </label>
                  </div>
                </div> */}

                {/* DRAG & DROP IMAGE */}
                <div className="form-control">
                  <label className="label font-medium">Hotel Image</label>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition relative group ${dragActive ? "border-blue-600 bg-blue-50" : "border-gray-300 hover:border-blue-500"
                      }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg shadow-sm"
                        />
                        <p className="mt-2 text-xs text-green-600 font-medium">Click to replace</p>
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        <FaImage className="text-4xl mx-auto mb-2 text-gray-300 group-hover:text-blue-400 transition-colors" />
                        <p className="text-sm">Drag & drop or click to upload</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              disabled={loading}
              css={`w-full btn btn-lg mt-6 border-none text-lg ${loading
                ? "bg-gray-400"
                : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all"
                }`}
              text={loading ? "Saving..." : "Save Hotel Property"}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default OwnerAddHotel;
