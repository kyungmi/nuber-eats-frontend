import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from '../../__generated__/RestaurantsPageQuery';

const RESTAURANT_QUERY = gql`
  query RestaurantsPageQuery($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants: FC = () => {
  const { data, loading, error } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANT_QUERY, {
    variables: {
      input: {
        page: 1,
      },
    },
  });
  return (
    <div>
      <Helmet>
        <title>Restaurants | Nuber Eats</title>
      </Helmet>
      <form className="bg-gray-800 w-full py-40 flex items-center justify-center">
        <input
          type="search"
          className="input rounded-md border-0 w-3/12"
          placeholder="Search restaurants..."
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-screen-md mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <div
                className="group w-16 flex flex-col items-center cursor-pointer"
                key={`category-${category.slug}`}
              >
                <div
                  className="w-full h-16 rounded-full bg-cover group-hover:bg-gray-200"
                  style={{ backgroundImage: `url(${category.coverImage})` }}
                ></div>
                <span className="mt-1 text-sm text-center font-medium">
                  {category.name}
                </span>
              </div>
            ))}
          </div>
          <div className="grid mt-10 grid-cols-3 gap-x-5 gap-y-10">
            {data?.restaurants.results?.map((restaurant) => (
              <div key={`restaurant-${restaurant.id}`}>
                <div
                  className="bg-center py-28 mb-3"
                  style={{ backgroundImage: `url(${restaurant.coverImage})` }}
                ></div>
                <h3 className="text-lg font-medium">{restaurant.name}</h3>
                <span className="border-t-2 bg-gray-200">
                  {restaurant.category?.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};
