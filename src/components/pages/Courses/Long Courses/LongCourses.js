import React, { useEffect } from 'react'
import { getLongCourses, selectCourse } from '../../../../Redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import history from '../../../../Redux/actions/history'

const LongCourses = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLongCourses());
    }, [])
    const longCourses = useSelector((state) => state.longCourses)
    console.log(longCourses);
    const renderLongCourses = longCourses.map((item) => {
        return (
            <div class="card" onClick={(e) => {
                dispatch(selectCourse(item))
                history.push('/lcourse');
            }}>
                <div class="image">
                    <img src={item.courseIcon} style={{ "height": "290px", "width": "290px" }} />
                </div>
                <div class="content">
                    <div class="header">{item.title}</div>
                    <div class="meta">
                        <a>{item.department}</a>
                    </div>
                    <div class="description">
                        Matthew is an interior designer living in New York.
                    </div>
                </div>
                <div class="extra content">
                    <span class="right floated">

                    </span>
                    <span>
                        <i class="user icon"></i>
                        75 Views
                    </span>
                </div>
            </div>
        )
    })
    return (
        <div className='ui segment'>
            <div className='ui link cards'>
                {renderLongCourses}
            </div>
        </div>
    )
}

export default LongCourses