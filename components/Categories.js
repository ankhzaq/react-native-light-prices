import { View, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import CategoryCard from './CategoryCard'
import sanityClient from '../sanity';

import React from 'react';

const Categories = ( props ) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "category"]
    `).then((data) => {
      setCategories(data);
    })
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10
      }}
      horizontal
      showHorizontalScrollIndicator={false}
    >
      {
        categories.map(({ image, name }) => (
          <CategoryCard image={image} title={name} />
        ))
      }
    </ScrollView> );
};

export default Categories;
