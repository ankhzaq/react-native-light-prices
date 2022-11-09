import { View, ScrollView, Text } from "react-native";
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity';
import React, { useEffect, useState } from 'react';

const FeaturedRow = ({ description, id, featuredCategory, title }) => {

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
     *[_type == "featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type -> {
            name
          }
        },
      }[0]`, { id }).then((data) => {
        setRestaurants(data?.restaurants);
    });
  }, []);

  console.log("restaurants: ", restaurants);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB" />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RestaurantCards... */}
        {
          restaurants.map((props) => (
            <RestaurantCard
              {...props}
            />
          ))
        }
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
