import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css'
import brain from './brain.png'

const Logo = ()=>{
	return (
		<div className= 'ma4 mt0'>
		 <Tilt className= 'tilt br2 shadow-2' style={{ height: '150px', width: '150px', backgroundColor: 'yellow' }}>
      <div className='pa3'>
        <img alt= 'brian' src= {brain}/>
      </div>
    </Tilt>
			
		</div>
		
		);
}
export default Logo;