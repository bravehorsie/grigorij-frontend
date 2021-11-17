import React from 'react';
import ReactDOM from 'react-dom';
import DOMPurify from 'dompurify'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import {Nav, NavDropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

//import './react-game.css';
// import Game from './react-game';

class Mynavbar extends React.Component {
    render() {
        return (
            <Navbar bg="light" expand="lg" className="fixed-top">
                <Container>
                    <Navbar.Brand href="#home">Григорий Фемистоклович Григориади</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#home">Воспоминания</Nav.Link>
                            <Nav.Link href="#link">Стихи</Nav.Link>
                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}

class Page extends React.Component {


    constructor(props, context) {
        super(props, context);
        this.state = {content: ""};
    }

    render() {
        return (
            <div className="content pt-4">
                <Mynavbar />
                <div className="imageHolder" />
                <div contentEditable='true'
                     dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(this.state.content)}}/>
            </div>
        );
    }


    componentDidMount() {
        fetch("/chapters/6")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.content)
                    this.setState({
                        content: result.content
                    });
                },
                (error) => {
                    this.setState({
                        content: error
                    });
                }
            )
    }
}

// ========================================

ReactDOM.render(
    <Page/>,
    document.getElementById('root')
);