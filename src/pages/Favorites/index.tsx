import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import { TeacherProps } from '../TeacherList';

import styles from './styles';

const Favorites = () => {
  const [favorites, setFavorites] = useState<TeacherProps[]>([]); 
  
  useEffect(() => {
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response) {
          const listFavoriteTeachers = JSON.parse(response);

          setFavorites(listFavoriteTeachers);
        }
      });
  }, [favorites]);

  return (
    <View style={styles.container}>
      <PageHeader title="Meus proffys favoritos" />

      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}  
      >
        {favorites.map(item => 
          <TeacherItem 
            key={item.id}
            teacherData={item}
            favorite
          />
        )}
      </ScrollView>
    </View>
  );
}

export default Favorites;