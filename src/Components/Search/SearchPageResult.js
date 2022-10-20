import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams ,useNavigate} from 'react-router-dom'

function SearchPageResult() {
    let params = useParams();
    let navigate = useNavigate();
    let { meal_id } = params;
    let [restaurentList, setRestaurantList] = useState([]);
    let [locationList, setLocationList] = useState([]);
    let [filter,setFilter] = useState({meal_type:meal_id,});

    let getLocationList = async () => {
        try {
            let response = await axios.get('https://zc-batch-48-api-appliction.herokuapp.com/api/get-location')
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


    let filterOperation = async (filter) => {

        let URL = 'https://zc-batch-48-api-appliction.herokuapp.com/api/filter';
       
        try {
            let { data } = await axios.post(URL, filter)
            if (data.status === true) {
                setRestaurantList([...data.newResult])
            }
            // console.log(data)          
        } catch (error) {
            alert("server error")
            console.log(error)
        }

    };
    // console.log(restaurentList)

   let makeFiltration =(event,type)=>{
    let value = event.target.value;
    let _filter ={...filter};
            switch(type){
        
        case 'location':
          if(Number(value)>0) {_filter['location'] = Number(value)
        }else{
            delete _filter['location'] };
            break;
            case 'sort':
                 _filter['sort'] = Number(value);
                  break;
            case 'cost-for-two':
                let costForTwo = value.split('-');                            
                 _filter['lcost'] = Number(costForTwo[0]);
                 _filter['hcost'] = Number(costForTwo[1]);
                break;
    }
    console.log(_filter)
     setFilter({..._filter})
    filterOperation(_filter);

   }


    useEffect(() => {
        filterOperation(filter);
        getLocationList();

    }, []);



    return <>
        <section className="container">
            <div className="row">
                <div className="col-12">
                    <div className="main-para-content">
                        <p className="main-para">Breakfast Places in Mumbai</p>
                    </div>
                </div>
            </div>

            {/* <div className="accordion d-lg-none mb-3" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Filter/Sort
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <div className="">
                                <p className="Filter-main-heading">Filters</p>
                                <p className="left-section-headings">Select Location</p>
                                <select name="" id="" className="select-location form-select">
                                    <option value="">Select Location</option>
                                </select>
                                <p className="left-section-headings">Cuisine</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        North Indian
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckde faultChecked"
                                        defaultChecked />
                                    <label className="form-check-label" htmlFor="flexCheck defaultChecked">
                                        South Indian
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                        defaultChecked />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Chinese
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckdefaultChecked" />
                                    <label className="form-check-label" htmlFor="flexCheckdefaultChecked">
                                        Fast Food
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Street Food
                                    </label>
                                </div>

                                <p className="left-section-headings">Cost For Two</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                        id="exampleRadios1" value="option1" defaultChecked />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        Less than 500
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                        id="exampleRadios2" value="option2" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        500 to 1000
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                        id="exampleRadios1" value="option1" defaultChecked />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        1000 to 1500
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                        id="exampleRadios1" value="option1" defaultChecked />
                                    <label className="form-check-label" htmlFor="exampleRadios1">
                                        1500 to 2000
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                        id="exampleRadios2" value="option2" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        2000+
                                    </label>
                                </div>


                                <p className="left-section-headings">Sort</p>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                        id="exampleRadios2" value="option2" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Price low to high
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios"
                                        id="exampleRadios2" value="option2" />
                                    <label className="form-check-label" htmlFor="exampleRadios2">
                                        Price high to low
                                    </label>
                                </div>

                            </div>
                            <button className="btn btn-outline-danger mt-3" style={{ width: "100%" }}>Apply</button>
                        </div>

                    </div>

                </div>
            </div> */}

            <div className="row">
                <div className="main-content d-flex justify-content-between md-   ">

                    <div className="col-12 col-lg-3 d-lg-flex d-none">
                        <div className="left-section">
                            <p className="Filter-main-heading">Filters</p>
                            <p className="left-section-headings">Select Location</p>
                            <select name="" id="" className="select-location
                             form-select" onChange={(event)=>makeFiltration(event,'location')} >
                                <option value="-1">----select location--- </option>
                                {
                                    locationList.map((location, index) => {
                                        return <option value={location.location_id} key={index}>
                                            {location.name},{location.city}
                                        </option>
                                    })
                                }
                            </select>
                            {/* ================Cuisine */}
                            <p className="left-section-headings">Cuisine</p>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="1" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    North Indian
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="2" id="flexCheckdefaultChecked" defaultChecked />
                                <label className="form-check-label" htmlFor="flexCheckdefaultChecked">
                                    South Indian
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="3" id="flexCheckDefault" defaultChecked />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Chinese
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="4" id="flexCheckdefaultChecked" />
                                <label className="form-check-label" htmlFor="flexCheckdefaultChecked">
                                    Fast Food
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="5" id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Street Food
                                </label>
                            </div>
                            {/* ----------------Cost For Two */}
                            <p className="left-section-headings">Cost For Two</p>
                            <div className="form-check ms-1">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                                    value="0-500" 
                                    onChange={(event)=>makeFiltration(event,'cost-for-two')} />
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    Less than 500
                                </label>
                            </div>
                            <div className="form-check " >
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                    value="500-1000" 
                                    onChange={(event)=>makeFiltration(event,'cost-for-two')}
                                    />
                                <label className="form-check-label" htmlFor="exampleRadios2">
                                    500 to 1000
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                                    value="1000-1500" 
                                    onChange={(event)=>makeFiltration(event,'cost-for-two')}
                                    />
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    1000 to 1500
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1"
                                    value="1500-2000"  
                                    onChange={(event)=>makeFiltration(event,'cost-for-two')}
                                    />
                                <label className="form-check-label" htmlFor="exampleRadios1">
                                    1500 to 2000
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                    value="2000-999999"
                                    onChange={(event)=>makeFiltration(event,'cost-for-two')}
                                     />
                                <label className="form-check-label" htmlFor="exampleRadios2">
                                    2000+
                                </label>
                            </div>

           {/*--------------------- Sort */}
                            <p className="left-section-headings">Sort</p>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                    value="1" 
                                      onChange={(event)=>makeFiltration(event,'sort')}
                                    />
                                <label className="form-check-label" htmlFor="exampleRadios2">
                                    Price low to high
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2"
                                    value="-1" 
                                    onChange={(event)=>makeFiltration(event,'sort')}
                                    />
                                <label className="form-check-label" htmlFor="exampleRadios2">
                                    Price high to low
                                </label>
                            </div>
                        </div>

                    </div>
                    <div className=" col-lg-8 col-12 col-md-7 me-0 d-lg-block">
                        {
                            restaurentList.length ?
                                restaurentList.map((restaurant, index) => {
                                    // console.log(restaurant)
                                    return (<div className="card mb-4 " key={index} onClick={()=>navigate('/restaurant/'+ restaurant._id)}>
                                        <div className="mx-lg-5 mx-3 my-3">
                                            <div className="image-name d-flex ">
                                                <div id="right-section-image">
                                                    <img src={"/imges/" + restaurant.image} alt="" />
                                                </div>
                                                <div className=" ms-lg-4 ms-2">
                                                    <p className="shop-name card-title">{restaurant.name}</p>
                                                    <p className="place-type card-subtitle">{restaurant.city}</p>
                                                    <p className="place-address card-text">
                                                        {restaurant.locality} {restaurant.city}
                                                    </p>
                                                </div>
                                            </div>

                                            <hr />
                                            <div className=" d-flex ">
                                                <div className="cuisines-price-head me-5">
                                                    <p>CUISINES:</p>
                                                    <p>COST FOR TWO:</p>
                                                </div>
                                                <div className="cuisines-price-name">
                                                    <p>
                                                        {
                                                            restaurant.cuisine.reduce((pValue, cValue) => {
                                                                return pValue.name + "," + cValue.name;
                                                            })
                                                        }
                                                    </p>
                                                    <p>{restaurant.min_price}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>)

                                }) : <h1>no result found</h1>

                        }

                        {/* <div className="card mt-3">
                            <div className="mx-5 my-3">
                                <div className="image-name d-flex ">
                                    <div id="right-section-image">
                                        <img src="/imges/assets/tiffen.png" alt="" />

                                    </div>
                                    <div className="ms-4">
                                        <p className="shop-name card-title">The Big Chill Cakery</p>
                                        <p className="place-type card-subtitle">FORT</p>
                                        <p className="place-address card-text">
                                            Shop 1, Plot D, Samruddhi Complex, Chincholi …
                                        </p>
                                    </div>
                                </div>

                                <hr style={{color:"#D2D9E6"}} />
                                <div className=" d-flex ">
                                    <div className="cuisines-price-head me-5">
                                        <h5>CUISINES:</h5>
                                        <p>COST FOR TWO:</p>
                                    </div>
                                    <div className="cuisines-price-name">
                                        <h5>Bakery</h5>
                                        <p>₹700</p>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* <!-- pagination elements --> */}
                        <div className="pagination_section text-center mt-5">
                            <a href="#" className="page-number">❮</a>
                            <a href="#" title="Algorithm" className="page-number">1</a>
                            <a href="#" title="DataStructure" className="page-number">2</a>
                            <a href="#" title="Languages" className="page-number">3</a>
                            <a href="#" title="Interview" className="active page-number">4</a>
                            <a href="#" title="practice" className="page-number">5</a>
                            <a href="#" className="page-number">❯</a>
                        </div>
                    </div>



                </div>

            </div>


        </section>
    </>
}

export default SearchPageResult


// let { meal_type, location, cuisine, hcost, lcost, sort, page }