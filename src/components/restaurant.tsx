import React, { FC } from 'react';

interface RestaurantProps {
  id: number;
  coverImage: string;
  name: string;
  categoryName?: string;
}

export const Restaurant: FC<RestaurantProps> = ({
  id,
  coverImage,
  name,
  categoryName,
}) => {
  return (
    <div className="flex flex-col" key={`restaurant-${id}`}>
      <div
        className="bg-center py-28 mb-3"
        style={{ backgroundImage: `url(${coverImage})` }}
      ></div>
      <h3 className="text-md font-medium">{name}</h3>
      <span className="border-t mt-2 py-2 border-gray-400 text-xs opacity-50">
        {categoryName}
      </span>
    </div>
  );
};
