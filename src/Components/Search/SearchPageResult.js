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
    let [cuisine, setcuisine] = useState([]);

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
    let cuisineadding = (value) => {
        let index = cuisine.indexOf(Number(value));
        if (index === -1) {
          cuisine.unshift(Number(value));
        } else {
          cuisine.splice(index, 1);
        }
        setcuisine(cuisine);
      };


   let makeFiltration =(event,type)=>{
    let value = event.target.value;
    let _filter ={...filter};
            switch(type){
        
        case 'location':
          if(Number(value)>0) {_filter['location'] = Number(value)
        }else{
            delete _filter['location'] };
            break;
            case "cuisine":
                cuisineadding(value);
                if (cuisine.length === 0) {
                  delete _filter["cuisine"];
                  break;
                }
                _filter["cuisine"] = cuisine;
                break;


            case 'sort':
                 _filter['sort'] = Number(value);
                  break;
            case 'cost-for-two':
                let costForTwo = value.split('-');                            
                 _filter['lcost'] = Number(costForTwo[0]);
                 _filter['hcost'] = Number(costForTwo[1]);
                break;
         case 'page':
            _filter["page"]=Number(value);
            console.log(_filter);
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
                            {/* <p className="left-section-headings">Cuisine</p>
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
                            </div> */}

<p className="mt-4 mb-2 fw-bold">Cuisine</p>
              <div>
                {/* <div className="py-2">Cuisine</div> */}
                <div>
                  <input
                    value="1"
                    onChange={(event) => makeFiltration(event, "cuisine")}
                    id="North Indian"
                    className="hand py-1 mx-2"
                    type="checkbox"
                  />
                  <label htmlFor="North Indian" className="mx-2">
                    North Indian
                  </label>
                </div>
                <div>
                  <input
                    value="2"
                    onChange={(event) => makeFiltration(event, "cuisine")}
                    id="South Indian"
                    className="hand py-1 mx-2"
                    type="checkbox"
                  />
                  <label htmlFor="South Indian" className="mx-2">
                    South Indian
                  </label>
                </div>
                <div>
                  <input
                    value="3"
                    onChange={(event) => makeFiltration(event, "cuisine")}
                    id="Chinese"
                    className="hand py-1 mx-2"
                    type="checkbox"
                  />
                  <label htmlFor="Chinese" className="mx-2">
                    Chinese
                  </label>
                </div>
                <div>
                  
                  <input
                    value="4"
                    onChange={(event) => makeFiltration(event, "cuisine")}
                    id="Fast Food"
                    className="hand py-1 mx-2"
                    type="checkbox"
                  />
                  <label htmlFor="Fast Food" className="mx-2">
                    Fast Food
                  </label>
                </div>
                <div>
                  <input
                    value="5"
                    onChange={(event) => makeFiltration(event, "cuisine")}
                    id="Street Food"
                    className="hand py-1 mx-2"
                    type="checkbox"
                  />
                  <label htmlFor="Street Food" className="mx-2">
                    Street Food
                  </label>
                </div>
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

                       

                        {/* <!-- pagination elements --> */}
                        <div className="pagination_section text-center mt-5">
                            <a href="#" className="page-number">❮</a>
                            <a href="#" title="Algorithm" className="page-number" onClick={(event)=>makeFiltration(event,"page")}>1 </a>
                            <a href="#" title="DataStructure" className="page-number" onClick={(event)=>makeFiltration(event,"page")}>2</a>
                            <a href="#" title="Languages" className="page-number" onClick={(event)=>makeFiltration(event,"page")}>3</a>
                            <a href="#" title="Interview" className="active page-number" onClick={(event)=>makeFiltration(event,"page")}>4</a>
                            <a href="#" title="practice" className="page-number"onClick={(event)=>makeFiltration(event,"page")}>5</a>
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