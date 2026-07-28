import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp, FaInstagram, FaTelegramPlane, FaDiscord, FaLinkedinIn } from 'react-icons/fa';

const Contact = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' atau 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.target;
    const data = new FormData(form);

    try {
      // Pake endpoint formspree lama lo
      const response = await fetch('https://formspree.io/f/mjvzkolo', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
    
    setIsSubmitting(false);
  };

  const socialLinks = [
    { icon: <FaWhatsapp />, url: 'https://wa.me/+6289669045879', color: 'hover:text-[#25D366]' },
    { icon: <FaInstagram />, url: 'https://www.instagram.com/michaelisaiah02/', color: 'hover:text-[#E1306C]' },
    { icon: <FaTelegramPlane />, url: 'https://t.me/michaelisaiah02', color: 'hover:text-[#0088cc]' },
    { icon: <FaDiscord />, url: 'https://discordapp.com/users/michaelisaiah02#0083', color: 'hover:text-[#5865F2]' },
    { icon: <FaLinkedinIn />, url: 'https://www.linkedin.com/in/michael-isaiah-757413222/', color: 'hover:text-[#0077b5]' },
  ];

  return (
    <section id="contact" className="py-24 bg-white dark:bg-slate-900 transition-colors">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-4">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 justify-center">
          
          {/* Info Sosial Media */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 text-center lg:text-left"
          >
            <h3 className="text-2xl font-semibold mb-4 text-slate-800 dark:text-slate-100">
              {t('contact.subtitle')}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              {t('contact.desc')}
            </p>
            
            <div className="flex justify-center lg:justify-start gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xl transition-all duration-300 hover:-translate-y-1 ${social.color} shadow-sm hover:shadow-md border border-slate-200 dark:border-slate-700`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form Kontak */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-1/2 bg-slate-50 dark:bg-slate-800/50 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700"
          >
            {status === 'success' && (
              <div className="mb-6 p-4 bg-primary/10 border border-primary text-primary rounded-lg text-sm font-medium">
                {t('contact.success_msg')}
              </div>
            )}
            
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500 text-red-500 rounded-lg text-sm font-medium">
                {t('contact.error_msg')}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="full-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('contact.name_label')}
                </label>
                <input 
                  type="text" 
                  id="full-name" 
                  name="full-name" 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-slate-800 dark:text-slate-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('contact.email_label')}
                </label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-slate-800 dark:text-slate-200"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('contact.subject_label')}
                </label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-slate-800 dark:text-slate-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                  {t('contact.message_label')}
                </label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows="4" 
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-slate-800 dark:text-slate-200 resize-none"
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold transition-all shadow-md flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {t('contact.btn_loading')}
                  </div>
                ) : (
                  t('contact.btn_send')
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;