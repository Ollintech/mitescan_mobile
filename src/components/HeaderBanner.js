import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function HeaderBanner() {
  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image
          source={require('../../assets/ms-icon.png')} // o mesmo ícone usado na Home
          style={styles.headerIcon}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFD700',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIcon: {
    width: 75,
    height: 75,
  },
});
