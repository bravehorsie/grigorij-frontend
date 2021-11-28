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
                                <NavDropdown.Item href="#1">Человек Родился</NavDropdown.Item>
                                <NavDropdown.Item href="#2">Война</NavDropdown.Item>
                                <NavDropdown.Item href="#3">Агитбригады</NavDropdown.Item>
                                <NavDropdown.Item href="#4">Знакомство</NavDropdown.Item>
                                <NavDropdown.Item href="#5">Мой избранный народ</NavDropdown.Item>
                                <NavDropdown.Item href="#6">Пенаты</NavDropdown.Item>
                                <NavDropdown.Item href="#7">Поэзия, творчество</NavDropdown.Item>
                                <NavDropdown.Item href="#8">Характер</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Стихи" id="navbar-poems">
                                <NavDropdown.Item href="#">Звездопады</NavDropdown.Item>
                                <NavDropdown.Item href="#">Моей бессоницы друзья</NavDropdown.Item>
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

                    return <div className={"sectionHolder"}>
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

class Page extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {sectionIds:[0,1,2,3,4,5,6,7,8]};
    }

    render() {
        return (
            <div className="content pt-4">
                <Mynavbar/>
                <div className="imageHolder"/>
                <div id="content">
                    {
                        this.state.sectionIds.map(function (sectionId, i) {
                            return <Chapter sectionId={sectionId} key={i} />
                        })
                    }
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Page/>,
    document.getElementById('root')
);