import React from "react";
import { Route } from 'react-router-dom'
import {withRouter} from 'react-router';

export default withRouter((props) => {

    const optionNames = props.options.map(x => x.name).sort();
    const isDiffCategory = !optionNames.includes(props.selectedOption);

    let addLen = 0;
    if (isDiffCategory && optionNames.length > 0) {
        const maxNameLen = Math.max(...optionNames.map(x => x.length));
        addLen = (maxNameLen * 4);
    } else addLen = props.selectedOption ? props.selectedOption.length * 6 : 20;
    const width = 60 + addLen < 184 ? 60 + addLen : 184 ;

    let options = [];
    if (props.selectedOption || props.atSearchPage) {
        options = props.options.sort((a, b) => {
            let first = a.name.toLowerCase();
            let second = b.name.toLowerCase();
            return (first < second) ? -1 : (first > second) ? 1 : 0}).map(opt => {
            return <Route key={opt.name} render={
                ({ history }) =>
                    <option
                        key={opt.name} value={opt.name}
                        onClick={() => { if (props.isTopic) {
                            history.push('/topics/' + opt.slug)
                        }}}
                        >{opt.name.length > 19 ? opt.name.slice(0,19) + '...' : opt.name}
                    </option> }
                  />
        });
        if (isDiffCategory || window.location.href.includes('search/')) {
            options.unshift(
                <option key='topic0' className='topic_placeholder' value={''}>{''}</option>
            )
        }
    }

    if ( props.options ) {
        return (
            <select
                style={{'width': width}}
                className='nav_dropdown_select'
                onChange={(e) => {if (e.target.value) {
                    props.handleSelection(e.target.value)
                }}}
                value={props.atSearchPage && props.isTopic ? '' : props.selectedOption}
            >
            {options}
            </select>
        )
    } else return <select className='nav_dropdown_select' style={{'width': width}} />
})