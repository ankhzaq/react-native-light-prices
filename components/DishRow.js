import { View, Text } from 'react-native';
import Currency from "react-currency-formatter";
import { Image, TouchableOpacity } from 'react-native-web';
import React, { useState } from 'react';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';

const DishRow = (props) => {
  const { _id, image, name, short_description, price } = props;
  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector((state) => selectBasketItemsWithId(state, _id));

  const dispatch = useDispatch();


  const addItemToBasket = () => {
    dispatch(addToBasket({ ...props }))
  }

  const removeItemToBasket = () => {
    if (items.length === 0) return;

    dispatch(removeFromBasket({ _id }))
  }

  return (
    <>
      <TouchableOpacity className={`bg-white border p-4 border-gray-200 ${ isPressed && "border-b-0"}`} onPress={() => setIsPressed(!isPressed)}>
        <View className="flex-row">
          <View className="flex-1 pr-2">
            <Text className="text-lg mb-1">{name}</Text>
            <Text className="text-gray-400">{short_description}</Text>
            <Text className="text-gray-400 mt-2">
              <Currency quantity={price} currency="GBP" />
            </Text>
          </View>
          <View>
            <Image
              style={{
                borderWidth: 1,
                borderColor: '#F3F3F4'
              }}
              className="h-20 w-20 bg-gray-300 p-4"
              source={{ uri: urlFor(image).url() }}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity disabled={!items.length} onPress={removeItemToBasket}>
              <MinusCircleIcon color={items.length > 0 ? "#00CCBB" : "gray"} size={40} />
            </TouchableOpacity>

            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon color="#00CCBB" size={40} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default DishRow;
