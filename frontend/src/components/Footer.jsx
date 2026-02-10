import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">CampusConnect</h3>
                        <p className="text-gray-400">
                            {t('home.subtitle')}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 underline decoration-primary">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-primary transition-colors">Study Materials</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Council Activities</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Faculty Communities</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 underline decoration-primary">Contact</h4>
                        <p className="text-gray-400">Email: support@campusconnect.lk</p>
                        <p className="text-gray-400">Phone: +94 11 234 5678</p>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500">
                    <p>© 2026 CampusConnect. Internationalization (i18n) was implemented to support both Tamil and English languages, improving accessibility, inclusiveness, and usability for a diverse university user base.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
