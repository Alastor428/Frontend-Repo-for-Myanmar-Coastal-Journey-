import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ImageSourcePropType,
  Pressable,
  Linking,
  Alert,
} from 'react-native';

interface IPagoda {
  id: string;
  name: string;
  image: ImageSourcePropType;
  mapLink: string;
}

const PAGODA_DATA: IPagoda[] = [
  {
    id: '1',
    name: 'Htupa Yone Pagoda',
    image: require('../../../assets/ngapali_pagoda/htupa_yone.png'),
    mapLink: 'https://www.google.com/maps/place/%E1%80%90%E1%80%B1%E1%80%AC%E1%80%84%E1%80%BA%E1%80%B8%E1%80%86%E1%80%AF%E1%80%95%E1%80%BC%E1%80%8A%E1%80%B7%E1%80%BA%E1%80%85%E1%80%AF%E1%80%B6%E1%80%91%E1%80%B0%E1%80%95%E1%80%AB%E1%80%9B%E1%80%AF%E1%80%B6(%E1%80%85%E1%80%B1%E1%80%90%E1%80%AE%E1%80%90%E1%80%B1%E1%80%AC%E1%80%BA%E1%80%99%E1%80%BC%E1%80%90%E1%80%BA)/@18.3840048,94.3647373,3288a,13.1y/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDR3NqyUQ!2e10!3e12!6shttps:%2F%2Fgz0.googleusercontent.com%2Fgps-cs-s%2FAG0ilSyU7MUxgtkGQ7DwpCaQk5WVe_kAQLlfasrnpFjaL8s3vtACXjrlQkLhHAzPn0WShEUlLvScN7wFiACfQkd5BD1ASyN-COZrAfsfJGVCPzqaLqOmDGV6RHJ1XKnx-6FxgzFsSrTT%3Dw393-h294-k-no!7i5184!8i3888!4m7!3m6!1s0x30b91f0c8155a5cb:0x933bce87c5616816!8m2!3d18.3840048!4d94.3647373!10e5!16s%2Fg%2F11qby5syv7?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D',
  },
  {
    id: '2',
    name: 'Shwe Tar Lyoung',
    image: require('../../../assets/ngapali_pagoda/Shwe.png'),
    mapLink:"https://www.google.com/maps/place/Rib+Relic+Of+Buddha+Pagoda/@18.4713717,94.3580314,3287a,13.1y/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDcu7_f2QE!2e10!3e12!6shttps:%2F%2Fgz0.googleusercontent.com%2Fgps-cs-s%2FAG0ilSz9QMU9idufq3cMF63fh6ewjlaLag-oTOCnsu-QLjG2VebGJjfbT-0cl33W4MJqDb2sBFuLpEmxTQCsnUM48hbocoXzbDPftX7XkGbs_TTHIRt-WdGK5gamtXNCyJPolhAGZ49rZA%3Dw393-h294-k-no!7i3264!8i2448!4m7!3m6!1s0x30b91e7f95049561:0x455f484f80fa9e59!8m2!3d18.4713717!4d94.3580314!10e5!16s%2Fg%2F11f_4rv5ng?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    id: '3',
    name: 'Shwe Ann Taw Pagoda',
    image: require('../../../assets/ngapali_pagoda/Shwe_ann_daw.png'),
    mapLink: 'https://www.google.com/maps/dir//Shwe+Ann+Taw+Pagoda,+F9CM%2BG3M,+Thandwe+07171/@19.8667467,96.1739153,14z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x30b91fdaeb3963ff:0xfb05ca6b6c52fb8b!2m2!1d94.3826917!2d18.4713465?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D',
  },
    {
    id: '4',
    name: 'Tilawka Sayambuu',
    image: require('../../../assets/ngapali_pagoda/Tilawka Sayambuu.png'),
    mapLink: 'https://www.google.com/maps/place/%E1%80%90%E1%80%B1%E1%80%AC%E1%80%84%E1%80%BA%E1%80%B8%E1%80%86%E1%80%AF%E1%80%95%E1%80%BC%E1%80%8A%E1%80%B7%E1%80%BA%E1%80%85%E1%80%AF%E1%80%B6%E1%80%91%E1%80%B0%E1%80%95%E1%80%AB%E1%80%9B%E1%80%AF%E1%80%B6(%E1%80%85%E1%80%B1%E1%80%90%E1%80%AE%E1%80%90%E1%80%B1%E1%80%AC%E1%80%BA%E1%80%99%E1%80%BC%E1%80%90%E1%80%BA)/@18.3840048,94.3647373,3288a,13.1y/data=!3m8!1e2!3m6!1sCIHM0ogKEICAgIDR3NqyUQ!2e10!3e12!6shttps:%2F%2Fgz0.googleusercontent.com%2Fgps-cs-s%2FAG0ilSyU7MUxgtkGQ7DwpCaQk5WVe_kAQLlfasrnpFjaL8s3vtACXjrlQkLhHAzPn0WShEUlLvScN7wFiACfQkd5BD1ASyN-COZrAfsfJGVCPzqaLqOmDGV6RHJ1XKnx-6FxgzFsSrTT%3Dw393-h294-k-no!7i5184!8i3888!4m7!3m6!1s0x30b91f0c8155a5cb:0x933bce87c5616816!8m2!3d18.3840048!4d94.3647373!10e5!16s%2Fg%2F11qby5syv7?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D',
  },

];

const Pagoda_home: React.FC = () => {
  const handleOpenMap = async (url: string) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Error', 'Cannot open Google Maps.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerLayout}>
        <Text style={styles.headerText}>Nearest Pagoda</Text>
      </View>

      <View style={styles.rowLayout}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {PAGODA_DATA.map(item => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.pagodaCard,
                pressed && { opacity: 0.7 },
              ]}
              onPress={() => handleOpenMap(item.mapLink)}
            >
              <Image source={item.image} style={styles.imageStyle} />
              <View style={styles.textWrapper}>
                <Text style={styles.pagodaTitle} numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 32,
  },
  headerLayout: {
    width: 328,
    height: 28,
    marginTop: 50,
    justifyContent: 'center',
  },
  headerText: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 32,
    color: '#000000',
  },
  rowLayout: {
    width: 328,
    height: 116,
    marginTop: 10,
  },
  pagodaCard: {
  width: 72,
    height: 108,
    marginRight: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(28, 181, 176, 0.25)',
    overflow: 'hidden',
    alignItems: 'center',
  },
  imageStyle: {
    width: 72,
    height: 72,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    resizeMode: 'cover',
  },
  textWrapper: {
    width: 64,
    height: 32,
    marginTop: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagodaTitle: {
    fontFamily: 'Open Sans',
    fontWeight: '400',
    fontSize: 12,
    lineHeight:14,
    textAlign: 'center',
    color: '#000000',
  },
});

export default Pagoda_home;
