import React from "react";

class Chapter extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {sections:[]}
        this.spanRef = React.createRef();
    }

    render() {
        return <div className={"chapter"}>
            <span className={"anchorLink"} id={"chapter-"+this.props.sectionId} ref={this.spanRef}>anchor link</span>
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

export default Chapter;