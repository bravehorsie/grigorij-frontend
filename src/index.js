import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Mynavbar extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" className="fixed-top">
                <Container className={"flex-row-reverse"}>
                    {window.innerWidth > 480 ?
                        <Navbar.Brand href="#home">Григорий Фемистоклович Григориади</Navbar.Brand>
                        :
                        <Navbar.Brand href="#home">Г.Ф.Григориади</Navbar.Brand>
                    }

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Воспоминания" id="navbar-memories">
                                <NavDropdown.Item href="#1" onClick={() => this.props.onclick("chapter")}>Человек Родился</NavDropdown.Item>
                                <NavDropdown.Item href="#2" onClick={() => this.props.onclick("chapter")}>Война</NavDropdown.Item>
                                <NavDropdown.Item href="#3" onClick={() => this.props.onclick("chapter")}>Агитбригады</NavDropdown.Item>
                                <NavDropdown.Item href="#4" onClick={() => this.props.onclick("chapter")}>Знакомство</NavDropdown.Item>
                                <NavDropdown.Item href="#5" onClick={() => this.props.onclick("chapter")}>Мой избранный народ</NavDropdown.Item>
                                <NavDropdown.Item href="#6" onClick={() => this.props.onclick("chapter")}>Пенаты</NavDropdown.Item>
                                <NavDropdown.Item href="#7" onClick={() => this.props.onclick("chapter")}>Поэзия, творчество</NavDropdown.Item>
                                <NavDropdown.Item href="#8" onClick={() => this.props.onclick("chapter")}>Характер</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Стихи" id="navbar-poems">
                                <NavDropdown.Item href="#" onClick={() => this.props.onclick("poem")}>Моей бессоницы друзья</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => this.props.onclick("poem")}>Война</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => this.props.onclick("poem")}>Времени в обрез</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={() => this.props.onclick("poem")}>Черновики</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

class Image extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {loaded: false}
    }

    render() {
        const img = this.props.img;
        return <div className="d-flex justify-content-center">
            <div className={"imageHolder"}>
                <img src={img.name} alt={img.description}
                     onLoad={() => {this.setState({loaded: true})}}
                     className="chapterImage"/>
                <div className={this.state.loaded ? "image-label visible" : "image-label hidden"}>{img.description}</div>
            </div>
        </div>
    }
}

class Section extends React.Component {
    render() {
        return (
            <div>
                <h2 className={"section-heading"}>{this.props.heading}</h2>
                {this.props.paragraphs.map(function (paragraph, i) {

                    return <div className={"sectionHolder"} key={i}>
                        {
                            paragraph.image != null ?
                                <Image img={paragraph.image} />
                                :
                                null
                        }
                        <div className="paragraphHolder">
                            <p key={i}
                           className={i > 1 && paragraph.indent ? "paragraph indented" : "paragraph"}>{paragraph.content}</p>
                        </div>
                    </div>;
                })}
            </div>
        );
    }

}

class Chapter extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {sections:[]}
    }

    render() {
        return <div className={"chapter"}>
            <span className={"anchorLink"}  id={this.props.sectionId}>anchor link</span>
            <h1 className={"chapter-heading"}>{this.state.name}</h1>
            {
                this.state.sections.map(function (section, i) {
                    return <Section heading={section.heading} paragraphs={section.paragraphs} key={i} />
                })
            }
        </div>
    }

    componentDidMount() {
        fetch("/chapters/" + this.props.sectionId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(result);
                },
                (error) => {
                    this.setState({
                        content: error
                    });
                }
            );
    }
}

class Poem extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {name:"", poems:[]}
    }

    render() {
        return <div className={"poemChapter"}>
            <h1 className={"chapter-heading"}>{this.state.name}</h1>
            {
                this.state.poems.map(function (poem, i) {
                    return <div className={"poem"} key={i}>
                        <h2 key={"h2" + i}>{poem.name}</h2>
                        <div className={"d-flex flex-wrap verse-container"}>
                        {
                            poem.verses.map(function (verse, j) {
                                return <div className={(j + 1) === poem.verses.length ? "verse last" : "verse"} key={j}>
                                    <p class={"verse-index"}>{j + 1}</p>
                                    {
                                        verse.lines.map(function (line, k) {
                                            return <p className={k === 0 ? "verse-line-first" : "verse-ine"} key={k}>{line}</p>
                                        })
                                    }
                                </div>;
                            })
                        }
                        </div>
                    </div>;
                })
            }
        </div>
    }

    componentDidMount() {
        fetch("/poems/" + this.props.poemId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState(result);
                },
                (error) => {
                    this.setState({
                        content: error
                    });
                }
            );
    }
}

class Page extends React.Component {

    sectionIds = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    poemIds = [1,2,3,4];

    constructor(props, context) {
        super(props, context);
        this.state = {
            link:"chapter",
            sectionIds: this.sectionIds,
            poemIds: this.poemIds
        };
    }

    updateLink = (link) => {
        this.setState({link: link, sectionIds: this.sectionIds});
    }

    render() {
        return (
            <div className="content pt-4">
                <Mynavbar onclick={this.updateLink}/>
                <div className="imageHolder"/>
                {
                    this.state.link === "chapter" ?
                        <div id="content">
                            {
                                this.state.sectionIds.map(function (sectionId, i) {
                                    return <Chapter sectionId={sectionId} key={i}/>
                                })
                            }
                        </div>
                        :
                        <div id="content">
                            {
                                this.state.poemIds.map(function (poemId, i) {
                                    return <Poem poemId={poemId} key={i}/>
                                })
                            }
                        </div>
                }
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Page/>,
    document.getElementById('root')
);