// import { useState } from "react";
// import { RevealOnScroll } from "../RevealOnScroll";
// import emailjs from "emailjs-com";

// export const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     emailjs
//       .sendForm(
//         import.meta.env.VITE_SERVICE_ID,
//         import.meta.env.VITE_TEMPLATE_ID,
//         e.target,
//         import.meta.env.VITE_PUBLIC_KEY
//       )
//       .then((result) => {
//         alert("Message Sent!");
//         setFormData({ name: "", email: "", message: "" });
//       })
//       .catch(() => alert("Oops! Something went wrong. Please try again."));
//   };

//   return (
//     <section
//       id="contact"
//       className="min-h-screen flex items-center justify-center py-20"
//     >
//       <RevealOnScroll>
//         <div className="px-4 w-full min-w-[300px] md:w-[500px] sm:w-2/3 p-6">
//           <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
//             {" "}
//             Get In Touch
//           </h2>
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 required
//                 value={formData.name}
//                 className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
//                 placeholder="Name..."
//                 onChange={(e) =>
//                   setFormData({ ...formData, name: e.target.value })
//                 }
//               />
//             </div>

//             <div className="relative">
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 required
//                 value={formData.email}
//                 className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
//                 placeholder="example@gmail.com"
//                 onChange={(e) =>
//                   setFormData({ ...formData, email: e.target.value })
//                 }
//               />
//             </div>

//             <div className="relative">
//               <textarea
//                 id="message"
//                 name="message"
//                 required
//                 rows={5}
//                 value={formData.message}
//                 className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white transition focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
//                 placeholder="Your Message..."
//                 onChange={(e) =>
//                   setFormData({ ...formData, message: e.target.value })
//                 }
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </RevealOnScroll>
//     </section>
//   );
// };
import { useRef, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "@emailjs/browser";

console.log("Service ID:", import.meta.env.VITE_SERVICE_ID);
console.log("Template ID:", import.meta.env.VITE_TEMPLATE_ID);
console.log("Public Key:", import.meta.env.VITE_PUBLIC_KEY);

// Extract environment variables at the top
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export const Contact = () => {
  const formRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    console.log("Service ID:", import.meta.env.VITE_SERVICE_ID);
    console.log("Template ID:", import.meta.env.VITE_TEMPLATE_ID);
    console.log("Public Key:", import.meta.env.VITE_PUBLIC_KEY);
    
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        alert("✅ Message Sent Successfully!");
        setFormData({ name: "", email: "", message: "" });
        setSending(false);
      })
      .catch((error) => {
        console.error("❌ EmailJS Error:", error);
        alert("❌ Something went wrong. Please try again.");
        setSending(false);
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="px-4 w-full md:w-[500px] sm:w-2/3 p-6">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Get In Touch
          </h2>

          <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name..."
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
            />

            <input
              type="email"
              name="email"
              placeholder="Email..."
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
            />

            <textarea
              name="message"
              placeholder="Your Message..."
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:bg-blue-500/5"
            />

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-500 text-white py-3 px-6 rounded font-medium transition hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </RevealOnScroll>
    </section>
  );
};
