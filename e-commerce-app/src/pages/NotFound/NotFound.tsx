import { useParams } from "react-router";

export default function NotFound() {
  const { "*": splat } = useParams();
  return (
    <>
      <h1>Page Not Found</h1>
      <p>Could not find "/{splat}".</p>
    </>
  );
}
