import React from 'react'

const CoursePrice = (props) => {
    return (
        <div className='ui segment'>
            <div class="ui form">
                <div class="field">
                    <label>Course Price</label>
                    <input type="number" value={props.longCourse.price} onChange={(e) => props.setLongCourse({ ...props.longCourse, price: e.target.value })} />
                </div>
            </div>
        </div>
    )
}

export default CoursePrice