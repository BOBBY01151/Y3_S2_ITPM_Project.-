import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ta' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="px-3 py-1 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors"
        >
            {i18n.language === 'en' ? 'Tamil (தமிழ்)' : 'English'}
        </button>
    );
};

export default LanguageSwitcher;
