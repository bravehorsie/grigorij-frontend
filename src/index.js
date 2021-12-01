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
                {
                    this.state.link.type === "chapter" ?
                        <div id="content">
                            {
                                this.sections = this.sectionIds.map((sectionId, i) => {
                                    return <Chapter sectionId={sectionId} key={i} />
                                })
                            }
                        </div>
                        :
                        <div id="content">
                            {
                                this.poemIds.map(function (poemId, i) {
                                    return <Poem poemId={poemId} key={i}/>
                                })
                            }
                        </div>
                }
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
                                <NavDropdown.Item onClick={() => this.props.onclick({type:"chapter", section:1})}>Человек Родился</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.props.onclick({type:"chapter", section:2})}>Война</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.props.onclick({type:"chapter", section:3})}>Агитбригады</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.props.onclick({type:"chapter", section:4})}>Знакомство</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.props.onclick({type:"chapter", section:5})}>Мой избранный народ</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.props.onclick({type:"chapter", section:6})}>Пенаты</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.props.onclick({type:"chapter", section:7})}>Поэзия, творчество</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.props.onclick({type:"chapter", section:8})}>Характер</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Стихи" id="navbar-poems">
                                <NavDropdown.Item onClick={() => this.props.onclick({type: "poem", section:1})}>Моей бессоницы друзья</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.props.onclick({type: "poem", section:2})}>Война</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.props.onclick({type: "poem", section:3})}>Времени в обрез</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => this.props.onclick({type: "poem", section:4})}>Черновики</NavDropdown.Item>
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