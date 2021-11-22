import React from 'react';
import ReactDOM from 'react-dom';
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

class Section extends React.Component {
    render() {
        return (
            <div>
                <h2>{this.props.heading}</h2>
                {this.props.paragraphs.map(function (paragraph, i) {

                    return <div className={paragraph.image == null || i % 2 === 0 ? "d-flex flex-row flex-wrap" : "d-flex flex-row-reverse flex-wrap"}>
                        {
                            paragraph.image ?
                                <div className="imageHolder">
                                    <img src={paragraph.image.name} alt={paragraph.image.description}
                                         className="chapterImage"/>
                                    <div className={"image-label"}>{paragraph.image.description}</div>
                                </div>
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
            <h1>{this.state.name}</h1>
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