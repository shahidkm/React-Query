import logo from './logo.svg';
import './App.css';
import FetchingDatas from './FetchingDatas';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './Pagination';
import UpdateandDelete from './UpdateandDelete';
function App() {
  var queryClient=new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
    <UpdateandDelete/>
    </QueryClientProvider>
    </div>
  );
}

export default App;
