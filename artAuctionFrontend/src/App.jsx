import React from 'react';
import axios from 'axios';

const App = () => {
  const [isBidding, setIsBidding] = React.useState(false);
  const [data, setData] = React.useState({
    image: null,
    category: '',
    fixedPrice: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const handleBiddingChange = (event) => {

    setIsBidding(event.target.checked);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData()
    formData.append('image', data.image)
    formData.append('category', data.category)
    formData.append('fixedPrice', data.fixedPrice)
    formData.append('description', data.description)

    

    if (isBidding) {
      formData.append('bidStatus','bidding')
      formData.append('biddingStartTime', new Date(data.startDate).toISOString())
      formData.append('biddingEndTime', new Date( data.endDate).toISOString())
    }
    else{
      formData.append('bidStatus','selling')
    }
    const formDataObj = Array.from(formData.entries()).reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
    console.log('FormData:', formDataObj);


    try {
      const response = await axios.post('http://127.0.0.1:6969/ArtPost/createPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ODVjYTFkMmE5ODdmYzE0MjU2NGQzYiIsInVzZXJOYW1lIjoidXNlcjEiLCJlbWFpbCI6InVzZXIxZUBleGFtcGxlLmNvbSIsImlhdCI6MTcyMDY0ODQzNywiZXhwIjoxNzIwNzM0ODM3fQ.okm4s862KpzTmwi6pj6qYuq9HhhYBrSJjnM4x-Fmwio'
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

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
          <form className="grid gap-6" onSubmit={handleSubmit}>
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
                    {/* <svg
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
                    </svg> */}
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input id="image" type="file" name="image" required onChange={handleChange} />
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
                name="category"
                required
                placeholder="Enter category i.e abstract, landscape"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="fixed-price" className="block font-medium mb-2">
                Fixed Price
              </label>
              <input
                className="flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white border border-gray-300 focus:border-gray-500 rounded-md"
                type="number"
                id="fixed-price"
                name="fixedPrice"
                required
                placeholder="This will be used as a fallback value if no bidding occurs"
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="description" className="block font-medium mb-2">
                Description
              </label>
              <textarea
                className="flex min-h-[80px] px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white border border-gray-300 focus:border-gray-500 rounded-md"
                id="description"
                name="description"
                required
                placeholder="Provide some description about your art i.e hand drawn colored sketch"
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isBidding}
                  onChange={handleBiddingChange}
                  className="h-4 w-4 text-black border-gray-300 rounded"
                />
                <span className="font-medium">Activate Bidding</span>
              </label>
            </div>
            {isBidding && (
              <>
                <div>
                  <label htmlFor="start-date" className="block font-medium mb-2">
                    Start Date
                  </label>
                  <input
                    className="flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white border border-gray-300 focus:border-gray-500 rounded-md"
                    type="datetime-local"
                    id="start-date"
                    name="startDate"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="block font-medium mb-2">
                    End Date
                  </label>
                  <input
                    className="flex h-10 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full bg-white border border-gray-300 focus:border-gray-500 rounded-md"
                    type="datetime-local"
                    id="end-date"
                    name="endDate"
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}
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
