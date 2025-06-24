import React from 'react';
import { useParams } from 'react-router-dom';

export default function PlaceDetail() {
  const { id } = useParams();
  return <div style={{ padding: '2rem' }}>Details for place #{id}</div>;
}
