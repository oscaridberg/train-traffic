import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = {
    storeToken: async function storeToken(token: string) {
        try {
            const tokenAndDate = {
                token: token,
                date: new Date().getTime(),
            };
            const jsonValue = JSON.stringify(tokenAndDate);

            await AsyncStorage.setItem('@token', jsonValue);
        } catch (e) {
            // save error
        }
    },

    readToken: async function readToken(): Promise<any> {
        try {
            const jsonValue = await AsyncStorage.getItem('@token');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            //reading error value
        }
    },

    deleteToken: async function deleteToken() {
        await AsyncStorage.removeItem('@token');
    },

    storeFavorites: async function storeFavorites(favorites) {
        try {
            await AsyncStorage.setItem(
                'favorites', favorites
            )
        } catch (e) {
            //save error
        }
    },

    getFavorites: async function getFavorites() {
        try {
            const value = await AsyncStorage.getItem('favorites');
            return value;
        } catch (error) {
            //save error
        }
    }
};

export default storage;
