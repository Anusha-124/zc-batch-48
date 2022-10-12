import axios from 'axios'
import { useEffect, useRef, useState } from 'react';
import Headers from '../Header';


function WallPaper() {

    // let selectInput = useRef();// element reference

    let [locationList, setLocationList] = useState([])
    let [disabled, setDisabled] = useState(true)

    let getLocationList = async () => {
        try {
            let response = await axios.get('http://localhost:5003/api/get-location')
            let data = response.data
            if (data.status === true) {
                setLocationList([...data.result]);
            } else {
                setLocationList([]);
            }
        } catch (error) {
            console.log(error.message)
            alert("server side error")
        }
    };

    
    let getLocationId = async (event) => {
        let value = event.target.value;
        if (value !== "") {
            console.log(value)
            try {
                let url = "http://localhost:5003/api/get-restarant-by-location-id/" + value;
                let { data } = await axios.get(url);
                console.log(data.result)
                if (data.status == true) {
                    if (data.result.length === 0) {
                        setDisabled(true)
                    } else {
                        setDisabled(false)
                    }
                }
            } catch (error) {
                console.log(error);
                alert("server side error ")
            }
        }

    };
    useEffect(() => {
        getLocationList();
    }, [])//[] to run it only once(onload =i.e mounting)

    return <>
        {/* <header className="row " >
            <div className="col-12">
                <div className="container d-lg-flex justify-content-end py-3 d-none">
                    <button className="btn text-white me-2">Login</button>
                    <button className="btn btn-outline-light border border-1">Create an account</button>
                </div>
            </div>
        </header> */}
        
        <section className="row">
            <div className='col-12'>
      
            <Headers color =''/> 
            </div>
           
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col-12 brand-logo">
                    <p className="brand-name">e!</p>
                </div>
            </div>
            <div className="row py-3 d-flex justify-content-center">
                <p className="col-lg-9  col-10  main-heading  text-white ">Find the best restaurants, cafés, and bars </p>
            </div>
            <div className="row d-lg-flex  justify-content-center">
                <div className="col-lg-2 col-10 ">

                    <select
                        type="text" className="form-select type-location pe-1 input-box"
                        placeholder="please select a location"
                        onChange={getLocationId}>
                        <option value="">please select a location</option>
                        {
                            locationList.map((location, index) => {
                                return <option value={location.location_id} key={index}>
                                    {location.name},{location.city}
                                </option>
                            })
                        }

                    </select>

                </div>
                <div className=" col-lg-4 col-10 ">

                    <div className="input-group">
                        <i className="fa fa-search text-black input-group-text"></i>
                        <input type="text" className="form-control  search-restaurant input-box"
                            placeholder="Search for restaurants" disabled={disabled} />
                    </div>
                    <ul className="list-group">
                        <li className="list-group-item d-flex"> <img src="./imges/snaks.png" alt="" className="search-image" />
                            <div className="ms-2">
                                <p className="search-heading m-0">The Big Chill Cakery</p>
                                <p className="search-para m-0">Sarjapur Road, Bengaluru</p>
                            </div>

                        </li>
                        <li className="list-group-item  d-flex"> <img src="./imges/dinner.png" alt="" className="search-image" />
                            <div className="ms-2">
                                <p className="search-heading m-0">Punjabi Rasoi</p>
                                <p className="search-para m-0">Sarjapur Road, Bengaluru</p>
                            </div>
                        </li>
                        <li className="list-group-item  d-flex"> <img src="./tiffen.png" alt="" className="search-image" />
                            <div className="ms-2">
                                <p className="search-heading m-0">Punjabi Rasoi</p>
                                <p className="search-para m-0">Sarjapur Road, Bengaluru</p>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </section></>
}

export default WallPaper