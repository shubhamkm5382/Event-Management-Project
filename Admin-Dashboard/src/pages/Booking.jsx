function Booking() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Booking</h1>
      <form className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Customer Name"
          className="w-full border p-2 rounded"
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
        />
        <select className="w-full border p-2 rounded">
          <option>Select Event Type</option>
          <option>Wedding</option>
          <option>Birthday</option>
          <option>Corporate</option>
        </select>
        <input
          type="number"
          placeholder="Number of Guests"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Book Event
        </button>
      </form>
    </div>
  );
}
export default Booking;
