import DefaultLayout from "@/components/DefaultLayout";

const DashboardPage = () => {
  return (
    <DefaultLayout>
      <h1 className="text-gray-800 text-3xl font-semibold">
        Welcome to the Dashboard
      </h1>
      <p className="text-gray-800">
        This is the main content area for the dashboard.
      </p>
    </DefaultLayout>
  );
};

export default DashboardPage;
