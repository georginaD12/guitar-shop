import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import {
  GET_BRAND_MODELS,
  type GetBrandModelsQuery,
  type GetBrandModelsQueryVariables,
  type Model,
} from '../graphql/queries';

const ITEMS_PER_PAGE = 6;

const ModelsPage: React.FC = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { loading, error, data } = useQuery<GetBrandModelsQuery, GetBrandModelsQueryVariables>(
    GET_BRAND_MODELS,
    {
      variables: {
        id: brandId ?? '',
        sortBy: {
          field: 'name',
          order: 'ASC',
        },
      },
      skip: !brandId,
    }
  );

  const filteredModels = useMemo(() => {
    if (!data?.findBrandModels) return [];
    return data.findBrandModels.filter((model) => {
      const matchesName = model.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const matchesType = filterType ? model.type === filterType : true;
      return matchesName && matchesType;
    });
  }, [data, searchTerm, filterType]);

  const totalPages = Math.ceil(filteredModels.length / ITEMS_PER_PAGE);

  const currentModels = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredModels.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredModels, currentPage]);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterType]);

  if (loading) return <p>Loading models...</p>;
  if (error) return <p>Error loading models: {error.message}</p>;

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Guitar Models</h1>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <input
          type="text"
          placeholder="Search models by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{ padding: '0.5rem', fontSize: '1rem' }}
        >
          <option value="">All Types</option>
          <option value="ELECTRIC">Electric</option>
          <option value="ACOUSTIC">Acoustic</option>
          <option value="BASS">Bass</option>
        </select>
      </div>

      
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1rem',
        }}
      >
        {currentModels.length === 0 ? (
          <p>No models found.</p>
        ) : (
          currentModels.map((model: Model) => (
            <div
              key={model.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '0.5rem',
                textAlign: 'center',
                cursor: 'pointer',
              }}
              onClick={() => navigate(`/models/${brandId}/${model.id}`)}
            >
              {model.image && (
                <img
                  src={model.image}
                  alt={model.name}
                  style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                />
              )}
              <h3 style={{ margin: '0.5rem 0 0.25rem' }}>{model.name}</h3>
              <p style={{ margin: 0, fontWeight: 'bold' }}>${model.price}</p>
            </div>
          ))
        )}
      </div>

      
      {totalPages > 1 && (
        <div
          style={{
            marginTop: '2rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            style={{ padding: '0.5rem 1rem' }}
          >
            Prev
          </button>

          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: '0.5rem 1rem',
                fontWeight: currentPage === page ? 'bold' : 'normal',
                backgroundColor: currentPage === page ? '#ddd' : 'transparent',
                borderRadius: '4px',
                border: '1px solid #ccc',
              }}
            >
              {page}
            </button>
          ))}

          
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            style={{ padding: '0.5rem 1rem' }}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ModelsPage;
