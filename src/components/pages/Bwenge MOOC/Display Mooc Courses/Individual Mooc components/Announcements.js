import React, { useState } from 'react';
import renderHTML from 'react-render-html';
const Announcements = ({ announcements }) => {

    const renderAnnouncements = announcements.map((item) => {
        return (
            <div>
                <h2>{item.title}</h2>
                <div>{renderHTML(item.content)}</div>
                <div>{item.announcementDate.substr(0, 10)}</div>
            </div>
        )
    })
    return (
        <div className='ui raised segment'>
            {announcements.length > 0 && renderAnnouncements}
        </div>
    )
}

export default Announcements