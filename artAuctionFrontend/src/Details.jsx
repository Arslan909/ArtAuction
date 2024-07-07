import React from 'react';

function Details() {
  const [postDetail, setPostDetail] = React.useState(null);
  const [counter, setCounter] = React.useState({ hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    fetch("http://127.0.0.1:6969/ArtPost/postDetails/668afa722b05d0c754cd556a", {
      method: 'GET',
      headers: {
        'Authorization': `Bearer `
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPostDetail(data);
        if (data.duration && data.duration.totalSeconds) {
          startCounter(data.duration.totalSeconds);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const startCounter = (totalSeconds) => {
    const timer = ()=>{

      if(totalSeconds < 0){
        clearInterval(timerId)
      }

      let sec = totalSeconds
      let hours = Math.floor(sec/3600)
      sec %= 3600
      let minutes = Math.floor(sec/60)
      sec %= 60
  
      setCounter({
        "hours":hours,
        "minutes":minutes,
        "seconds":sec
      })
      totalSeconds--
    }
    const timerId = setInterval(timer, 1000)

  };

  if (!postDetail) {
    return <div>Loading...</div>;
  }

  const { data } = postDetail;

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
        <div className="md:hidden">
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
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">{data.category} Painting</h1>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <img src={data.image} alt="Art piece" className="w-full h-auto object-cover rounded-lg" />
              </div>
              <div>
                <div className="mb-4">
                  <div className="bg-black text-white px-4 py-2 rounded-md inline-block mb-2">
                    Category: {data.category}
                  </div>
                  <h2 className="text-lg font-bold">Description</h2>
                  <div className="mt-2 text-gray-500">
                    <p>{data.description}</p>
                  </div>
                  <div className="border-b border-gray-300 my-4"></div>
                  {data.bidStatus === 'bidding' ? (
                    <>
                      <div className="mb-4">
                        <h2 className="text-lg font-bold">Duration</h2>
                        <div className="mt-2 text-gray-500">
                          <p className="bg-black text-white px-4 py-2 rounded-md inline-flex items-center justify-center">
                            {`${counter.hours}h ${counter.minutes}m ${counter.seconds}s`}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h2 className="text-lg font-bold">Status</h2>
                        <div className="mt-2 text-gray-500">
                          <p>{data.bidStatus}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h2 className="text-lg font-bold">Bidding Start Time</h2>
                        <div className="mt-2 text-gray-500">
                          <p>{new Date(data.biddingStartTime).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h2 className="text-lg font-bold">Bidding End Time</h2>
                        <div className="mt-2 text-gray-500">
                          <p>{new Date(data.biddingEndTime).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h2 className="text-lg font-bold">Highest Bid</h2>
                        <div className="mt-2 text-gray-500">
                          <p>${data.highestBid}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <input
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1 mr-4"
                          placeholder="Enter your bid"
                          type="number"
                        />
                        <button className="bg-black text-white px-4 py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                          Place Bid
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mb-4">
                      <h2 className="text-lg font-bold">Fixed Price</h2>
                      <div className="mt-2 text-gray-500">
                        <p>${data.fixedPrice}</p>
                        <button className="bg-black text-white px-4 py-2 rounded-md inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 mt-2">
                          Buy Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Details;
