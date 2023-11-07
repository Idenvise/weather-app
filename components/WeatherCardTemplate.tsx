import { View, Text, StyleSheet, Image } from "react-native";

interface Day {
    date: string,
    picture: string,
    temperature: number,
    wind: number,
    rainfall: string,
    width: number
}

const WeatherCardTemplate = (({date, picture, temperature, wind, rainfall, width}: Day) => {

    
    return(
        <View style={style.card}>
            {
                width > 720 ?
                <>
                    <View style={style.cardColumn}>
                        <Text style={style.columnHeader}>{date}</Text>
                        <Image style={style.picture} source={{uri: `${picture}`}}/>
                    </View>
                    <View style={style.cardColumn}>
                        <Text style={style.columnHeader}>Температура, ℃</Text>
                        <Text style={style.columnContent}>{temperature}</Text>
                    </View>
                    <View style={style.cardColumn}>
                        <Text style={style.columnHeader}>Ветер, м/с</Text>
                        <Text style={style.columnContent}>{wind}</Text>
                    </View>
                    <View style={style.cardColumn}>
                        <Text style={style.columnHeader}>Осадки</Text>
                        <Text style={style.columnContent}>{rainfall}</Text>
                    </View>
                </> :
                <>
                    <View style={style.cardColumn}>
                        <Text style={style.columnHeader}>{date}</Text>
                        <Image style={style.picture} source={{uri: `${picture}`}}/>
                        <Text style={style.columnHeader}>Температура, ℃</Text>
                        <Text style={style.columnContent}>{temperature}</Text>
                    </View>
                    <View style={style.cardColumn}>
                        <Text style={style.columnHeader}>Ветер, м/с</Text>
                        <Text style={style.columnContent}>{wind}</Text>
                        <Text style={style.columnHeader}>Осадки</Text>
                        <Text style={style.columnContent}>{rainfall}</Text>
                    </View>
                </>
            }
            
        </View>
    )
}) 

const style = StyleSheet.create({
    card: {
        backgroundColor: '#F9F9F9',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: 15
    },
    cardColumn: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    picture: {
        width: 80,
        height: 80
    },
    columnHeader: {
        marginTop: 10
    },
    columnContent: {
        marginBottom: 30,
    }
})

export default WeatherCardTemplate