import React, {useEffect, useState} from 'react';
import {Header, Footer} from '../../components';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import {REACT_APP_HOST} from '@env';

import axios from '../../helpers/axios';
import {formatAMPM} from '../../helpers/formatTime';
import {formatRp} from '../../helpers/formatRp';
import {getOnlyDateMonth} from '../../helpers/formatDate';
import Icon from 'react-native-vector-icons/FontAwesome';

function TicketResult({navigation, route}) {
  const [loading, setLoading] = useState(false);
  const [download, setDownload] = useState(false);
  const [dataBooking, setDataBooking] = useState({});

  useEffect(() => {
    setLoading(true);
    axios
      .get(`booking/${route.params.movieId}`)
      .then(res => {
        setDataBooking(res.data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [route.params.movieId]);

  const handlePdf = () => {
    setDownload(true);

    axios
      .get(`/booking/export-ticket/${dataBooking.id}`)
      .then(res => {
        ToastAndroid.show(res.data.message, ToastAndroid.LONG);
        window.open(`${res.data.data.url}`, '_blank', 'noopener noreferrer');
      })
      .finally(() => {
        setDownload(false);
      });
  };

  if (loading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator size="large" color="#5F2EEA" />
      </View>
    );
  }

  return (
    <ScrollView>
      <Header navigation={navigation} />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <QRCode
              value={`${REACT_APP_HOST}/booking/used-ticket/1}`}
              size={150}
            />
          </View>
          <View style={styles.content}>
            <View style={styles.wrapContent}>
              <View style={{flex: 3}}>
                <Text style={styles.title}>Movie</Text>
                <Text style={styles.value}>{dataBooking.name}</Text>
              </View>
              <View style={{flex: 2}}>
                <Text style={styles.title}>Premiere</Text>
                <Text style={styles.value}>{dataBooking.premier}</Text>
              </View>
            </View>
            <View style={styles.wrapContent}>
              <View style={{flex: 3}}>
                <Text style={styles.title}>Date</Text>
                <Text style={styles.value}>
                  {getOnlyDateMonth(dataBooking.dateBooking)}
                </Text>
              </View>
              <View style={{flex: 2}}>
                <Text style={styles.title}>Time</Text>
                <Text style={styles.value}>
                  {formatAMPM(dataBooking.timeBooking?.slice(0, 5))}
                </Text>
              </View>
            </View>
            <View style={[styles.wrapContent, styles.lastChild]}>
              <View style={{flex: 3}}>
                <Text style={styles.title}>Count</Text>
                <Text style={styles.value}>
                  {dataBooking.totalTicket} pieces
                </Text>
              </View>
              <View style={{flex: 2}}>
                <Text style={styles.title}>Seats</Text>
                <Text style={styles.value}>{dataBooking.seat?.join(', ')}</Text>
              </View>
            </View>

            <View style={styles.total}>
              <Text style={styles.totalTitle}>Total</Text>
              <Text style={styles.totalValue}>
                {formatRp(dataBooking.totalPayment)}
              </Text>
            </View>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity onPress={handlePdf} style={styles.button}>
            {download ? (
              <ActivityIndicator size="small" color="#4E4B66" />
            ) : (
              <>
                <Icon name="download" size={20} />
                <Text style={styles.buttonText}>Download PDF</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5F2EEA',
    paddingHorizontal: 40,
    paddingTop: 48,
    paddingBottom: 72,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 55,
    paddingVertical: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  content: {
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderTopColor: '#4E4B66',
    borderTopWidth: 0.5,
  },
  wrapContent: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  lastChild: {
    marginBottom: 24,
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 22,
    color: '#4E4B66',
  },
  value: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
    color: '#14142B',
  },
  total: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#4E4B66',
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  totalTitle: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 28,
    color: '#14142B',
  },
  totalValue: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 28,
    color: '#14142B',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderColor: '#ffffff',
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#4E4B66',
    fontWeight: '600',
    fontSize: 16,
    paddingLeft: 10,
  },
});

export default TicketResult;
