import React from 'react';
import {useEffect} from 'react';


const Success = ({history, auth}) => {
  useEffect((history,auth)=>{
    auth.checkAuthenticated()
        .then((val)=>{
          auth.setAuthenticated(val);
          history.push('/');
        });
  }, [auth]);

  return (
    <div> Success </div>
  );
};


export default Success;