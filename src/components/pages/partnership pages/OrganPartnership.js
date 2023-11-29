import React, { useState } from "react"
import axios from "axios";
const OrganPartnership = () => {

    const [orgPartner, setOrgPartner] = useState({
        organizationName: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        street: '',
        partnerType: '',
        marketOfInterest: '',
        type: 'organization'
    });

    const onSubmitPartner = (e) => {
        e.preventDefault();
        const config = {
            method: "post",
            url: "http://localhost:5000/partnership/insertpartner",
            headers: {
                "Content-type": "application/json"
            },
            data: orgPartner
        }
        axios(config)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error.response.data.message)
            })

    }
    return (
        <div className='ui container ui segment' style={{ "margin-top": "30px" }}>
            <div class="ui large form">
                <div class="two fields">
                    <div class="field">
                        <label>Name of Organization</label>
                        <input onChange={(e) => {
                            setOrgPartner({ ...orgPartner, organizationName: e.target.value })
                        }} placeholder="First Name" type="text" value={orgPartner.organizationName} />
                    </div>
                </div>
                <div className='two fields'>
                    <div class="field">
                        <label>Email</label>
                        <input onChange={(e) => {
                            setOrgPartner({ ...orgPartner, email: e.target.value })
                        }} placeholder="email" type="text" value={orgPartner.email} />
                    </div>
                    <div class="field">
                        <label>Phone Number</label>
                        <input onChange={(e) => {
                            setOrgPartner({ ...orgPartner, phoneNumber: e.target.value })
                        }} placeholder="Phone number" type="tel" value={orgPartner.phoneNumber} />
                    </div>
                </div>
                <div className='three fields'>
                    <div class="field">
                        <label>Country</label>
                        <input onChange={(e) => {
                            setOrgPartner({ ...orgPartner, country: e.target.value })
                        }} placeholder="country" type="text" value={orgPartner.country} />
                    </div>
                    <div class="field">
                        <label>City</label>
                        <input onChange={(e) => {
                            setOrgPartner({ ...orgPartner, city: e.target.value })
                        }} placeholder="City" type="text" value={orgPartner.city} />
                    </div>
                    <div class="field">
                        <label>Street</label>
                        <input onChange={(e) => {
                            setOrgPartner({ ...orgPartner, street: e.target.value })
                        }} placeholder="City" type="text" value={orgPartner.street} />
                    </div>
                </div>
                <div className='field'>
                    <label>What partner type describes you?</label>
                    <input onChange={(e) => {
                        setOrgPartner({ ...orgPartner, partnerType: e.target.value })
                    }} type="text" value={orgPartner.partnerType} />
                </div>
                <div className='field'>
                    <label>The market of your interests</label>
                    <input onChange={(e) => {
                        setOrgPartner({ ...orgPartner, marketOfInterest: e.target.value })
                    }} type="text" value={orgPartner.marketOfInterest} />
                </div>
                <div onClick={(e) => onSubmitPartner(e)} class="ui submit button">Submit</div>
            </div>
        </div>
    )
}

export default OrganPartnership