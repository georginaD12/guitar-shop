import React from 'react';
import { useParams } from 'react-router-dom';

const GuitarDetailsPage: React.FC = () => {
  const { modelId } = useParams<{ modelId: string }>();

  return (
    <div>
      <h1>Guitar Details</h1>
      <p>Showing details for model ID: {modelId}</p>
    </div>
  );
};

export default GuitarDetailsPage;
