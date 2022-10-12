import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function QuickSearch() {
    let navigate =useNavigate()//instatntc of it;


    let [mealTypeList, setMealTypeList] = useState([])

    let getMealTypes = async () => {
        try {
            let response = await axios.get("http://localhost:5003/api/get-meal-types");
            let data = response.data;
            if (data.status === true) {
                setMealTypeList([...data.result])//recreate array 
            }
        } catch (error) {
            alert("server side error s")
        }
    };

    let getQuickSearchPage = (id)=>{
        navigate('/search-page/'+ id);
    }

    useEffect(() => {
        getMealTypes();
    }, []);
    //  []==>useEffect will run once
    // console.log(mealTypeList)

    return <>  <section className="container-lg second-section d-md-flex justify-content-md-center">
        <div>
            <div className="row ">
                <div className="col-12 quick-search-div">
                    <p className="quick-search-head ">Quick Searches</p>
                    <p className="quick-search-para pb-3">Discover restaurants by type of meal</p>
                </div>
            </div>

            <div className="row d-flex menu-item-list ">
                {
                    mealTypeList.map((mealType, index) => {
                        return (
                            <div key={index}
                             className="col-md-6 col-lg-4 col-10 cards mt-4"
                             onClick={()=>getQuickSearchPage(mealType.meal_type)}
                             >
                                
                                <img src={"./imges/" + mealType.image}
                                    alt="" />
                                <div className="cards-body ">
                                    <p className="cards-title">{mealType.name}</p>
                                    <p className=" cards-text">{mealType.content}</p>
                                </div>
                            </div>
                        );
                    })

                }



            </div>
        </div>
    </section></>
}

export default QuickSearch