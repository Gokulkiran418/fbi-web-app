import { useQuery, gql } from '@apollo/client';
import Navbar from '../components/Navbar';

const SUSPECTS_QUERY = gql`
  query {
    suspects {
      id
      title
    }
  }
`;

interface Suspect {
  id: string;
  title: string;
}

export default function Home() {
  const { data, loading, error } = useQuery<{ suspects: Suspect[] }>(SUSPECTS_QUERY);
  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text font-bold">FBI Wanted</h1>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <ul>
            {data.suspects.map((suspect: Suspect) => (
              <li key={suspect.id}>{suspect.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}