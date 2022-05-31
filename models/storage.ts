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

    storeFavorites: async function storeFavorites(newFavorite) {
        let data = await storage.getFavorites();

        if (data === null) {
            data = [];
        } else {
            data = JSON.parse(data);
        }

        const favorites = data.favorites;
        console.log(favorites);

        favorites.push(newFavorite);

        try {
            const jsonValue = JSON.stringify({favorites});
            await AsyncStorage.setItem("@favorites", jsonValue)
        } catch (e) {
            return {
                message: 'Error',
                description: e,
                type: 'danger'
            }
        }
        return {
            message: 'Favorite added',
            description: newFavorite.name,
            type: 'success'
        }
    },

    getFavorites: async function getFavorites() {
        try {
            const value = await AsyncStorage.getItem('@favorites');
            return value;
        } catch (error) {
            //save error
        }
    }
};

export default storage;
