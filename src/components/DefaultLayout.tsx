import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <div className="p-6 bg-white h-full">{children}</div>
      </div>
    </div>
  );
};

export default DefaultLayout;
