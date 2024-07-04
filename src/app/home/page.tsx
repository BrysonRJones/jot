import Recent from "../ui/Recent";
import Sidebar from "../ui/Sidebar";

export default function Home() {
  return (
    <div className="flex flex-row h-screen w-screen">
      <Sidebar />
      <div id="homeContent" className="flex flex-col">
        <div id="recent" className="flex flex-row">
          <Recent />
        </div>
        <div id="notes" className="flex flex-row"></div>
      </div>
    </div>
  );
}
