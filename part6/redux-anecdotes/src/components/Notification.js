
import React from 'react';
import { connect } from 'react-redux';


const Notification = (props ) => {
    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    };


    // const notification = useSelector(state => state.notification);
    if(!props.notification.message){
        return null;
    }
    return (
        <div style={style}>
            {props.notification.message}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        notification : state.notification
    };
};

export default connect(mapStateToProps)(Notification);