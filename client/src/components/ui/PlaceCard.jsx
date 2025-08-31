import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  if (!place) return null; // ✅ Avoid crashes if place is undefined

  const { _id: placeId, photos, address, title, price } = place;

  // ✅ Use a fallback image if photos array is empty or missing
  const firstPhoto = photos?.[0] || '/placeholder.jpg';

  return (
    <Link
      to={`/place/${placeId}`}
      className="m-4 flex flex-col md:m-2 xl:m-0"
    >
      <div className="card">
        <img
          src={firstPhoto}
          alt={title || 'Place'}
          className="h-4/5 w-full rounded-xl object-cover"
          onError={(e) => {
            // ✅ Fallback if image fails to load
            e.target.src = '/placeholder.jpg';
          }}
        />

        <h2 className="truncate font-bold">
          {address || 'Unknown Location'}
        </h2>
        <h3 className="truncate text-sm text-gray-500">
          {title || 'Untitled Place'}
        </h3>
        <div className="mt-1">
          <span className="font-semibold">₹{price || 'N/A'}</span>
          <span className="text-gray-600"> per night</span>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
