
import React from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_BRANDS, type GetBrandsQuery } from '../graphql/queries';
import { useNavigate } from 'react-router-dom';

const BrandsPage: React.FC = () => {
  const { loading, error, data } = useQuery<GetBrandsQuery>(GET_BRANDS);
  const navigate = useNavigate();

  if (loading) return <p>Loading brands...</p>;
  if (error) return <p>Error loading brands: {error.message}</p>;

  const handleClick = (brandId: string) => {
    navigate(`/brands/${brandId}/models`);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Brands</h1>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {data?.findAllBrands.map((brand) => (
          <img
            key={brand.id}
            src={brand.image || ''}
            alt={brand.name || 'Brand'}
            onClick={() => handleClick(brand.id)}
            style={{
              cursor: 'pointer',
              width: '120px',
              height: '120px',
              objectFit: 'contain',
              borderRadius: '12px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
              backgroundColor: '#f9f9f9',
            }}
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
