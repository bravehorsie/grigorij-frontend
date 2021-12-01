import React from "react";

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
                                        <p className={"verse-index"}>{j + 1}</p>
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

export default Poem;