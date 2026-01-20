import "./App.css";
import Homeimage from "./components/common/Homeimage";
import HomeInput from "./components/common/HomeInput";
import HomeDetails from "./components/common/HomeDetails";
import Card from "./components/reusable/Card";
import CardGrid from "./components/reusable/CardGrid";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  let state = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(state);
  });

  return (
    <>
      {/* MAIN CONTAINER */}
      <div className="bg-gray-100 w-screen min-h-screen flex p-12 gap-6">
        {/* LEFT SIDE */}
        <div className="flex flex-col flex-1 gap-6">
          <div className="flex-1 p-4">
            <HomeDetails />
          </div>

          <div className="bg-white rounded-2xl shadow-sm flex-1 p-6">
            <HomeInput />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 p-10 flex items-center justify-center">
          <Homeimage image_src={"images/hotel.jpg"} css={"rounded-lg"} />
        </div>
      </div>
      <div className="p-16  grid gap-5">
        <CardGrid />
      </div>
    </>
  );
}

export default App;
