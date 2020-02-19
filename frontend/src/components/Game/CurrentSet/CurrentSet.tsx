import React, { Component } from 'react';
import DartThrow from '../DartThrow/DartThrow';

function CurrentSet(props: any) {
    
        return (
            <div>
              {props.scores.map((s:any) => 
                <DartThrow key={s.index} score={s.value}/>
              )}
            </div>
        )

};

export default CurrentSet;
