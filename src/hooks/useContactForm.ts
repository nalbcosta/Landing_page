import { useMemo, useState } from "react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

interface FormErrors {
	name?: string;
	email?: string;
	message?: string;
}

export function useContactForm(emailTo: string) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [errors, setErrors] = useState<FormErrors>({});
	const [sent, setSent] = useState(false);

	const canSubmit = useMemo(
		() => name.trim().length >= 2 && EMAIL_RE.test(email) && message.trim().length >= 10,
		[name, email, message]
	);

	const onSubmit = (e: React.SubmitEvent) => {
		e.preventDefault();

		const next: FormErrors = {};
		if (name.trim().length < 2) next.name = "Informe seu nome";
		if (!EMAIL_RE.test(email)) next.email = "E-mail inválido";
		if (message.trim().length < 10) next.message = "Mensagem muito curta (mín. 10 caracteres)";
		setErrors(next);
		if (Object.keys(next).length) return;

		const subject = encodeURIComponent(`Contato do site — ${name.trim()}`);
		const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
		window.location.href = `mailto:${emailTo}?subject=${subject}&body=${body}`;
		setSent(true);
	};

	const reset = () => {
		setName("");
		setEmail("");
		setMessage("");
		setErrors({});
		setSent(false);
	};

	return {
		name,
		setName,
		email,
		setEmail,
		message,
		setMessage,
		errors,
		setErrors,
		sent,
		setSent,
		canSubmit,
		onSubmit,
		reset,
	};
}
