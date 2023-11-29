import React, { useState } from 'react';
import './../styles/about.css';
import imageabout from "./../../imgs/aboutuspic.PNG"

const About = () => {
    // const [activeIndex, setActiveIndex] = useState(null);
    // const items = [
    //     {
    //         header: "Overview",
    //         content: "With the goal of comprehensively opening the learning information channels for knowledge production, dissemination, creating an exchange and cooperation platform that support education sector to accomplish its goals, promoting E-learning and innovation in various industries, BWENGE Online Rwanda Research Center (BORRC) is contributing as Rwanda knowledge resources database for making our future generation at home and globally productive. BWENGE is the deepen focusing on the knowledge service provider based on the knowledge integration from student abroad and  internal brainstorming, research support, problem orientation services and collaboration research platform that stimulate the future generation wisdom more accurate, systematic and complete explicit management as well as implicit knowledge embedded in specific process of work, creativity and learning."
    //     },
    //     {
    //         header: "Mission",
    //         content: "BWENGE project aims to systematically and customize the knowledge, project assistant for the scholars and industrial field with the dreams of innovation and creativity to become future change makers."

    //     },
    //     {
    //         header: "Values",
    //         content: ["To connect and Enable Researchers from All fields to Comprehensively and Systematically Understand the Overall Picture of the Development of Science and Technology, Promote Knowledge Integration, Technology Integration and Innovation Breakthroughs, and Facilitate the Connection Between Theory and Practice.",
    //             "To managers the academic Research, Promote Scientific Decision-making and Scientific Management.",
    //             "Promoting the Education and Teaching Innovation and the Cultivation of Innovative Talents in both secondary and Higher Education.",
    //             "The production and dissemination of academic literature, and to promote academic literature quality and scientific research performance."]
    //     },
    //     {
    //         header: "Acknowledgement and recommendation",
    //         content: " Human compassionate has the potential to make changes in society through thinking and doing; surely the transformative influence of high quality education is what reveals the potential. So after realizing the challenges in our country, BWENGE platform is opened for uncountable experts and learners to strengthen their capacity, sharing the knowledge information’s to become the change makers. We would like to thank our coordination team, partners, members, and honorably one who will use this platform to use it regal and productively."
    //     }
    // ]
    // const onTitleClick = (index) => {
    //     if (activeIndex === index)
    //         return setActiveIndex(null);
    //     setActiveIndex(index);
    // };
    // const renderContent = (cont) => {
    //     console.log(cont.length);
    //     if (Array.isArray(cont))
    //         return (
    //             <ol>
    //                 {cont.map((it) => <li>{it}</li>)}
    //             </ol>
    //         )
    //     else
    //         return (
    //             <p>{cont}</p>
    //         )
    // }
    // const renderItems = items.map((item, index) => {
    //     const active = index === activeIndex ? 'active' : '';
    //     return (
    //         <React.Fragment key={item.header}>
    //             <div className={`title ${active}`}
    //                 onClick={() => onTitleClick(index)} style={{ "fontSize": "1.5rem" }}>
    //                 <i className='dropdown icon'></i>
    //                 {item.header}
    //             </div>
    //             <div className={`content ${active}`}>

    //                 <p>{renderContent(item.content)}</p>

    //             </div>
    //         </React.Fragment>
    //     )
    // })
    return (
        <div className="aboutusbody">
            <div className="">
                <img src={imageabout} class=" imageabout" alt="" />
            </div>
            <div className="aboutword">
                <div className="aboutheads">
                <h1 className="storyabout">Our Story</h1>
                    <h3 className="aboutstart">Why we started it?</h3>
                    </div>
                <div>
                    <p className=" aboutparagraph"> To comprehensively open the research and learning information channel
                        for knowledge <br/>dissemination in Rwanda. BWENGE platform owned by BWENGE
                        Research and Learning  Center<br/> Limited (BWENGE R.L.C Ltd),
                        aims to achieve a mutual goal of making quality education accessible <br/>
                        to Rwandans at home and abroad. We are devoted to encourage creation and
                        sharing of knowledge <br/> information from secondary schools to high-learning institutions,
                        research organizations to enhance <br/> wisdom to future generations for creativityand innovation.
                        It is a software program designed to <br/> provide professional services of various resources with
                        unified search and navigation of Rwandan  <br/> diaspora academic literature and projects ideas, best projects
                        from Rwandan Universities and <br/> colleges (project database),
                        Bwenge MOOC (Massive online open courses) from high school, high <br/> institution and national training program.<br/><br/>
                        Furthermore, the forum stimulates the future generation's wisdom more
                        accurate, systematic, and <br/> completely explicit management and implicit
                        knowledge embedded in the specific process of work, <br/> creativity and learning.
                        We are thirsting to strengthen the research as key to develop our country <br/> through
                        innovation and creativity by connecting Rwandan students at home and abroad,
                        Rwandan <br/> private and governmental universities, different company and other research
                        institutions in Rwanda to enhance wisdom to Rwandan young generation. 

                        
                    </p>
                </div>
            </div>
                 
            {/* <div className='aboutBody_header'>
                Bwenge Project
            </div>
            <span className='aboutBody_header_intro'>"BWENGE Online Rwanda Research Centre"</span>
            <div className='ui styled accordion renderAboutfeatures' style={{ "position": "absolute", "width": "80%", "marginLeft": "10%", "marginTop": "2rem" }}>
                {renderItems}
            </div> */}

        </div>
    )
}
export default About;