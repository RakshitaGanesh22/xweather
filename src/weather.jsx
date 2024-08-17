import { useState } from "react";
import axios from "axios";
export default function Weather() {
    const [placeData, setPlaceData] = useState({});
    const [search, setSearch] = useState("");
    const [loading,setLoading]=useState(true);
    const [fetchData,setfetchData]=useState(false);
    const APIDAta = async (city) => {
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/current.json?key=f628b64a8e29453184484255241904&q=${search}`
            );
            setPlaceData(response.data); // Storing the actual data from the response
            console.log(response.data);
            setLoading(false);
        } catch (err) {
            window.alert("Failed to fetch weather data");
            window.location.reload();
            console.log(err);
        }
    };
    function handleSubmit(event){
        event.preventDefault();
        setfetchData(true);
        APIDAta(search);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                onChange={(event) => {
                    setSearch(event.target.value);
                    console.log(event.target.value);
                    setfetchData(false);
                    setLoading(true);

                }}
            />
            <button type="submit">
                Search
            </button>
            
            
            </form>
            {fetchData?(<div>
                {loading? <p>Loading data...</p> :
                <div className="weather-cards">
                    <div className="weather-card">
                        <p>Temperature</p>
                        {placeData.current.temp_c}°C
                    </div>
                    <div className="weather-card">
                        <p>Humidity</p>
                        {placeData.current.humidity}%
                    </div>
                    <div className="weather-card">
                        <p>Condition</p>
                        {placeData.current.condition.text}
                    </div>
                    <div className="weather-card">
                        <p>Wind Speed</p>
                        {placeData.current.wind_kph} kph
                    </div>
                    
                    </div>}
            </div>):(<div></div>)}
        </div>
    );
}
