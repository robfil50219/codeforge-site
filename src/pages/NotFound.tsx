import { Link } from "react-router-dom";
import Container from "../components/ui/Container";
import { useTranslation } from "../lib/t";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <section className="bg-white">
      <Container className="py-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900">404</h1>
        <p className="mt-2 text-slate-600">{t("notFound.message") as string}</p>
        <Link to="/" className="mt-6 inline-block underline">{t("notFound.home") as string}</Link>
      </Container>
    </section>
  );
}
