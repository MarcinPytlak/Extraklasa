import React from 'react';
import { useLocation } from 'react-router';

export default function Match(){
  const location = useLocation();
  console.log(location.state);
  return <h1>This is a match side</h1>;
}