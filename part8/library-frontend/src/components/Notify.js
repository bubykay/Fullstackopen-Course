import React from 'react';

const Notify = ({message}) => {

  if(message){
    return (
      <div>
        {message}
      </div>
    )
  }
  return (
    null
  );
};

export default Notify;