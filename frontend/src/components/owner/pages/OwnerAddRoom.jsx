import React, { useEffect, useState } from "react";
import Button from "../../reusable/Button";
import { getHotelsByOwnerId } from "../../../services/hotelservice";
import { saveRoom } from "../../../services/roomservice";

function OwnerAddRoom() {
  const init = {
    // id:25,
    hotelId: "",
    roomNumber: "",
    roomType: "",
    pricePerNight: "",
    maxGuests: "",
    isActive: true,
  };

  const [roomData, setRoomData] = useState(init);
  const [hotels, setHotels] = useState([{
    id : 0,
    hotelName : ""

  }]);

  const onChangeHandler = (name, value) => {
    setRoomData({
      ...roomData,
      [name]: value,
    });
  };

  async function handleSave(e) {
    e.preventDefault();

    // ✅ convert types before API call
    const payload = {...roomData};
    console.log(payload);

    let res = await saveRoom(payload);
    console.log(res.data)



  }

  // const hotels = [
  //   { id: 1, name: "Hotel Sunrise" },
  //   { id: 2, name: "Ocean View Resort" },
  //   { id: 3, name: "Mountain Stay" },
  // ];



  useEffect(() => {
    (
      async () => {
        let res = await getHotelsByOwnerId(2)
        // console.log(res.data.data)
        setHotels(res.data.data)
      }
    )()
  }, []);



  return (
    <div className="w-full min-h-full flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl">
        <div className="card-body">

          <h2 className="text-xl font-semibold text-center mb-4">
            Add Room
          </h2>

          <form className="space-y-4" onSubmit={handleSave}>

            {/* HOTEL */}
            <div>
              <label className="label">Hotel</label>
              <select
                name="hotelId"
                value={roomData.hotelId}
                className="select select-bordered w-full"
                onChange={(e) =>
                  onChangeHandler(e.target.name, e.target.value)
                }
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
                placeholder="Room Number"
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
                name="roomType"
                value={roomData.roomType}
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
                name="pricePerNight"
                value={roomData.pricePerNight}
                className="input input-bordered w-full"
                placeholder="Price"
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
                name="maxGuests"
                value={roomData.maxGuests}
                className="input input-bordered w-full"
                placeholder="Max Guests"
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
                name="isActive"
                value={roomData.isActive}
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

export default OwnerAddRoom;
