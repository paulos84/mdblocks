import { MarkdownPreview } from 'react-marked-markdown';
import React from 'react';
import { connect } from "react-redux";
import * as actionCreator from "../store/actions/actions";

class TopicPage extends React.Component {

    componentDidMount() {
        const slug = this.props.match.params.slug;
        this.props.setTopicFromSlug(slug);
        this.props.getMarkdownContent(slug);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topicSlug !== this.props.topicSlug) {
            this.props.getMarkdownContent(this.props.topicSlug)
        }
    }

    render() {
        return (
            <div className='topic_page'>
            <MarkdownPreview value={this.props.mdContent}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        mdContent: state.mdContent,
        topicSlug: state.topicSlug,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMarkdownContent: (slug) => dispatch(actionCreator.getMarkdownContent(slug)),
        setTopicFromSlug: (slug) => dispatch(actionCreator.setTopicFromSlug(slug)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopicPage);
