import React from 'react';

const ArtCard = ({ title, description, imageSrc, hours, minutes, seconds }) => (
  <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
    <div className="relative overflow-hidden rounded-lg">
      <img
        src={imageSrc}
        alt="Art piece"
        className="w-full h-48 object-cover"
        style={{ aspectRatio: '500 / 500', objectFit: 'cover' }}
      />
    </div>
    <div className="mt-4">
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
      <div className="flex flex-col items-start mt-4">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
          Bid on this art
        </button>
        <div className="flex items-center justify-center bg-black text-white text-sm font-bold px-4 py-1 mt-2 w-full">
          <span>{hours}h-</span>
          <span> {minutes}m-</span>
          <span>{seconds}s</span>
        </div>
      </div>
    </div>
  </div>
);

const Explore = () => {
  const [artPosts, setArtPosts] = React.useState([])
  React.useEffect(() => {
    fetch("http://127.0.0.1:6969/ArtPost/forAuction",
      {
        method: 'GET',
        header: {
          'Authorization': `Bearer `
        },
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setArtPosts(data)
      })
      .catch((error) => {
        console.log(error);
      })
  },[])
  const artPieces = [
    {
      title: 'Abstract Painting',
      description: 'Vibrant colors and bold strokes.',
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo0F3RSOtT0KlhgTtK07uYx9TcYY1XiscSOQ&s',
      time: '0h',
    },
    {
      title: 'Landscape Painting',
      description: 'Serene and calming nature scene.',
      imageSrc: 'https://media.cnn.com/api/v1/images/stellar/prod/190430171751-mona-lisa.jpg?q=w_2000,c_fill',
      time: '1h',
    },
    {
      title: 'Portrait Painting',
      description: 'Captivating and lifelike portrait.',
      imageSrc: 'https://media.cnn.com/api/v1/images/stellar/prod/190430171751-mona-lisa.jpg?q=w_2000,c_fill',
      time: '2h',
    },
    {
      title: 'Still Life Painting',
      description: 'Detailed and visually striking.',
      imageSrc: 'https://media.cnn.com/api/v1/images/stellar/prod/190430171751-mona-lisa.jpg?q=w_2000,c_fill',
      time: '1h',
    },
  ];

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
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
            <span className="sr-only">Toggle navigation</span>
          </button>
        </div>
      </header>
      <main className="flex-1 bg-gray-100 py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold">Explore Art</h1>
              <p className="text-gray-500 mt-2">Bid on arts of your choice or something.</p>
            </div>
            <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 pb-4">
              <div className="inline-flex items-start space-x-8 p-5">
                {artPosts.map((art, index) => (
                  <ArtCard
                    key={index}
                    title={art.data.category}
                    description={art.data.description}
                    imageSrc={art.data.image}
                    hours={art.duration.hours}
                    minutes={art.duration.minutes}
                    seconds={art.duration.seconds}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Explore;
