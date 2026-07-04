function Navbar() {
  return (
    <header className="bg-white shadow px-8 py-4 flex justify-between items-center">

      <h2 className="text-2xl font-bold">
        Dashboard
      </h2>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="border rounded-lg px-4 py-2"
        />

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
          A
        </div>

      </div>

    </header>
  );
}

export default Navbar;