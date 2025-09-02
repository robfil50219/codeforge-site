import { Link } from "react-router-dom";
import Container from "../components/ui/Container";

export default function NotFound() {
  return (
    <section className="bg-white">
      <Container className="py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900">404</h1>
        <p className="mt-2 text-slate-600">That page could not be found.</p>
        <Link to="/" className="mt-6 inline-block underline">Go home</Link>
      </Container>
    </section>
  );
}