import DefaultLayout from "@/components/DefaultLayout";

const InventoryPage = () => {
  return (
    <DefaultLayout>
      <h1 className="text-gray-800 text-3xl font-semibold">
        Welcome to the Inventory
      </h1>
      <p className="text-gray-800">
        This is the main content area for the inventory.
      </p>
    </DefaultLayout>
  );
};

export default InventoryPage;
