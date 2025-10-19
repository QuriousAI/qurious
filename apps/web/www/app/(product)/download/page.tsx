function DownloadBrowserExtension() {
  throw new Error("Not Implemented");

  return <></>;
}

function DownloadDesktopApp() {
  throw new Error("Not Implemented");

  return <></>;
}

function DownloadMobileApp() {
  throw new Error("Not Implemented");

  return <></>;
}

export default function DownloadPage() {
  return (
    <main>
      <h1>Download Page</h1>
      <p>Welcome to the download page!</p>
      <div className="flex flex-col gap-4">
        <DownloadDesktopApp />
        <DownloadMobileApp />
        <DownloadBrowserExtension />
      </div>
    </main>
  );
}
