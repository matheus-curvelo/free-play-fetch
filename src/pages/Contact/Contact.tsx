import React, {useState} from "react";
import emailjs from "emailjs-com";
import githubIcon from "../../assets/svg/github.svg";
import linkedinIcon from "../../assets/svg/linkedin.svg";
import "./Contact.scss";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    const {name, email, subject, message} = formData;

    const templateParams = {
      from_name: name,
      email: email,
      subject: subject,
      message: message,
      to_name: "Matheus",
    };

    emailjs
      .send(
        "service_4jbxa25", // ID do serviço
        "template_7dggke2", // ID do template
        templateParams, // Parâmetros
        "sKYtOpqTDPPSVEDH0" // User ID
      )
      .then(
        (result: any) => {
          setIsSending(false);
          setSuccessMessage("Mensagem enviada com sucesso!");
          setFormData({name: "", email: "", subject: "", message: ""});
        },
        (error: any) => {
          setIsSending(false);
          setErrorMessage(
            "Erro ao enviar mensagem. Tente novamente mais tarde."
          );
        }
      );
  };

  return (
    <div className="container mx-auto p-4 py-10">
      <h1 className="text-2xl font-bold mb-4">Contato</h1>
      <p className="mb-4">
        Se você tiver alguma dúvida, sugestão ou apenas quiser entrar em
        contato, preencha o formulário abaixo:
      </p>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nome:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Seu nome"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Seu email"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1">
            Assunto:
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Assunto"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-1">
            Mensagem:
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Sua mensagem"></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white pt-2 pb-2 ps-4 pe-4 rounded hover:bg-blue-600"
          disabled={isSending}>
          {isSending ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {successMessage && (
        <p className="mt-4 text-green-500">{successMessage}</p>
      )}
      {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}

      <div className="mt-8">
        <h2 className="text-xl font-bold">Redes Sociais</h2>
        <ul className="flex gap-3 list-none list-inside mt-2">
          <li>
            <a
              href="https://github.com/matheus-curvelo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80">
              <img
                src={githubIcon}
                alt="GitHub"
                className="invert w-8 h-8 lg:w-10 lg:h-10"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/matheus-curvelo/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80">
              <img
                src={linkedinIcon}
                alt="LinkedIn"
                className="invert w-8 h-8 lg:w-10 lg:h-10"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;
