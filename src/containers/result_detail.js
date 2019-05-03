import { MarkdownPreview } from 'react-marked-markdown';
import React from 'react';
import { connect } from "react-redux";
import * as actionCreator from "../store/actions/actions";
import {Redirect} from "react-router-dom";

class ResultDetail extends React.Component {

    render() {

        if (this.props.searchResults[this.props.match.params.index]) {
            return (
                <div className='topic_page'>
                    <MarkdownPreview
                        value={this.props.searchResults[this.props.match.params.index].content}/>
                </div>
            )
        } else return <Redirect push to={"/search/" + this.props.match.params.text}/>;

    }
}

const mapStateToProps = state => {
    return {
        searchResults: state.searchResults,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setPathname: () => dispatch(actionCreator.setPathname()),
        // setRedirectBack: () => dispatch(actionCreator.setRedirectBack()),
        // getMarkdownContent: (slug) => dispatch(actionCreator.getMarkdownContent(slug)),
        // setTopicFromSlug: (slug) => dispatch(actionCreator.setTopicFromSlug(slug)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResultDetail);