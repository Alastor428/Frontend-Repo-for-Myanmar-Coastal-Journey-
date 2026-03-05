import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions 
} from 'react-native';
// Note: You can use @expo/vector-icons if using Expo, 
// or react-native-vector-icons for bare workflow.
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

const TravelUpsellScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.modalCard}>
        
        <View style={styles.accentBar} />

       
        <Text style={styles.title}>
          Your bus is set! Want to find a place to stay?
        </Text>

     
        <Text style={styles.subtitle}>
          Complete your travel plans by adding a top-rated hotel and a local guide.
        </Text>

     
        <View style={styles.optionsContainer}>
          
       
          <TouchableOpacity style={styles.optionWrapper} activeOpacity={0.7}>
            <View style={styles.iconCard}>
              <View style={styles.hotelIconBg}>
                <MaterialCommunityIcons name="bed-outline" size={28} color="white" />
              </View>
            </View>
            <Text style={styles.optionLabel}>Hotel Booking</Text>
          </TouchableOpacity>

        
          <TouchableOpacity style={styles.optionWrapper} activeOpacity={0.7}>
            <View style={styles.iconCard}>
              <MaterialCommunityIcons name="human-greeting-variant" size={40} color="#2BB6B1" />
            </View>
            <Text style={styles.optionLabel}>Tour Guide</Text>
          </TouchableOpacity>

        </View>

      
        <TouchableOpacity style={styles.footerButton} activeOpacity={0.8}>
          <Text style={styles.footerButtonText}>No thanks, just my ticket</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: width * 0.9,
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    padding: 30,
    alignItems: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    // Shadow for Android
    elevation: 10,
  },
  accentBar: {
    width: 80,
    height: 6,
    backgroundColor: '#2BB6B1',
    borderRadius: 3,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    color: '#000000',
    lineHeight: 28,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  optionWrapper: {
    alignItems: 'center',
  },
  iconCard: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    // Soft inner shadow effect
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hotelIconBg: {
    backgroundColor: '#2BB6B1',
    padding: 6,
    borderRadius: 8,
    transform: [{ rotate: '-10deg' }], // Adding a slight tilt for style
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  footerButton: {
    width: '100%',
    backgroundColor: '#EAF7F9',
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000000',
  },
});

export default TravelUpsellScreen;