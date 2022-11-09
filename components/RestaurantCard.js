import { Image, View, Text, TouchableOpacity } from 'react-native';
import { LocationMarkerIcon, StarIcon } from 'react-native-heroicons/outline';
import React from 'react';
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native"

const RestaurantCard = (props) => {

  const {
    id,
    image,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat
  } = props;

  const navigation = useNavigation('Restaurant');

  return (
    <TouchableOpacity
      className="bg-white mr-3 shadow"
      onPress={() => {
        navigation.navigate('Restaurant', {
          ...props
        })
      }}
    >
      <Image
        className="h-36 w-64 rounded-sm"
        source={{ uri: image && urlFor(image).url()}}
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> - {genre}
          </Text>
        </View>

        <View className="flex-row items-center space-x-1">
          <LocationMarkerIcon color="gray" opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby - {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default RestaurantCard;
