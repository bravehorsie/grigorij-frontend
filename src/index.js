import Chapter from "./chapter";
import Poem from "./poem";
import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

class Page extends React.Component {

    sectionIds = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    poemIds = [1,2,3,4];

    constructor(props, context) {
        super(props, context);
        this.state = {
            link:{type: "chapter", section: 0},
        };
    }

    updateLink = (link) => {
        this.setState({link: link});
    }


    render() {
        return (
            <div className="content pt-4">
                <Mynavbar onclick={this.updateLink}/>
                <div className="imageHolder"/>
                    <div id="content">
                        {
                            this.sectionIds.map(function (sectionId, i) {
                                return <Chapter sectionId={sectionId} key={i}/>
                            })
                        }
                        {
                            this.poemIds.map(function (poemId, i) {
                                return <Poem poemId={poemId} key={i}/>
                            })
                        }
                    </div>
            </div>
        );
    }
}

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
                                <NavDropdown.Item href={"#chapter-1"}>Человек Родился</NavDropdown.Item>
                                <NavDropdown.Item href={"#chapter-2"}>Война</NavDropdown.Item>
                                <NavDropdown.Item href={"#chapter-3"}>Агитбригады</NavDropdown.Item>
                                <NavDropdown.Item href={"#chapter-4"}>Знакомство</NavDropdown.Item>
                                <NavDropdown.Item href={"#chapter-5"}>Мой избранный народ</NavDropdown.Item>
                                <NavDropdown.Item href={"#chapter-6"}>Пенаты</NavDropdown.Item>
                                <NavDropdown.Item href={"#chapter-7"}>Поэзия, творчество</NavDropdown.Item>
                                <NavDropdown.Item href={"#chapter-8"}>Характер</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Стихи" id="navbar-poems">
                                <NavDropdown.Item href={"#poem-1"}>Моей бессоницы друзья</NavDropdown.Item>
                                <NavDropdown.Item href={"#poem-2"}>Война</NavDropdown.Item>
                                <NavDropdown.Item href={"#poem-3"}>Времени в обрез</NavDropdown.Item>
                                <NavDropdown.Item href={"#poem-4"}>Черновики</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

// ========================================

ReactDOM.render(
    <Page/>,
    document.getElementById('root')
);