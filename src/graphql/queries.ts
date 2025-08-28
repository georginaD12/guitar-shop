
import { gql, type TypedDocumentNode } from '@apollo/client';

export type Brand = {
  __typename?: 'Brand';
  id: string;
  name?: string | null;
  origin?: string | null;
  image?: string | null;
};

export type GetBrandsQuery = {
  findAllBrands: Brand[];
};

export type GetBrandsQueryVariables = Record<string, never>;

export const GET_BRANDS: TypedDocumentNode<GetBrandsQuery, GetBrandsQueryVariables> = gql`
  query GetBrands {
    findAllBrands {
      id
      name
      origin
      image
    }
  }
`;


export type Model = {
  id: string;
  name?: string;
  type?: string;
  image?: string;
  description?: string;
  price?: number;
};

export type GetBrandModelsQuery = {
  findBrandModels: Model[];
};

export type GetBrandModelsQueryVariables = {
  id: string;
  sortBy: {
    field: 'name' | 'type' | 'price';
    order: 'ASC' | 'DESC';
  };
};

export const GET_BRAND_MODELS: TypedDocumentNode<
  GetBrandModelsQuery,
  GetBrandModelsQueryVariables
> = gql`
  query GetBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      description
      price
    }
  }
`;