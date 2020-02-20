import React, { Component } from 'react';
import DartThrow from '../DartThrow/DartThrow';
import Aux from '../../../hoc/Wrap';

function CurrentSet(props: any) {

  return (
    <Aux>
      <span>{props.setnumber}</span>
      <div>
        {props.scores.map((s: any) =>
          <DartThrow key={s.index} score={s.value} />
        )}
      </div>
    </Aux>

  )

};

export default CurrentSet;
