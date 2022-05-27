import config from "../config/config.json";


const delayModel = {
    getStations: async function getStations(): Object {
        const response = await fetch (`${config.base_url}stations`);
        const result = await response.json();
        return result.data;
    },

    getDelays: async function getDelays(): Object {
        const response = await fetch (`${config.base_url}delayed`);
        const result = await response.json();
        return result.data;
    },

    matchDelays2Stations: async function matchDelays2Stations(userData): array {
        const delays = await delayModel.getDelays();
        const stations = await delayModel.getStations();

        const matches = {};

        if (userData) {
            for (let i = 0; i < stations.length; i++) {

                for (let j = 0; j < delays.length; j++) {
                    if (delays[j].FromLocation) {
                        if (delays[j].FromLocation[0].LocationName === stations[i].LocationSignature) {
                            matches[delays[j].AdvertisedTrainIdent] = {
                                    name: stations[i].AdvertisedLocationName,
                                    location: delayModel.getCoordinates(stations[i].Geometry.WGS84),
                                    advertised: delayModel.getTime(delays[j].AdvertisedTimeAtLocation),
                                    expected: delayModel.getTime(delays[j].EstimatedTimeAtLocation),
                                    isCanceled: delays[j].Canceled,
                                    destination: delayModel.getLocationName(stations, delays[j].ToLocation[0].LocationName),
                                    proximity2User: delayModel.getProximity(userData, delayModel.getCoordinates(stations[i].Geometry.WGS84)),
                            }
                        }
                    }
                }
            }
        }

        const matchesNoDuplicate = [];
        for (const [key, value] of Object.entries(matches)) {
            matchesNoDuplicate.push(value)

        }
        return delayModel.sortClosestStations(matchesNoDuplicate);

    },

    getLocationName: function getLocationName(stations, stationCode): string {
        let stationName;

        for (let i = 0; i < stations.length; i++) {
            if (stations[i].LocationSignature === stationCode) {
                stationName = stations[i].AdvertisedLocationName;
            }

        }

        return stationName;
    },

    getCoordinates: function getCoordinates(data: string): array {

        const coordinates = data.match(/[0-9.]+/g);

        return coordinates;
    },

    getProximity: function getProximity(userData:object, stationData:array): float {
        function degrees2Radius(deg) {
            return deg * (Math.PI/180)
        };

        const lat1 = parseFloat(stationData[1]);
        const lat2 = userData.latitude;

        const lon1 = parseFloat(stationData[0]);
        const lon2 = userData.longitude;

        const R = 6371; //Radius of earth


        const dLat = degrees2Radius(lat2 - lat1);
        const dLon = degrees2Radius(lon2 - lon1);

        const a =
             Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(degrees2Radius(lat1)) * Math.cos(degrees2Radius(lat2)) *
             Math.sin(dLon/2) * Math.sin(dLon/2)
             ;

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        const proximity = R * c;

        return proximity
    },

    sortClosestStations: function sortClosestStations(stations: array): array {

        return stations.sort((a, b) => (a.proximity2User > b.proximity2User) ? 1 : -1);
    },

    getTime: function getTime(time: string): string {
        const newTime = `${time.slice(11, 16)} (${time.slice(8,10)}/${time.slice(5,7)})`
        return newTime
    }


}

export default delayModel;
