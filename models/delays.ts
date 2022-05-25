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

    matchDelays2Stations: async function matchDelays2Stations() {
        const delays = await delayModel.getDelays();
        const stations = await delayModel.getStations();

        const matches = [];
        // console.log(stations.data[2].Geometry.WGS84)
        // console.log(delays.data[0]);



        for (let i = 0; i < stations.length; i++) {

            for (let j = 0; j < delays.length; j++) {
                if (delays[j].FromLocation) {
                    if (delays[j].FromLocation[0].LocationName === stations[i].LocationSignature) {
                        matches.push({
                            name: stations[i].AdvertisedLocationName,
                            location: stations[i].Geometry.WGS84,
                            advertised: delays[j].AdvertisedTimeAtLocation,
                            expected: delays[j].EstimatedTimeAtLocation,
                            isCanceled: delays[j].Canceled,
                            destination: delayModel.getLocationName(stations, delays[j].ToLocation[0].LocationName)
                        })

                    }
                }


            }
        }

        console.log(matches);

        // for (const station in stations) {
        //     // console.log(station);
        //
        //     matches.push(station);
        // }

        return matches;

    },

    getLocationName: function getLocationName(stations, stationCode) {
        let stationName;

        for (let i = 0; i < stations.length; i++) {
            if (stations[i].LocationSignature === stationCode) {
                stationName = stations[i].AdvertisedLocationName;
            }

        }

        return stationName;
    }


}

export default delayModel;
