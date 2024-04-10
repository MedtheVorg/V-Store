import { useParams } from 'react-router-dom';
import ApiAlert from './api-alert';

type ApiListProps = {
  entityName: string;
  entityIdName: string;
};

export function ApiList({ entityName, entityIdName }: ApiListProps) {
  const params = useParams();

  const baseUrl = `${import.meta.env.VITE_BASE_URL}/${params.storeId}`;

  return (
    <div className=" space-y-2 flex flex-col items-center justify-center overflow-hidden">
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </div>
  );
}
