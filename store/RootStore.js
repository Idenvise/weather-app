import { types } from "mobx-state-tree";

const Day = types
.model({
    date: types.string,
    temperature: types.number,
    wind: types.number,
    rainfall: types.string,
    picture: types.string
})

const RootStore = types
.model({
    cityNameForRequest: types.maybe(types.string),
    isLoading: types.optional(types.boolean, false),
    name: types.maybe(types.string),
    days:  types.maybe(types.array(Day))
})
.actions(self => ({
    setCity(newCity) {
        self.name = newCity.name;
        self.days = newCity.days;
    },
    setLoading(isLoading) {
        self.isLoading = isLoading
    },
    setCityForRequest(city) {
        self.cityNameForRequest = city
    }
}))

export default RootStore