import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ScrollView, TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import api from '../../services/api';

import styles from './styles';

export interface TeacherProps {
  id: number;
  name: string;
  bio: string;
  avatar: string;
  subject: string;
  whatsapp: string;
  cost: number;
}

const TeacherList = () => {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
 
  const [subject, setSubject] = useState('');
  const [week_day, setWeekDay] = useState('');
  const [time, setTime] = useState('');
  const [teachers, setTeachers] = useState<TeacherProps[]>([]);

  const getFavoriteTeachers = () => {
    AsyncStorage.getItem('favorites')
      .then(response => {
        if (response) {
          const favoriteTeachersIds = JSON.parse(response).map((teacher: TeacherProps) => teacher.id);
          
          setFavorites(favoriteTeachersIds);
        }
      })
  }

  useEffect(() => {
    getFavoriteTeachers();
  }, [favorites]);

  const handleToggleFilterVisible = () => {
    setIsFiltersVisible(!isFiltersVisible);
  }

  const handleFiltersSubmit = async () => {
    getFavoriteTeachers();

    const response = await api.get('/classes', {
      params: {
        week_day,
        subject,
        time,
      }
    });

    handleToggleFilterVisible();
    setTeachers(response.data);
  } 

  return (
    <View style={styles.container}>
      <PageHeader 
        title="Proffys disponíveis" 
        headerRight={(
          <BorderlessButton onPress={handleToggleFilterVisible}>
            <Feather name="filter" size={20} color="#fff"/>
          </BorderlessButton>
        )}
      >
        { isFiltersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput 
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={text => setSubject(text)}
            />

            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                  <Text style={styles.label}>Dia da semana</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Qual o dia?"
                    placeholderTextColor="#c1bccc"
                    value={week_day}
                    onChangeText={text => setWeekDay(text)}
                  />
              </View>

              <View style={styles.inputBlock}>
                  <Text style={styles.label}>Horário</Text>
                  <TextInput 
                    style={styles.input}
                    placeholder="Qual horário?"
                    placeholderTextColor="#c1bccc"
                    value={time}
                    onChangeText={text => setTime(text)}
                  />
              </View>
            </View>

            <RectButton 
              style={styles.submitButton}
              onPress={handleFiltersSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
        
        <ScrollView
          style={styles.teacherList}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}
        >
          {teachers.map(item => 
          <TeacherItem 
            key={item.id} 
            teacherData={item} 
            favorite={favorites.includes(item.id)}
          />)}
        </ScrollView>
    </View>
  );
}

export default TeacherList;