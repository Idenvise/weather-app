import { View, Text, StyleSheet, FlatList} from "react-native";
import WeatherCardTemplate from "./WeatherCardTemplate";
import { observer } from 'mobx-react-lite';
import useStore from "../hooks/useStore";

const Cards = observer(({name, width}: {name: string, width: number}) => {
    const store = useStore();
    return(
        <View style={style.container}>
            <Text style={style.name}>{name}</Text>
            <FlatList data={store.days} renderItem={({item}) => (
                <WeatherCardTemplate date={item.date} picture={item.picture} temperature={item.temperature} wind={item.wind} rainfall={item.rainfall} width={width}/>
            )}/>
        </View>
    )
}) 
const style = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
    },
    name: {
        fontFamily: 'sans-serif',
        fontSize: 24,
        marginVertical: 10
    }
})

export default Cards