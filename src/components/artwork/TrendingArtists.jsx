const artists = [
    "Vincent van Gogh",
    "Claude Monet",
    "Pablo Picasso",
    "Hokusai",
    "Rembrandt"
];

function TrendingArtists() {
    return (
        <div className="d-flex gap-3 overflow-auto pb-2">

            {artists.map((artist) => (
                <div
                    key={artist}
                    className="card-art p-4"
                >
                    {artist}
                </div>
            ))}

        </div>
    );
}

export default TrendingArtists;