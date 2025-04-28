import { RecoilRoot } from 'recoil';
import { MessageProvider } from '../context/MessageContext';
import Controls from '../components/Controls';
import MessageTable from '../components/MessageTable';
import ErrorSnackbar from '../components/ErrorSnackbar';
import Header from '../components/Header';

function App() {
  return (
    <RecoilRoot>
      <MessageProvider>
        <div className="min-h-screen bg-gray-100">
          <Header title="Message Monitor" />
          <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <Controls />
            <MessageTable />
            <ErrorSnackbar />
          </main>
        </div>
      </MessageProvider>
    </RecoilRoot>
  );
}

export default App;
