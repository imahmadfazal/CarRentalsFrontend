import PageLoader from "./PageLoader";

// Your actual homepage content — unchanged, just wrapped.
function HomePageContent() {
  return (
    <main>
      <header>
        <h1>Welcome</h1>
      </header>
      <section>{/* ...rest of your homepage... */}</section>
    </main>
  );
}

export default function HomePage() {
  return (
    <PageLoader holdDuration={3} splitDuration={1.1}>
      <HomePageContent />
    </PageLoader>
  );
}
