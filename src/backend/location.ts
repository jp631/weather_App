import { z } from 'zod';
import type {AxiosStatic} from "axios";

const locationInfoScehma = z.object({
    lat: z.string(),
    lon: z.string(),
    display_name: z.string()
});

export type LocationInfo = z.infer<typeof locationInfoScehma>


// https://geocode.maps.co/search?q=address&api_key=6721ce80ad3b7834682059bdied0ef0

const API_KEY: string = `6721ce80ad3b7834682059bdied0ef0`;

export const fetchLocationData = async (axios: AxiosStatic, apiUrl: string, locationName: string): Promise<LocationInfo> => {
    const options = {
        method: "GET",
        url: apiUrl,
        params: {
            q: locationName
        }
    };

    const response = await axios.request(options);

    if (response.status === 200) {
        try{
            return locationInfoScehma.parse(response.data[0])
        }catch (err){
            console.log(err);
            throw new Error('unable to find location information')
        }
    } else {
        throw new Error('fail to fetch location data')
    }
}