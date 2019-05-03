import React, { Component } from 'react';
import * as actionCreator from "../store/actions/actions";
import {connect} from "react-redux";
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import CategoryItemContent from "../components/category_item_content"

class CategoriesIndex extends Component {

    componentDidMount() {
        this.props.setPathname()
    }

    handleCategorySelection(catName) {
        this.props.setCategory(catName);
        this.props.topicsByCategory()
    }

    render() {
        return (
            <div className='CategoriesIndexpage' >
            <Container>
            <Row>
            <Col xs="4" >
                <ListGroup>
                    {this.props.categories.sort().map(name => {
                        return (
                        <ListGroupItem
                            className={'cats'} tag="a" key={name}
                            active={name === this.props.activeCategory} action>
                            <CategoryItemContent
                                catName={name}
                                handleClick={this.handleCategorySelection.bind(this)}
                            />
                        </ListGroupItem>)
                    })}
                </ListGroup>
            </Col>
            <Col xs="8">
                <ListGroup>
                    {this.props.filteredTopics.sort((a, b) => {
                        let first = a.name.toLowerCase();
                        let second = b.name.toLowerCase();
                        return (first < second) ? -1 : (first > second) ? 1 : 0}).map((obj, ind) => {
                        return (
                            <ListGroupItem
                                tag="a" href={'/topics/' + obj.slug} key={ind}
                                active={this.props.topicName === obj.name} action
                            >{obj.name}
                            </ListGroupItem>)
                    })}
                </ListGroup>
            </Col>
            </Row>
            </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.categories,
        allTopics: state.allTopics,
        filteredTopics: state.filteredTopics,
        activeCategory: state.activeCategory,
        topicName: state.topicName,
        pathname: state.pathname,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setTopic: (val) => dispatch(actionCreator.setTopic(val)),
        setCategory: (val) => dispatch(actionCreator.setCategory(val)),
        topicsByCategory: () => dispatch(actionCreator.topicsByCategory()),
        setPathname: () => dispatch(actionCreator.setPathname())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoriesIndex);