function DownloadMobileApp() {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">Browser Extension</h2>
      <p className="text-muted-foreground">Coming soon</p>
    </div>
  );
}

function DownloadDesktopApp() {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">Desktop App</h2>
      <p className="text-muted-foreground">Coming soon</p>
    </div>
  );
}

function DownloadMobileApp() {
  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">Mobile App</h2>
      <p className="text-muted-foreground">Coming soon</p>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Download</h1>
      <p className="mb-8">Get Qurious on all your devices.</p>
      <div className="flex flex-col gap-4">
        <DownloadDesktopApp />
        <DownloadMobileApp />
        <DownloadBrowserExtension />
      </div>
    </main>
  );
}
