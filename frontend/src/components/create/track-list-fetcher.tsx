export default async function TrackListFetcher() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return <div>Track Loaded</div>;
}
