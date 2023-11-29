import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ReactPlayer from 'react-player/lazy'
import history from '../../../../Redux/actions/history';
import './styles/learnpage.css';

const LearnPage = () => {
    const course = useSelector((state) => state.selectedCourse)
    const [activeChapter, setActiveChapter] = useState(null);
    const [selectedLecture, setSelectedLecture] = useState(course.coursePreview);

    console.log(selectedLecture);



    var cnt = 0;
    var lecnt = 0;
    const onChapterClick = (index) => {
        if (activeChapter === index)
            return setActiveChapter(null);
        setActiveChapter(index);
    };
    const renderChapters = course.chapters.map((chap, index) => {
        cnt++;
        const active = index === activeChapter ? 'active' : '';
        return (
            <div key={chap.title}>
                <div className={`title ${active}`}
                    onClick={() => onChapterClick(index)}>
                    <i className='dropdown icon'></i>
                    Chapter {cnt}: {chap.title}
                </div>
                <div className={`content ${active}`}>
                    <div>{chap.lectures.map((lec) => {
                        lecnt++;
                        return (
                            <div className='lectureselector' onClick={(e) => {
                                setSelectedLecture(lec.lectureFile)
                            }} >
                                <p style={{ "paddingBottom": "10px", "fontSize": "1rem" }}>Lecture {lecnt}: {lec.title}</p>
                            </div>

                        )
                    })}</div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className='Learn_header ui container'>
                <div className='Learn_header_back'>
                    <button class="ui left labeled icon green button" onClick={(e) => {
                        history.push('/longcourses')
                    }}>
                        Back to courses
                        <i class="left arrow icon"></i>
                    </button>
                </div>
                <div className='Learn_header_title'>
                    <div class="ui segments">
                        <div class="ui segment">
                            <p>{course.title}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='learn_body'>
                <div className='learn_body_curriculum'>
                    <div className='ui styled accordion renderAboutfeatures'>
                        {renderChapters}
                    </div>
                </div>
                <div className='learn_body_learn_video'>
                    <ReactPlayer url={selectedLecture} controls={true} height="80vh" width="81vw" />
                </div>

            </div>
        </div>
    )
}

export default LearnPage