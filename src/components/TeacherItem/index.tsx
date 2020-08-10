import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';
import { TeacherProps } from '../../pages/TeacherList'

import styles from './styles';
import api from '../../services/api';

interface TeacherItemProps {
  teacherData: TeacherProps;
  favorite: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacherData, favorite }) => {
  const [isFavorite, setIsFavorite] = useState(favorite);
  
  const handleMessageToWhatsapp = async () => {
    await api.post('/connections', {
      user_id: teacherData.id,
    });

    Linking.openURL(`whatsapp://send?phone=55${teacherData.whatsapp}`);
  }

  const handleToggleFavoriteTeacher = async () => {
    const favoriteTeachers = await AsyncStorage.getItem('favorites');

    let listFavoriteTeachers = [];
    
    if (favoriteTeachers) {
      listFavoriteTeachers = JSON.parse(favoriteTeachers);
    }

    if (isFavorite) {
      const listFavoritesChanged = listFavoriteTeachers.filter(
        (item: TeacherProps) => item.id !== teacherData.id
      ); 

      setIsFavorite(false);
      await AsyncStorage.setItem('favorites', JSON.stringify(listFavoritesChanged));
    } else {
      listFavoriteTeachers.push(teacherData);

      setIsFavorite(true);
      await AsyncStorage.setItem('favorites', JSON.stringify(listFavoriteTeachers));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image 
          style={styles.avatar}
          source={{ uri: teacherData.avatar }}
        />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacherData.name}</Text>
          <Text style={styles.subject}>{teacherData.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>
        {teacherData.bio}
      </Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {'   '}
          <Text style={styles.priceValue}>R$ {teacherData.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            onPress={handleToggleFavoriteTeacher} 
            style={[
              styles.favoriteButton, 
              isFavorite ? styles.favorite : {},
            ]}
          >
            { isFavorite
              ? <Image source={unfavoriteIcon} />
              : <Image source={heartOutlineIcon} />
            }
          </RectButton>

          <RectButton 
            style={styles.contactButton}
            onPress={handleMessageToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entrar em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
}

export default TeacherItem;