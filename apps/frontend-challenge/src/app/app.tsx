import { RecoilRoot } from 'recoil';
import { MessageProvider } from '../context/MessageContext';
import Controls from '../components/Controls';
import MessageTable from '../components/MessageTable';
import ErrorSnackbar from '../components/ErrorSnackbar';

function App() {
  return (
    <RecoilRoot>
      <MessageProvider>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
              <h1 className="text-xl font-semibold text-gray-900">
                Message Monitor
              </h1>
            </div>
          </header>

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
