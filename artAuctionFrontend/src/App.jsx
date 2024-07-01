import React from 'react';


const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-black text-white py-2 px-4 md:px-6 flex items-center justify-center">
        <nav className="flex items-center space-x-4">
          <a className="hover:underline" href="#">
            Home
          </a>
          <a className="hover:underline" href="#">
            Explore
          </a>
          <a className="hover:underline" href="#">
            Upload
          </a>
          <a className="hover:underline" href="#">
            Profile
          </a>
        </nav>
        <div className="ml-auto md:hidden">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12"></line>
              <line x1="4" x2="20" y1="6" y2="6"></line>
              <line x1="4" x2="20" y1="18" y2="18"></line>
            </svg>
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 py-12 px-4 md:px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold mb-4">Create New Art Post</h1>
          <form className="grid gap-6">
            <div>
              <label htmlFor="image" className="block font-medium mb-2">
                Upload Image
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-10 w-10 text-gray-400"
                    >
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" x2="12" y1="3" y2="15"></line>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                  </div>
                  <input id="image" type="file" className="hidden" />
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block font-medium mb-2">
                Category
              </label>
              <input
                className="flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white border border-gray-300 focus:border-gray-500 rounded-md"
                type="text"
                id="category"
                placeholder="Enter category"
              />
            </div>
            <div>
              <label htmlFor="description" className="block font-medium mb-2">
                Description
              </label>
              <textarea
                className="flex min-h-[80px] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white border border-gray-300 focus:border-gray-500 rounded-md"
                id="description"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div>
              <label htmlFor="price" className="block font-medium mb-2">
                Estimated Price
              </label>
              <input
                className="flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white border border-gray-300 focus:border-gray-500 rounded-md"
                type="number"
                id="price"
                placeholder="Enter price"
              />
            </div>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-black text-white hover:bg-gray-800"
              type="submit"
            >
              Create Post
            </button>
          </form>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-4 px-4 md:px-6 text-center">
        <p>© 2023 Art Gallery. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
