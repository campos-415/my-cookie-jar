import Image from "next/image";
import Links from "next/link";
import { HiOutlineChevronDoubleUp } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import contactus from "../../public/assets/specialOrders.svg";
import { FormEvent, useState } from "react";
import emailjs from "emailjs-com";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-scroll";

export const Contact = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [disabled, setDiasable] = useState(false)
  const toastStyle = {
    backgound: "white",
    color: "black",
    fontWheigth: "bold",
    fontSize: "16px",
    padding: "18px",
    borderRadius: "9999px",
    maxWidth: "1000px",
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const templateParams = {
      user_name: name,
      user_number: number,
      user_email: email,
      subject: subject,
      message: message,
      reply_to: "camposss.415@gmail.com",
    };

    emailjs.send(
      "service_litwiq6",
      "template_nltfluk",
      templateParams,
      "XLo66Pj42bzrGVQqR"
    );

    setName("");
    setNumber("");
    setEmail("");
    setSubject("");
    setMessage("");
    notify();
  };


  const activeButton = () => {
    if (name && email && number && message && subject) return setDiasable(true)
    

  }

  const notify = () =>
    toast(`Message Sent ✅`, {
      duration: 6000,
      style: toastStyle,
    });

  return (
    <>
      
      
      <Toaster position="top-center" />
      <section id="contact" className="">
        <div className="w-full lg:h-screen">
          <div className="max-w-[1240px] m-auto px-2 py-16 w-full">
            <p className="text-xl trackiing-widest uppercase text-indigo-600 ">
              Contact
            </p>
            <h2 className="py-4">Get In Touch</h2>
            <div className="grid lg:grid-cols-5 gap-8">
              {/* left */}

              <div className="col-span-3 lg:col-span-2 w-full h-full shadow-xl shadow-gray-400 rounded-xl">
                <div className="flex flex-col items-center justify-center lg:p-4 h-full rounded-xl p-4 ">
                  <div>
                    <Image width={500} height={500} src={contactus} alt="" />
                  </div>
                  <div className="pt-8">
                    <h2 className="py-2">My Cookie Jar</h2>
                    <p className="py-4">
                      "My Cookie Jar is your one-stop destination for delicious,
                      handcrafted cookies. For special orders, simply reach out
                      to us through our contact form, and we'll create the
                      perfect batch of cookies just for you!"
                    </p>
                  </div>
                  <div className="pt-8">
                    <p className="uppercase tracking-widest text-center pt-8">
                      Connect with Us
                    </p>
                    <div className="flex  justify-between  gap-2 max-w-[330px] m-auto py-4 ">
                      <Links href="facebook.com" target="_blank">
                        <div className="rounded-full shadow-lg shadow-gray-400 hover:text-indigo-600 p-6 cursor-pointer hover:scale-105 ease-in duration-300">
                          <FaFacebook />
                        </div>
                      </Links>
                      <Links href="instagram.com" target="_blank">
                        <div className="rounded-full shadow-lg shadow-gray-400 hover:text-indigo-600 p-6 cursor-pointer hover:scale-105 ease-in duration-300">
                          <FaInstagram />
                        </div>
                      </Links>

                      <Links href="tikitok.com" target="_blank">
                        <div className="rounded-full shadow-lg shadow-gray-400 hover:text-indigo-600 p-6 cursor-pointer hover:scale-105 ease-in duration-300">
                          <FaTiktok />
                        </div>
                      </Links>
                    </div>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className="col-span-3 shadow-xl shadow-gray-400 rounded-xl lg:p-4">
                <div className="p-4">
                  <form onSubmit={handleSubmit} onChange={activeButton}>
                    <div className="grid md:grid-cols-2 gap-4 w-full py-2">
                      <div className="flex flex-col">
                        <label className="uppercase text-sm py-2 font-semibold">
                          Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          className="border-2 rounded-lg p-3 flex border-gray-300"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="uppercase text-sm py-2 font-semibold">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          value={number}
                          onChange={(event) => setNumber(event.target.value)}
                          className="border-2 rounded-lg p-3 flex border-gray-300"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col py-2">
                      <label className="uppercase text-sm py-2 font-semibold">
                        email
                      </label>
                      <input
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="border-2 rounded-lg p-3 flex border-gray-300"
                      />
                    </div>
                    <div className="flex flex-col py-2">
                      <label className="uppercase text-sm py-2 font-semibold">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(event) => setSubject(event.target.value)}
                        className="border-2 rounded-lg p-3 flex border-gray-300"
                      />
                    </div>
                    <div className="flex flex-col py-2">
                      <label className="uppercase text-sm py-2 font-semibold">
                        Message
                      </label>
                      <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        className="border-2 rounded-lg py-3 border-gray-300"
                        rows={10}
                      />
                    </div>
                    <button
                      disabled={!disabled}
                      type="submit"
                      className="w-full p-4 text-gray-100 mt-4 bg-indigo-600 disabled:cursor-not-allowed disabled:bg-indigo-300">
                      {disabled ? "Send Request" : "Fill Form to Send"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
