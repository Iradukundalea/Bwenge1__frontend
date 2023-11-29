import React, { useState } from 'react'
import axios from 'axios'
const Partnership = () => {
    const [indivPartner, setIndivPartner] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        companyName: '',
        email: '',
        phoneNumber: '',
        country: '',
        city: '',
        street: '',
        partnerType: '',
        marketOfInterest: '',
        fieldOfExpertise: '',
        type: 'Individual'
    })
    const onSubmitPartner = (e) => {
        e.preventDefault();
        const config = {
            method: "post",
            url: "http://localhost:5000/partnership/insertpartner",
            headers: {
                "Content-type": "application/json"
            },
            data: indivPartner
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
                        <label>First Name</label>
                        <input onChange={(e) => {
                            setIndivPartner({ ...indivPartner, firstName: e.target.value })
                        }} placeholder="First Name" type="text" value={indivPartner.firstName} />
                    </div>
                    <div class="field">
                        <label>Last Name</label>
                        <input onChange={(e) => {
                            setIndivPartner({ ...indivPartner, lastName: e.target.value })
                        }} placeholder="Last Name" type="text" value={indivPartner.lastName} />
                    </div>
                </div>
                <div className='two fields'>
                    <div class="field">
                        <label>Job Title</label>
                        <input onChange={(e) => {
                            setIndivPartner({ ...indivPartner, jobTitle: e.target.value })
                        }} placeholder="Job Title" type="text" value={indivPartner.jobTitle} />
                    </div>
                    <div class="field">
                        <label>Company name</label>
                        <input onChange={(e) => {
                            setIndivPartner({ ...indivPartner, companyName: e.target.value })
                        }} placeholder="Company name" type="text" value={indivPartner.companyName} />
                    </div>

                </div>
                <div className='two fields'>
                    <div class="field">
                        <label>Email</label>
                        <input onChange={(e) => {
                            setIndivPartner({ ...indivPartner, email: e.target.value })
                        }} placeholder="email" type="text" value={indivPartner.email} />
                    </div>
                    <div class="field">
                        <label>Phone Number</label>
                        <input onChange={(e) => {
                            setIndivPartner({ ...indivPartner, phoneNumber: e.target.value })
                        }} placeholder="Phone number" type="tel" value={indivPartner.phoneNumber} />
                    </div>
                </div>
                <div className='three fields'>
                    <div class="field">
                        <label>Country</label>
                        <input onChange={(e) => {
                            setIndivPartner({ ...indivPartner, country: e.target.value })
                        }} placeholder="country" type="text" value={indivPartner.country} />
                    </div>
                    <div class="field">
                        <label>City</label>
                        <input onChange={(e) => {
                            setIndivPartner({ ...indivPartner, city: e.target.value })
                        }} placeholder="City" type="text" value={indivPartner.city} />
                    </div>
                    <div class="field">
                        <label>Street</label>
                        <input onChange={(e) => {
                            setIndivPartner({ ...indivPartner, street: e.target.value })
                        }} placeholder="City" type="text" value={indivPartner.street} />
                    </div>
                </div>
                <div className='field'>
                    <label>What partner type describes you?</label>
                    <input onChange={(e) => {
                        setIndivPartner({ ...indivPartner, partnerType: e.target.value })
                    }} type="text" value={indivPartner.partnerType} />
                </div>
                <div className='field'>
                    <label>The market of your interests</label>
                    <input onChange={(e) => {
                        setIndivPartner({ ...indivPartner, marketOfInterest: e.target.value })
                    }} type="text" value={indivPartner.marketOfInterest} />
                </div>
                <div className='field'>
                    <label>The field of your expertise</label>
                    <input onChange={(e) => {
                        setIndivPartner({ ...indivPartner, fieldOfExpertise: e.target.value })
                    }} type="text" value={indivPartner.fieldOfExpertises} />
                </div>
                <div onClick={(e) => onSubmitPartner(e)} class="ui submit button">Submit</div>
            </div>
        </div>
    )
}

export default Partnership