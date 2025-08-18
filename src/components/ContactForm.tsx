// src/components/ContactForm.tsx
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle"
  );

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.name.trim()) e.name = t("contact.form.errors.name");
    if (!EMAIL_RE.test(form.email)) e.email = t("contact.form.errors.email");
    if (!form.message.trim()) e.message = t("contact.form.errors.message");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (
    ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = ev.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (form.website) return; // honeypot
    if (!validate()) return;

    setStatus("sending");
    try {
      const params = {
        name: form.name,
        email: form.email,
        subject: form.subject || t("contact.form.noSubject"),
        time: new Date().toLocaleString(),
        message: form.message,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        params,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
      setErrors({});
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4 max-w-xl">
      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-medium">
          {t("contact.form.name")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={onChange}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-err" : undefined}
          className="w-full border rounded p-2"
          required
          placeholder={t("contact.form.placeholders.name")}
        />
        {errors.name && (
          <p id="name-err" className="text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-medium">
          {t("contact.form.email")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-err" : undefined}
          className="w-full border rounded p-2"
          required
          placeholder={t("contact.form.placeholders.email")}
        />
        {errors.email && (
          <p id="email-err" className="text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject (optional) */}
      <div>
        <label htmlFor="subject" className="block font-medium">
          {t("contact.form.subjectOptional")}
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={form.subject}
          onChange={onChange}
          className="w-full border rounded p-2"
          placeholder={t("contact.form.placeholders.subject")}
        />
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-medium">
          {t("contact.form.message")}
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={onChange}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          className="w-full border rounded p-2 min-h-[140px]"
          required
          placeholder={t("contact.form.placeholders.message")}
        />
        {errors.message && (
          <p id="message-err" className="text-sm text-red-600">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot (hidden) */}
      <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          value={form.website}
          onChange={onChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="px-4 py-2 rounded bg-black text-white disabled:opacity-60"
      >
        {status === "sending" ? t("contact.form.sending") : t("contact.form.send")}
      </button>

      {status === "success" && (
        <p role="status" className="text-green-700">
          {t("contact.form.success")}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-red-700">
          {t("contact.form.error")}
        </p>
      )}
    </form>
  );
}