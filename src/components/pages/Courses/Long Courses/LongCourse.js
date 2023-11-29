import React, { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import './styles/lcourse.css';
import history from '../../../../Redux/actions/history';
import renderHTML from 'react-render-html';
import ReactPlayer from 'react-player/lazy'





const LongCourse = () => {
    const navRef = useRef()
    const course = useSelector((state) => state.selectedMooc)
    const [activeChapter, setActiveChapter] = useState(null);
    const [selectedMenu, setLectedMenu] = useState('description')
    const onChapterClick = (index) => {
        if (activeChapter === index)
            return setActiveChapter(null);
        setActiveChapter(index);
    };
    var cnt = 0;
    const renderChapters = course.chapters.map((chap, index) => {
        cnt++;
        const active = index === activeChapter ? 'active' : '';
        return (
            <div key={chap.title}>
                <div className={`title ${active}`}
                    onClick={() => onChapterClick(index)} style={{ "fontSize": "1.5rem" }}>
                    <i className='dropdown icon'></i>
                    Chapter {cnt}: {chap.title}
                </div>
                <div className={`content ${active}`}>
                    <div>{chap.lectures.map((lec) => {
                        return (
                            <div class="ui segments">
                                <div class="ui segment">
                                    <p>{lec.title}</p>
                                </div>
                            </div>
                        )
                    })}</div>
                </div>
            </div>
        )
    })
    return (
        <div className='longCourseBody'>
            <div className='courseCardUp'>
                <div className='courseCardUp_image'>
                    <img src={course.courseIcon}></img>
                </div>
                <div className='courseCardUp_intro'>
                    <div className='title'>{course.title}</div>
                    <div className='headline'>{course.lead_headline}</div>
                    <div className='instructors'>
                        Instructed By
                        {course.instructors.map((it) => {
                            return <span> {it}; </span>
                        })}
                    </div>
                    <div>
                        <span>Last updated: {course.lastUpdated.substr(0, 10)}
                        </span>
                    </div>
                </div>
                <button onClick={(e) => history.push('/learnpage')} class="ui right labeled icon black button" style={{ "height": "3rem", "marginTop": "5rem", "marginLeft": "25rem" }}>
                    <i class="right arrow icon"></i>
                    Enroll
                </button>
            </div>

            <div className='ui container courseBody'>
                <div class="ui borderless menu" id="navbar" ref={navRef}>
                    <a href='#desc' class={selectedMenu === 'description' ? "item active" : "item"} onClick={(e) => setLectedMenu("description")}>Description</a>
                    <a href='#obj' class={selectedMenu === 'objectives' ? "item active" : "item"} onClick={(e) => setLectedMenu("objectives")}>Objectives</a>
                    <a href='#preview' class={selectedMenu === 'preview' ? "item active" : "item"} onClick={(e) => setLectedMenu("preview")}>Preview</a>
                    <a href='#curric' class={selectedMenu === 'curriculum' ? "item active" : "item"} onClick={(e) => setLectedMenu("curriculum")}>Curriculum</a>
                    <a class={selectedMenu === 'reviews' ? "item active" : "item"} onClick={(e) => setLectedMenu("reviews")}>Reviews</a>
                </div>
                <div className='course_desc'>
                    <div id="desc" className='description'>
                        <div className='courseDet_tit'>Description: </div>
                        <div>{renderHTML(course.description)}</div>
                    </div>
                    <div id="obj" className='objectives'>
                        <div className='courseDet_tit'>Course Objectives: </div>
                        <div>
                            <ol>{course.objectives.map((obj) => {
                                return (

                                    <li>{obj}</li>

                                )
                            })}</ol></div>
                    </div>
                    <div className='requirements'>
                        <div className='courseDet_tit'>Course requirements:</div>
                        <div><ol>{course.requirements.map((req) => {
                            return (

                                <li>{req}</li>

                            )
                        })} </ol></div>

                    </div>
                </div>
                <div id="preview" className='course_preview' >
                    <div className='courseDet_tit'>Course Preview: </div>
                    <ReactPlayer url={course.coursePreview} controls={true} />
                </div>
                <div id="curric" className='course_curriculum'>
                    <div className='courseDet_tit'>Course Curriculum: </div>
                    <div className='ui styled accordion renderAboutfeatures' style={{ "position": "absolute", "width": "80%", "marginTop": "2rem" }}>
                        {renderChapters}
                    </div>
                </div>
            </div>

        </div >
    )
}

export default LongCourse