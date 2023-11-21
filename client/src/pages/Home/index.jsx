import React, { useState } from 'react';
import CatComponent from '../../components/RandomCat';
import CreateService from '../../components/CreateService';
import './style.scss';

export default function Service() {
  return (
    <div>
      <CreateService />
      <CatComponent />
    </div>
  );
}


      





