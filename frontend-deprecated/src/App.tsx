import FileInput from "./components/FileInput";
import NavBar from "./components/NavBar";
import PDFViewer from "./components/PDFViewer";

function App() {
  return (
    <div>
      <NavBar />
      <FileInput />
      <div className="flex-1 xl:flex">
        <div className="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
          <PDFViewer url={file.url} />
        </div>
      </div>

      {/* <div className="flex-[0.75] shrink-0 border-t border-gray-200 lg:w-96 lg:border-l lg:border-t-0">
          <WrapChat fileId={file.id} />
        </div> */}
    </div>
  );
}

export default App;
