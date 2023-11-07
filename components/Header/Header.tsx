import { View, TextInput, StyleSheet, Pressable, NativeSyntheticEvent, TextInputChangeEventData, Image, GestureResponderEvent } from 'react-native';
import { weatherApi } from '../../utils/weatherApi';
import useStore from '../../hooks/useStore';
import { months } from '../../utils/consts';

interface Weather {
    cod: string,
    message: number,
    cnt: number,
    list: Array<Day>
  }
  
  interface Day {
    dt: number,
    main: MainInfo,
    weather: Array<WeatherMain>,
    clouds: object,
    wind: Wind,
    visibility: number,
    pop: number,
    snow: object,
    sys: object,
    dt_txt: string
  }
  
  interface MainInfo {
    temp: number
  }
  interface Wind {
    speed: number
  }
  interface WeatherMain {
    description: string,
    icon: string
  }

function Header() {
    const store = useStore();

    function onChangeData(e: NativeSyntheticEvent<TextInputChangeEventData>): void {
        store.setCityForRequest(e.nativeEvent.text)
    }

    function onSubmit(e: GestureResponderEvent) {
        e.preventDefault();
        store.setLoading(true);
        weatherApi.getCityСoordinates(store.cityNameForRequest)   
        .then(city => {
          weatherApi.getWeather(city[0].lat, city[0].lon)
          .then((weater: Weather) => {
            const filteredDays = weater.list.filter((list: Day) => list.dt_txt.includes('12:00:00'));
            const usedDays = filteredDays.map((day: Day) => {
              return {
                date: `${day.dt_txt.slice(8,10)} ${months[day.dt_txt.slice(5,7) as keyof object]}`,
                temperature: Math.round(day.main.temp),
                wind: Math.round(day.wind.speed),
                rainfall: day.weather[0].description,
                picture: `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
              }
            })
            store.setCity({name: city[0].local_names.ru, days: usedDays})
          })
          .catch(err => console.log(err))
        })  
        .catch(err => console.log(err))
        .finally(() => store.setLoading(false))
      }

    return(
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Image style={styles.image} source={require('../../images/search-icon.png')} alt='Поиск'/>
                <TextInput style={styles.textInput} placeholder='Город' onChange={onChangeData}/>
                <Pressable style={styles.submitButton} onPress={onSubmit}>
                    <Image style={styles.imageWhite} source={require('../../images/search-icon_white.png')}/>
                </Pressable>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 70,
        marginTop: 12,
        backgroundColor: '#F9F9F9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    wrapper: {
        marginHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 22,
        height: 22,
        marginLeft: 25,
        marginRight: 16
    },
    imageWhite: {
        width: 22,
        height: 22,
    },
    textInput: {
        flex: 1,
        minWidth: 0
    },
    submitButton: {
        marginRight: 26,
        marginLeft: 10,
        width: 70,
        height: 36,
        display: 'flex',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 48
    }
})