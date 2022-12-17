import React from 'react'
import HashLoader from 'react-spinners/HashLoader'

function LoadingLogo({loading}) {
    const override = {
        display: "Block",
        margin: "40px auto"
    };
  return (
    <div>
        <HashLoader
        color={'#35bdd0'}
        loading={loading}
        cssOverride={ override }
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
        />
        <h1 className='text-lg mx-auto text-center font-semibold'>Loading...</h1>
    </div>
    )
}


export default LoadingLogo